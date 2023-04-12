import { BufferAttribute } from 'three'
import { useCamera } from '/@/composables'
import { RendererOptions } from 'vue'
import { catalogue } from './catalogue'
import { isFunction } from '@vueuse/core'
import { TresObject } from '../types'
import { isHTMLTag, kebabToCamel } from '../utils'

import type { Object3D, Material, BufferGeometry } from 'three'

const onRE = /^on[^a-z]/
export const isOn = (key: string) => onRE.test(key)

function noop(fn: string): any {
  fn
}

let scene: TresObject | null = null

const OBJECT_3D_USER_DATA_KEYS = {
  GEOMETRY_VIA_PROP: 'tres__geometryViaProp',
  MATERIAL_VIA_PROP: 'tres__materialViaProp',
}

export const nodeOps: RendererOptions<TresObject, TresObject> = {
  createElement(tag, _isSVG, _anchor, props) {
    if (tag === 'template') return null
    if (isHTMLTag(tag)) return null
    let instance

    if (props === null) props = {}

    if (props?.args) {
      instance = new catalogue.value[tag.replace('Tres', '')](...props.args)
    } else {
      instance = new catalogue.value[tag.replace('Tres', '')]()
    }

    if (instance.isCamera) {
      if (!props?.position) {
        instance.position.set(3, 3, 3)
      }
      if (!props?.lookAt) {
        instance.lookAt(0, 0, 0)
      }
      const { pushCamera } = useCamera()
      pushCamera(instance)
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

    instance.events = {}

    return instance
  },
  insert(child, parent, anchor) {
    if (scene === null && parent.isScene) scene = parent
    if (parent === null) parent = scene as TresObject
    //vue core
    /*  parent.insertBefore(child, anchor || null) */
    if (parent?.isObject3D && child?.isObject3D) {
      const index = anchor ? parent.children.indexOf(anchor) : 0
      child.parent = parent
      parent.children.splice(index, 0, child)
      child.dispatchEvent({ type: 'added' })
    } else if (typeof child?.attach === 'string') {
      child.__previousAttach = child[parent?.attach]
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

      object3D.traverse(child => disposeMaterialsAndGeometries(child))

      disposeMaterialsAndGeometries(object3D)
    }

    node.removeFromParent?.()

    node.dispose?.()
  },
  patchProp(node, prop, _prevValue, nextValue) {
    if (node) {
      let root = node
      let key = prop
      const camelKey = kebabToCamel(key)
      let target = root?.[camelKey]

      if (!node.parent) {
        node.parent = scene as TresObject
      }

      if (root.type === 'BufferGeometry') {
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

        if (!target?.set) root = chain.reduce((acc, key) => acc[kebabToCamel(key)], root)
      }
      if (isOn(key)) {
        node.events[key] = nextValue
      }
      let value = nextValue
      if (value === '') value = true
      // Set prop, prefer atomic methods if applicable
      if (isFunction(target)) {
        if (Array.isArray(value)) node[camelKey](...value)
        else node[camelKey](value)
        return
      }
      if (!target?.set && !isFunction(target)) root[camelKey] = value
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
