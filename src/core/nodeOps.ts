import { BufferAttribute, BufferGeometry, Material, Mesh, Object3D } from 'three'
import { useCamera, useRaycaster, useRenderLoop, useLogger } from '/@/composables'
import { RendererOptions } from 'vue'
import { catalogue } from './catalogue'
import { isFunction, useEventListener } from '@vueuse/core'
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

    // determine whether the material was passed via prop to
    // prevent it's disposal when node is removed later in it's lifecycle
    const { GEOMETRY_VIA_PROP, MATERIAL_VIA_PROP } = OBJECT_3D_USER_DATA_KEYS

    if (instance.isObject3D) {
      if (props?.material?.isMaterial) (instance as Object3D).userData[MATERIAL_VIA_PROP] = true
      if (props?.geometry?.isBufferGeometry) (instance as Object3D).userData[GEOMETRY_VIA_PROP] = true
    }

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

    const { onLoop } = useRenderLoop()

    // RayCasting
    let prevInstance: TresEvent | null = null
    let currentInstance: TresEvent | null = null

    if (child && child instanceof Mesh && hasEvents(child)) {
      const { raycaster } = useRaycaster()
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

    node.dispose?.() // TODO is dispose ever set?
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
