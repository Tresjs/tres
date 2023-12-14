import type { RendererOptions } from 'vue'
import { BufferAttribute } from 'three'
import { isFunction } from '@alvarosabu/utils'
import type { Object3D, Camera } from 'three'
import { useLogger } from '../composables'
import { deepArrayEqual, isHTMLTag, kebabToCamel } from '../utils'

import type { TresObject, TresObject3D, TresScene } from '../types'
import { catalogue } from './catalogue'

function noop(fn: string): any {
  fn
}

let scene: TresScene | null = null

const { logError } = useLogger()

const supportedPointerEvents = [
  'onClick',
  'onPointerMove',
  'onPointerEnter',
  'onPointerLeave',
]

export const nodeOps: RendererOptions<TresObject, TresObject> = {
  createElement(tag, _isSVG, _anchor, props) {
    if (!props) props = {}

    if (!props.args) {
      props.args = []
    }
    if (tag === 'template') return null
    if (isHTMLTag(tag)) return null
    let name = tag.replace('Tres', '')
    let instance

    if (tag === 'primitive') {
      if (props?.object === undefined) logError('Tres primitives need a prop \'object\'')
      const object = props.object as TresObject
      name = object.type
      instance = Object.assign(object, { type: name, attach: props.attach, primitive: true })
    }
    else {
      const target = catalogue.value[name]
      if (!target) {
        logError(`${name} is not defined on the THREE namespace. Use extend to add it to the catalog.`)
      }
      instance = new target(...props.args)
    }

    if (instance.isCamera) {
      if (!props?.position) {
        instance.position.set(3, 3, 3)
      }
      if (!props?.lookAt) {
        instance.lookAt(0, 0, 0)
      }
    }

    if (props?.attach === undefined) {
      if (instance.isMaterial) instance.attach = 'material'
      else if (instance.isBufferGeometry) instance.attach = 'geometry'
    }

    // determine whether the material was passed via prop to
    // prevent it's disposal when node is removed later in it's lifecycle

    if (instance.isObject3D) {
      if (props?.material?.isMaterial) (instance as TresObject3D).userData.tres__materialViaProp = true
      if (props?.geometry?.isBufferGeometry) (instance as TresObject3D).userData.tres__geometryViaProp = true
    }

    // Since THREE instances properties are not consistent, (Orbit Controls doesn't have a `type` property) 
    // we take the tag name and we save it on the userData for later use in the re-instancing process.
    instance.userData = {
      ...instance.userData,
      tres__name: name,
    }

    return instance
  },
  insert(child, parent) {
    if (parent && parent.isScene) scene = parent as unknown as TresScene

    const parentObject = parent || scene

    if (child?.isObject3D) {
      if (child?.isCamera) {
        if (!scene?.userData.tres__registerCamera)
          throw 'could not find tres__registerCamera on scene\'s userData'

        scene?.userData.tres__registerCamera?.(child as unknown as Camera)
      }

      if (
        child && supportedPointerEvents.some(eventName => child[eventName])
      ) {
        if (!scene?.userData.tres__registerAtPointerEventHandler)
          throw 'could not find tres__registerAtPointerEventHandler on scene\'s userData'

        scene?.userData.tres__registerAtPointerEventHandler?.(child as Object3D)
      }
    }

    if (child?.isObject3D && parentObject?.isObject3D) {
      parentObject.add(child)
      child.dispatchEvent({ type: 'added' })
    }
    else if (child?.isFog) {
      parentObject.fog = child
    }
    else if (typeof child?.attach === 'string') {
      child.__previousAttach = child[parentObject?.attach as string]
      if (parentObject) {
        parentObject[child.attach] = child
      }
    }
  },
  remove(node) {
    if (!node) return

    const disposeMaterialsAndGeometries = (object3D: Object3D) => {
      const tresObject3D = object3D as TresObject3D

      if (!object3D.userData.tres__materialViaProp) {
        tresObject3D.material?.dispose()
        delete tresObject3D.material
      }
        
      if (!object3D.userData.tres__geometryViaProp) {
        tresObject3D.geometry?.dispose()
        delete tresObject3D.geometry
      }
    }

    const deregisterAtPointerEventHandler = scene?.userData.tres__deregisterAtPointerEventHandler
    const deregisterBlockingObjectAtPointerEventHandler
        = scene?.userData.tres__deregisterBlockingObjectAtPointerEventHandler

    const deregisterAtPointerEventHandlerIfRequired = (object: TresObject) => {

      if (!deregisterBlockingObjectAtPointerEventHandler)
        throw 'could not find tres__deregisterBlockingObjectAtPointerEventHandler on scene\'s userData'

      scene?.userData.tres__deregisterBlockingObjectAtPointerEventHandler?.(object as Object3D)

      if (!deregisterAtPointerEventHandler)
        throw 'could not find tres__deregisterAtPointerEventHandler on scene\'s userData'

      if (
        object && supportedPointerEvents.some(eventName => object[eventName])
      )
        deregisterAtPointerEventHandler?.(object as Object3D)
    }

    const deregisterCameraIfRequired = (object: Object3D) => {
      const deregisterCamera = scene?.userData.tres__deregisterCamera

      if (!deregisterCamera)
        throw 'could not find tres__deregisterCamera on scene\'s userData'

      if ((object as Camera).isCamera)
        deregisterCamera?.(object as Camera)
    }

    // Since remove is only called on the node being removed and not on child nodes.
    // We need to recursively remove objects.
    // In order for an object to be able to dispose it has to have
    //   - a dispose method,
    //   - it cannot be a <primitive object={...} />
    //   - it cannot be a THREE.Scene, because three has broken it's own api
    //
    const isPrimitive = node?.primitive
    const shouldDispose = !isPrimitive && (node.dispose === undefined ? node.dispose !== null : false)

    // Add code to detach 
    if (node?.isObject3D && node.parent?.isObject3D) {
      node.parent.remove(node)
      node.removeFromParent?.()
    }

    // Only dispose if it's not a primitive and it has a dispose method,
    //  if its a primitive, disposal needs to be handled by the user.
    if (!isPrimitive && node?.isObject3D) {
      node.children.forEach((child: TresObject) => nodeOps.remove(child))
      disposeMaterialsAndGeometries(node as Object3D)
      deregisterCameraIfRequired(node as Object3D)
      deregisterAtPointerEventHandlerIfRequired?.(node as TresObject)
      for (const p in node) {
        if (p !== 'geometry' && p !== 'material') {
          ;(p as any).dispose?.()
          delete node[p]
        }
      }
    }
    
    if (shouldDispose && node.dispose && node.type !== 'Scene') {
      node.dispose()
    }

    // Add invalidation code similar to https://github.com/pmndrs/react-three-fiber/blob/master/packages/fiber/src/core/utils.ts#L436
  },
  patchProp(node, prop, _prevValue, nextValue) {
    if (node) {
      let root = node
      let key = prop
      if (node.isObject3D && key === 'blocks-pointer-events') {
        if (nextValue || nextValue === '')
          scene?.userData.tres__registerBlockingObjectAtPointerEventHandler?.(node as Object3D)
        else
          scene?.userData.tres__deregisterBlockingObjectAtPointerEventHandler?.(node as Object3D)

        return
      }

      let finalKey = kebabToCamel(key)
      let target = root?.[finalKey]

      if (key === 'args') {
        const prevNode = node as TresObject3D
        const prevArgs = _prevValue ?? []
        const args = nextValue ?? []
        const instanceName = node.userData.tres__name || node.type

        if (instanceName && prevArgs.length && !deepArrayEqual(prevArgs, args)) {
          root = Object.assign(prevNode, new catalogue.value[instanceName](...nextValue))
        }
        return
      }

      if (root.type === 'BufferGeometry') {
        if (key === 'args') return
        root.setAttribute(
          kebabToCamel(key),
          new BufferAttribute(...(nextValue as ConstructorParameters<typeof BufferAttribute>)),
        )
        return
      }

      // Traverse pierced props (e.g. foo-bar=value => foo.bar = value)
      if (key.includes('-') && target === undefined) {
        const chain = key.split('-')
        target = chain.reduce((acc, key) => acc[kebabToCamel(key)], root)
        key = chain.pop() as string
        finalKey = key.toLowerCase()
        if (!target?.set) root = chain.reduce((acc, key) => acc[kebabToCamel(key)], root)
      }
      let value = nextValue
      if (value === '') value = true
      // Set prop, prefer atomic methods if applicable
      if (isFunction(target)) {
        //don't call pointer event callback functions
        if (!supportedPointerEvents.includes(prop)) {
          if (Array.isArray(value)) node[finalKey](...value)
          else node[finalKey](value)
        }
        return
      }
      if (!target?.set && !isFunction(target)) root[finalKey] = value
      else if (target.constructor === value.constructor && target?.copy) target?.copy(value)
      else if (Array.isArray(value)) target.set(...value)
      else if (!target.isColor && target.setScalar) target.setScalar(value)
      else target.set(value)
    }
  },

  parentNode(node) {
    return node?.parent || null
  },
  createText: () => noop('createText'),
  createComment: () => noop('createComment'),

  setText: () => noop('setText'),

  setElementText: () => noop('setElementText'),
  nextSibling: () => noop('nextSibling'),

  querySelector: () => noop('querySelector'),

  setScopeId: () => noop('setScopeId'),
  cloneNode: () => noop('cloneNode'),

  insertStaticContent: () => noop('insertStaticContent'),
}
