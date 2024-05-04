import type { RendererOptions } from 'vue'
import { BufferAttribute } from 'three'
import { isFunction } from '@alvarosabu/utils'
import type { Camera } from 'three'
import type { TresContext } from '../composables'
import { useLogger } from '../composables'
import { deepArrayEqual, disposeObject3D, isHTMLTag, kebabToCamel } from '../utils'
import type { InstanceProps, TresObject, TresObject3D, TresScene } from '../types'
import { catalogue } from './catalogue'

function noop(fn: string): any {
  // eslint-disable-next-line no-unused-expressions
  fn
}

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
  const ctx = instance?.__tres?.root

  if (!ctx) { return }

  if (ctx.render && ctx.render.canBeInvalidated.value) {
    ctx.invalidate()
  }
}

export const nodeOps: () => RendererOptions<TresObject, TresObject | null> = () => {
  let scene: TresScene | null = null
  function createElement(tag: string, _isSVG: undefined, _anchor: any, props: InstanceProps): TresObject | null {
    if (!props) { props = {} }

    if (!props.args) {
      props.args = []
    }
    if (tag === 'template') { return null }
    if (isHTMLTag(tag)) { return null }
    let name = tag.replace('Tres', '')
    let instance: TresObject | null

    if (tag === 'primitive') {
      if (props?.object === undefined) { logError('Tres primitives need a prop \'object\'') }
      const object = props.object as TresObject
      name = object.type
      instance = Object.assign(object.clone(), { type: name }) as TresObject
    }
    else {
      const target = catalogue.value[name]
      if (!target) {
        logError(
          `${name} is not defined on the THREE namespace. Use extend to add it to the catalog.`,
        )
      }
      // eslint-disable-next-line new-cap
      instance = new target(...props.args) as TresObject
    }

    if (!instance) { return null }

    if (instance.isCamera) {
      if (!props?.position) {
        instance.position.set(3, 3, 3)
      }
      if (!props?.lookAt) {
        instance.lookAt(0, 0, 0)
      }
    }

    if (props?.attach === undefined) {
      if (instance.isMaterial) { instance.attach = 'material' }
      else if (instance.isBufferGeometry) { instance.attach = 'geometry' }
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

    if (instance.isObject3D && instance.__tres && (props?.material || props?.geometry)) {
      instance.__tres.disposable = false
    }

    return instance as TresObject
  }
  function insert(child: TresObject, parent: TresObject) {
    if (!child) { return }

    if (parent && parent.isScene) {
      scene = parent as unknown as TresScene
    }

    if (scene && child.__tres) {
      child.__tres.root = scene.__tres.root as TresContext
    }

    const parentObject = parent || scene

    if (child?.isObject3D) {
      const { registerCamera } = child?.__tres?.root as TresContext
      if (child?.isCamera) {
        registerCamera(child as unknown as Camera)
      }

      // Track onPointerMissed objects separate from the scene
      if (child.onPointerMissed && child?.__tres?.root) {
        child?.__tres?.root?.eventManager?.registerPointerMissedObject(child)
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
  }

  function remove(node: TresObject | null) {
    if (!node) { return }
    const ctx = node.__tres
    // remove is only called on the node being removed and not on child nodes.
    node.parent = node.parent || scene

    if (node.isObject3D) {
      const deregisterCameraIfRequired = (object: TresObject) => {
        const deregisterCamera = node?.__tres?.root?.deregisterCamera

        if ((object as unknown as Camera).isCamera) { deregisterCamera?.(object as unknown as Camera) }
      }

      node.removeFromParent?.()

      // Remove nested child objects. Primitives should not have objects and children that are
      // attached to them declaratively ...

      node.traverse((child: TresObject) => {
        deregisterCameraIfRequired(child)
        // deregisterAtPointerEventHandlerIfRequired?.(child as TresObject)
        if (child.onPointerMissed) {
          ctx?.root?.eventManager?.deregisterPointerMissedObject(child)
        }
      })

      deregisterCameraIfRequired(node)
      /*  deregisterAtPointerEventHandlerIfRequired?.(node as TresObject) */
      invalidateInstance(node as TresObject)

      // Dispose the object if it's disposable, primitives needs to be manually disposed by
      // calling dispose from `@tresjs/core` package like this `dispose(model)`
      const isPrimitive = node.__tres?.primitive

      if (!isPrimitive && node.__tres?.disposable) {
        disposeObject3D(node)
      }
      node.dispose?.()
    }
  }
  function patchProp(node: TresObject, prop: string, prevValue: any, nextValue: any) {
    if (node) {
      let root = node
      let key = prop
      if (node?.__tres?.primitive && key === 'object' && prevValue !== null) {
        // If the prop 'object' is changed, we need to re-instance the object and swap the old one with the new one
        const newInstance = createElement('primitive', undefined, undefined, {
          object: nextValue,
        })
        for (const subkey in newInstance) {
          if (subkey === 'uuid') { continue }
          const target = node[subkey]
          const value = newInstance[subkey]
          if (!target?.set && !isFunction(target)) { node[subkey] = value }
          else if (target.constructor === value.constructor && target?.copy) { target?.copy(value) }
          else if (Array.isArray(value)) { target.set(...value) }
          else if (!target.isColor && target.setScalar) { target.setScalar(value) }
          else { target.set(value) }
        }
        if (newInstance?.__tres) {
          newInstance.__tres.root = scene?.__tres.root
        }
        // This code is needed to handle the case where the prop 'object' type change from a group to a mesh or vice versa, otherwise the object will not be rendered correctly (models will be invisible)
        if (newInstance?.isGroup) {
          node.geometry = undefined
          node.material = undefined
        }
        else {
          delete node.isGroup
        }
      }

      if (node?.isObject3D && key === 'blocks-pointer-events') {
        if (nextValue || nextValue === '') { node[key] = nextValue }
        else { delete node[key] }
        return
      }

      let finalKey = kebabToCamel(key)
      let target = root?.[finalKey]

      if (key === 'args') {
        const prevNode = node as TresObject3D
        const prevArgs = prevValue ?? []
        const args = nextValue ?? []
        const instanceName = node?.__tres?.type || node.type

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
        if (key === 'args') { return }
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
        finalKey = key
        if (!target?.set) { root = chain.reduce((acc, key) => acc[kebabToCamel(key)], root) }
      }
      let value = nextValue
      if (value === '') { value = true }
      // Set prop, prefer atomic methods if applicable
      if (isFunction(target)) {
        // don't call pointer event callback functions
        if (!supportedPointerEvents.includes(prop)) {
          if (Array.isArray(value)) { node[finalKey](...value) }
          else { node[finalKey](value) }
        }
        // NOTE: Set on* callbacks
        // Issue: https://github.com/Tresjs/tres/issues/360
        if (finalKey.startsWith('on') && isFunction(value)) {
          root[finalKey] = value
        }
        return
      }
      if (!target?.set && !isFunction(target)) { root[finalKey] = value }
      else if (target.constructor === value.constructor && target?.copy) { target?.copy(value) }
      else if (Array.isArray(value)) { target.set(...value) }
      else if (!target.isColor && target.setScalar) { target.setScalar(value) }
      else { target.set(value) }

      invalidateInstance(node as TresObject)
    }
  }

  function parentNode(node: TresObject) {
    return node?.parent || null
  }

  return {
    insert,
    remove,
    createElement,
    patchProp,
    parentNode,
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
}
