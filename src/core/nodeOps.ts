import { RendererOptions } from 'vue'
import { BufferAttribute, Scene } from 'three'
import { isFunction } from '@alvarosabu/utils'
import { useLogger } from '../composables'
import { catalogue } from './catalogue'
import { TresObject } from '../types'
import { isHTMLTag, kebabToCamel } from '../utils'
import { OBJECT_3D_USER_DATA_KEYS } from '../keys'
import type { Material, BufferGeometry, Object3D } from 'three'

const onRE = /^on[^a-z]/
export const isOn = (key: string) => onRE.test(key)

function noop(fn: string): any {
  fn
}

let fallback: TresObject | null = null
let scene: Scene | null = null

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
    const { GEOMETRY_VIA_PROP, MATERIAL_VIA_PROP } = OBJECT_3D_USER_DATA_KEYS

    if (instance.isObject3D) {
      if (props?.material?.isMaterial) (instance as Object3D).userData[MATERIAL_VIA_PROP] = true
      if (props?.geometry?.isBufferGeometry) (instance as Object3D).userData[GEOMETRY_VIA_PROP] = true
    }

    return instance
  },
  insert(child, parent) {
    if (parent && parent.isScene) scene = parent as unknown as Scene
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

    if (child?.isObject3D && parent?.isObject3D) {
      parent.add(child)
      child.dispatchEvent({ type: 'added' })
      scene?.userData?.[OBJECT_3D_USER_DATA_KEYS.REGISTER_AT_POINTER_EVENT_HANDLER]?.(child)
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
        const { GEOMETRY_VIA_PROP, MATERIAL_VIA_PROP } = OBJECT_3D_USER_DATA_KEYS

        if (!object3D.userData[MATERIAL_VIA_PROP]) (object3D as Object3D & { material: Material }).material?.dispose()
        if (!object3D.userData[GEOMETRY_VIA_PROP])
          (object3D as Object3D & { geometry: BufferGeometry }).geometry?.dispose()
      }

      object3D.traverse((child: Object3D) => {
        disposeMaterialsAndGeometries(child)
      })

      disposeMaterialsAndGeometries(object3D)
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
