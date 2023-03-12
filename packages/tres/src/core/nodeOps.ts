import { Mesh } from 'three'
import { useCamera, useRaycaster, useRenderLoop, useLogger } from '/@/composables'
import { RendererOptions } from 'vue'
import { catalogue } from './catalogue'
import { useEventListener } from '@vueuse/core'
import { TresEvent, TresObject } from '../types'
import { isHTMLTag, kebabToCamel } from '../utils'

const { logWarning } = useLogger()

function hasEvents(obj: any) {
  for (const prop in obj) {
    if (prop.indexOf('on') === 0) {
      return true
    }
  }
  return false
}

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
      instance = new catalogue[tag.replace('Tres', '')](...props.args)
    } else {
      instance = new catalogue[tag.replace('Tres', '')]()
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

    console.log({
      tag,

      instance,
      threeObj: catalogue[tag.replace('Tres', '')],
    })

    return instance
  },
  insert(child, parent, anchor) {
    if (scene === null && parent.isScene) scene = parent
    if (parent === null) parent = scene as TresObject
    //vue core
    /*  parent.insertBefore(child, anchor || null) */
    if (parent?.isObject3D && child?.isObject3D) {
      console.log('insert', { child, parent, anchor })
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

    const { onLoop } = useRenderLoop()

    // RayCasting
    let prevInstance: TresEvent | null = null
    let currentInstance: TresEvent | null = null

    const { raycaster } = useRaycaster()
    if (child && child instanceof Mesh && hasEvents(child)) {
      onLoop(() => {
        if (parent?.children && child && raycaster) {
          const intersects = raycaster.value.intersectObjects(parent.children)

          if (intersects.length > 0 && intersects[0].object.uuid === child.uuid) {
            currentInstance = intersects[0]

            if (prevInstance === null || prevInstance.object.uuid !== currentInstance?.object.uuid) {
              child.onPointerEnter?.(currentInstance)
            }

            child.onPointerMove?.(currentInstance)
          } else {
            currentInstance = null
            if (prevInstance !== null) {
              child.onPointerLeave?.(prevInstance)
            }
          }

          prevInstance = currentInstance
        }
      })

      useEventListener(window, 'click', () => {
        if (currentInstance === null) return
        child.onClick?.(currentInstance)
      })
    }
  },
  remove(node) {
    if (!node) return
    const parent = node.parentNode
    if (parent) {
      parent.removeChild(node)
    }
  },
  patchProp(node, prop, _prevValue, nextValue) {
    if (node) {
      let root = node
      let key = prop
      let target = root?.[kebabToCamel(key)]

      // Traverse pierced props (e.g. foo-bar=value => foo.bar = value)
      if (key.includes('-') && !Object.keys(root).includes(kebabToCamel(key))) {
        const chain = key.split('-')
        target = chain.reduce((acc, key) => acc[key], root)
        key = chain.pop() as string

        if (!target?.set) root = chain.reduce((acc, key) => acc[key], root)
      }
      let value = nextValue
      if (value === '') value = true
      // Set prop, prefer atomic methods if applicable
      if (!target?.set) root[kebabToCamel(key)] = value
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
