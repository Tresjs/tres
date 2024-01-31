import type { RendererOptions } from 'vue'
import { BufferAttribute } from 'three'
import { isFunction } from '@alvarosabu/utils'
import type { Object3D, Camera } from 'three'
import type { TresContext } from '../composables'
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
  'onContextMenu',
  'onPointerMove',
  'onPointerEnter',
  'onPointerLeave',
  'onPointerOver',
  'onPointerOut',
  'onDoubleClick',
  'onPointerDown',
  'onPointerUp',
  'onPointerCancel',
  'onPointerMissed',
  'onLostPointerCapture',
  'onWheel',
]

export function invalidateInstance(instance: TresObject) {
  const ctx = instance.__tres.root
  
  if (!ctx) return
  
  if (ctx.render && ctx.render.canBeInvalidated.value) {
    ctx.invalidate()
  }

}

export const nodeOps: RendererOptions<TresObject, TresObject | null> = {
  createElement(tag, _isSVG, _anchor, props): TresObject | null {
    if (!props) props = {}

    if (!props.args) {
      props.args = []
    }
    if (tag === 'template') return null
    if (isHTMLTag(tag)) return null
    let name = tag.replace('Tres', '')
    let instance: TresObject | null

    if (tag === 'primitive') {
      if (props?.object === undefined)
        logError('Tres primitives need a prop \'object\'')
      const object = props.object as TresObject
      name = object.type
      instance = Object.assign(object, { type: name, attach: props.attach })
    }
    else {
      const target = catalogue.value[name]
      if (!target) {
        logError(
          `${name} is not defined on the THREE namespace. Use extend to add it to the catalog.`,
        )
      }
      instance = new target(...props.args)
    }

    if (!instance) return null

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

    instance.__tres = {
      ...instance.__tres,
      type: name,
      memoizedProps: props,
      eventCount: 0,
      disposable: true,
      primitive: tag === 'primitive',
    }

    // determine whether the material was passed via prop to
    // prevent it's disposal when node is removed later in it's lifecycle

    if (instance.isObject3D && (props?.material || props?.geometry)) {
      instance.__tres.disposable = false
    }

    return instance as TresObject
  },
  insert(child, parent) {
    if (!child) return
    
    if (parent && parent.isScene) {
      scene = parent as unknown as TresScene
    }

    if (scene) {
      child.__tres.root = scene.__tres.root as TresContext
    }

    const parentObject = parent || scene
    
    if (child?.isObject3D) {
      const { registerCamera, registerObjectAtPointerEventHandler } = child.__tres.root
      if (child?.isCamera) {
        registerCamera(child as unknown as Camera)
      }
      // if (
      //   child && supportedPointerEvents.some(eventName => child[eventName])
      // ) {
      //   registerObjectAtPointerEventHandler(child as Object3D)
      // }
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
    const ctx = node.__tres
    // remove is only called on the node being removed and not on child nodes.
    const { 
      deregisterObjectAtPointerEventHandler,
      deregisterBlockingObjectAtPointerEventHandler, 
    } = ctx.root

    if (node.isObject3D) {

      const disposeMaterialsAndGeometries = (object3D: TresObject) => {
        const tresObject3D = object3D as TresObject3D
        // TODO: to be improved on https://github.com/Tresjs/tres/pull/466/files
        if (ctx.disposable) {
          tresObject3D.material?.dispose()
          tresObject3D.material = undefined
          tresObject3D.geometry?.dispose()
          tresObject3D.geometry = undefined
        }
      }

      // const deregisterAtPointerEventHandlerIfRequired = (object: TresObject) => {
      //   deregisterBlockingObjectAtPointerEventHandler(object as Object3D)
      //   if (
      //     object && supportedPointerEvents.some(eventName => object[eventName])
      //   )
      //     deregisterObjectAtPointerEventHandler?.(object as Object3D)
      // }

      const deregisterCameraIfRequired = (object: Object3D) => {
        const deregisterCamera = node.__tres.root.deregisterCamera

        if ((object as Camera).isCamera) deregisterCamera?.(object as Camera)
      }

      node.removeFromParent?.()

      node.traverse((child: Object3D) => {
        disposeMaterialsAndGeometries(child as TresObject)
        deregisterCameraIfRequired(child)
        // deregisterAtPointerEventHandlerIfRequired?.(child as TresObject)
      })

      disposeMaterialsAndGeometries(node)
      deregisterCameraIfRequired(node as Object3D)
      // deregisterAtPointerEventHandlerIfRequired?.(node as TresObject)
    }

    invalidateInstance(node as TresObject)
    node.dispose?.()
  },
  patchProp(node, prop, _prevValue, nextValue) {
    if (node) {
      let root = node
      let key = prop

      if (node.__tres.root) {
        // const { 
        //   registerBlockingObjectAtPointerEventHandler,
        //   deregisterBlockingObjectAtPointerEventHandler, 
        // } = node.__tres.root
      }
      if (node?.isObject3D && key === 'blocks-pointer-events') {
      //   if (nextValue || nextValue === '')
      //     registerBlockingObjectAtPointerEventHandler(node as Object3D)
      //   else
      //     deregisterBlockingObjectAtPointerEventHandler(node as Object3D)

        if (nextValue || nextValue === '')
          node[key] = nextValue
        else
          delete node[key]
        return
      }
        
        let finalKey = kebabToCamel(key)
      let target = root?.[finalKey]

      if (key === 'args') {
        const prevNode = node as TresObject3D
        const prevArgs = _prevValue ?? []
        const args = nextValue ?? []
        const instanceName = node.__tres.type || node.type

        if (
          instanceName
          && prevArgs.length
          && !deepArrayEqual(prevArgs, args)
        ) {
          root = Object.assign(
            prevNode,
            new catalogue.value[instanceName](...nextValue),
          )
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
        console.log(key)
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

      invalidateInstance(node as TresObject)
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
