import { RendererOptions } from 'vue'
import { BufferAttribute } from 'three'
import { isFunction } from '@alvarosabu/utils'
import { useLogger } from '../composables'
import { catalogue } from './catalogue'
import { isHTMLTag, kebabToCamel } from '../utils'

import type { Object3D, Camera } from 'three'
import type { TresObject, TresObject3D, TresScene } from '../types'

const onRE = /^on[^a-z]/
export const isOn = (key: string) => onRE.test(key)

function noop(fn: string): any {
  fn
}

function deepEqual(a, b) {
  // If both are primitives, return true if they are equal
  if (a === b) return true;

  // If either of them is null or not an object, return false
  if (a === null || typeof a !== "object" || b === null || typeof b !== "object") return false;

  // Get the keys of both objects
  const keysA = Object.keys(a), keysB = Object.keys(b);

  // If they have different number of keys, they are not equal
  if (keysA.length !== keysB.length) return false;

  // Check each key in A to see if it exists in B and its value is the same in both
  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
}

function deepArrayEqual(arr1, arr2) {
  // If they're not both arrays, return false
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;

  // If they don't have the same length, they're not equal
  if (arr1.length !== arr2.length) return false;

  // Check each element of arr1 against the corresponding element of arr2
  for (let i = 0; i < arr1.length; i++) {
    if (!deepEqual(arr1[i], arr2[i])) return false;
  }

  return true;
}

let fallback: TresObject | null = null
let scene: TresScene | null = null

const { logError } = useLogger()

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
      if (props?.object === undefined) logError(`Tres primitives need a prop 'object'`)
      const object = props.object as TresObject
      name = object.type
      instance = Object.assign(object, { type: name, attach: props.attach, primitive: true })
    } else {
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

    return instance
  },
  insert(child, parent) {
    if (parent && parent.isScene) scene = parent as unknown as TresScene
    if (
      (child?.__vnode?.type === 'TresGroup' || child?.__vnode?.type === 'TresObject3D') &&
      parent === null &&
      !child?.__vnode?.ctx?.asyncResolved
    ) {
      fallback = child
      return
    } else if (child?.__vnode?.type.includes('Controls') && parent === null) {
      fallback = scene as unknown as TresObject
    }

    if (!parent) parent = fallback as TresObject

    if (child?.isObject3D) {
      if (child?.isCamera) {
        if (!scene?.userData.tres__registerCamera)
          throw 'could not find tres__registerCamera on scene\'s userData'

        scene?.userData.tres__registerCamera?.(child as unknown as Camera)
      }


      if (
        child?.onClick ||
        child?.onPointerMove ||
        child?.onPointerEnter ||
        child?.onPointerLeave
      ) {
        if (!scene?.userData.tres__registerAtPointerEventHandler)
          throw 'could not find tres__registerAtPointerEventHandler on scene\'s userData'

        scene?.userData.tres__registerAtPointerEventHandler?.(child as Object3D)
      }
    }


    if (child?.isObject3D && parent?.isObject3D) {
      parent.add(child)
      child.dispatchEvent({ type: 'added' })
    } else if (child?.isFog) {
      parent.fog = child
    } else if (typeof child?.attach === 'string') {
      child.__previousAttach = child[parent?.attach as string]
      if (parent) {
        parent[child.attach] = child
      }
    }
  },
  remove(node) {
    if (!node) return
    // remove is only called on the node being removed and not on child nodes.

    if (node.isObject3D) {
      const object3D = node as unknown as Object3D

      const disposeMaterialsAndGeometries = (object3D: Object3D) => {
        const tresObject3D = object3D as TresObject3D

        if (!object3D.userData.tres__materialViaProp) tresObject3D.material?.dispose()
        if (!object3D.userData.tres__geometryViaProp)
          tresObject3D.geometry?.dispose()
      }

      const deregisterAtPointerEventHandler = scene?.userData.tres__deregisterAtPointerEventHandler


      const deregisterAtPointerEventHandlerIfRequired = (object: TresObject) => {
        if (!deregisterAtPointerEventHandler)
          throw 'could not find tres__deregisterAtPointerEventHandler on scene\'s userData'

        if (
          object?.onClick ||
          object?.onPointerMove ||
          object?.onPointerEnter ||
          object?.onPointerLeave
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

      object3D.traverse((child: Object3D) => {
        disposeMaterialsAndGeometries(child)
        deregisterCameraIfRequired(child)
        deregisterAtPointerEventHandlerIfRequired?.(child as TresObject)
      })

      disposeMaterialsAndGeometries(object3D)
      deregisterCameraIfRequired(object3D)
      deregisterAtPointerEventHandlerIfRequired?.(object3D as TresObject)
    }

    node.removeFromParent?.()

    node.dispose?.()
  },
  patchProp(node, prop, _prevValue, nextValue) {
    if (node) {
      let root = node
      let key = prop
      let finalKey = kebabToCamel(key)
      let target = root?.[finalKey]

      if (key === 'args' && !deepArrayEqual(_prevValue, nextValue)) {
        const prevNode = node as TresObject3D

        if (node.type && nextValue.length > 0) {
          root = Object.assign(prevNode, new catalogue.value[node.type](...nextValue))
        }
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
        if (Array.isArray(value)) node[finalKey](...value)
        else node[finalKey](value)
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
