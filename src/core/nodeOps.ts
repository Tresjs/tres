import { BufferAttribute } from 'three'
import { useCamera, useLogger } from '/@/composables'
import { RendererOptions } from 'vue'
import { catalogue } from './catalogue'
import { isFunction } from '@vueuse/core'
import { TresObject } from '../types'
import { isHTMLTag, kebabToCamel } from '../utils'

const { logWarning } = useLogger()

const onRE = /^on[^a-z]/
export const isOn = (key: string) => onRE.test(key)

function noop(fn: string): any {
  fn
}

let scene: TresObject | null = null

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
      // Let users know that camera is in the center of the scene
      if (!props?.position || props?.position.every((v: number) => v == 0)) {
        logWarning(
          // eslint-disable-next-line max-len
          'Camera is positioned at the center of the scene [0,0,0], if this is not intentional try setting a position if your scene seems empty 🤗',
        )
      }
      const { pushCamera } = useCamera()
      pushCamera(instance)
    }

    if (props?.attach === undefined) {
      if (instance.isMaterial) instance.attach = 'material'
      else if (instance.isBufferGeometry) instance.attach = 'geometry'
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
    const parent = node.parentNode
    if (parent) {
      parent.removeChild(node)
    }
  },
  patchProp(node, prop, _prevValue, nextValue, _isSVG = false, prevChildren, parentComponent) {
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
