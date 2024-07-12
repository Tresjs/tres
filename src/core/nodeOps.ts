import { type RendererOptions, isRef } from 'vue'
import { BufferAttribute, Object3D } from 'three'
import type { TresContext } from '../composables'
import { useLogger } from '../composables'
import { attach, deepArrayEqual, doRemoveDeregister, doRemoveDetach, invalidateInstance, isHTMLTag, kebabToCamel, noop, prepareTresInstance, setPrimitiveObject, unboxTresPrimitive } from '../utils'
import type { DisposeType, InstanceProps, LocalState, TresInstance, TresObject, TresObject3D, TresPrimitive } from '../types'
import * as is from '../utils/is'
import { createRetargetingProxy } from '../utils/primitive/createRetargetingProxy'
import { catalogue } from './catalogue'

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

export const nodeOps: (context: TresContext) => RendererOptions<TresObject, TresObject | null> = (context) => {
  const scene = context.scene.value

  function createElement(tag: string, _isSVG: undefined, _anchor: any, props: InstanceProps): TresObject | null {
    if (!props) { props = {} }

    if (!props.args) {
      props.args = []
    }
    if (tag === 'template') { return null }
    if (isHTMLTag(tag)) { return null }
    let name = tag.replace('Tres', '')
    let obj: TresObject | null

    if (tag === 'primitive') {
      if (!is.obj(props.object) || isRef(props.object)) {
        logError(
          'Tres primitives need an \'object\' prop, whose value is an object or shallowRef<object>',
        )
      }
      name = props.object.type
      const __tres = {}
      const primitive = createRetargetingProxy(
        props.object,
        {
          object: t => t,
          isPrimitive: () => true,
          __tres: () => __tres,
        },
        {
          object: (object: TresObject, _: unknown, primitive: TresPrimitive, setTarget: (nextObject: TresObject) => void) => {
            setPrimitiveObject(object, primitive, setTarget, { patchProp, remove, insert }, context)
          },
          __tres: (t: LocalState) => { Object.assign(__tres, t) },
        },
      )
      obj = primitive
    }
    else {
      const target = catalogue.value[name]
      if (!target) {
        logError(
          `${name} is not defined on the THREE namespace. Use extend to add it to the catalog.`,
        )
      }
      // eslint-disable-next-line new-cap
      obj = new target(...props.args) as TresObject
    }

    if (!obj) { return null }

    if (obj.isCamera) {
      if (!props?.position) {
        obj.position.set(3, 3, 3)
      }
      if (!props?.lookAt) {
        obj.lookAt(0, 0, 0)
      }
    }

    obj = prepareTresInstance(obj, {
      ...obj.__tres,
      type: name,
      memoizedProps: props,
      eventCount: 0,
      primitive: tag === 'primitive',
      attach: props.attach,
    }, context)

    return obj as TresObject
  }

  function insert(child: TresObject, parent: TresObject) {
    if (!child) { return }

    // TODO: Investigate and eventually remove `scene` fallback.
    // According to the signature, `parent` should always be
    // truthy. If it is not truthy, it may be due to a bug
    // elsewhere in Tres.
    parent = parent || scene
    const childInstance: TresInstance = (child.__tres ? child as TresInstance : prepareTresInstance(child, {}, context))
    const parentInstance: TresInstance = (parent.__tres ? parent as TresInstance : prepareTresInstance(parent, {}, context))
    child = unboxTresPrimitive(childInstance)
    parent = unboxTresPrimitive(parentInstance)

    if (child.__tres && child.__tres?.eventCount > 0) {
      context.eventManager?.registerObject(child)
    }

    context.registerCamera(child)
    // NOTE: Track onPointerMissed objects separate from the scene
    context.eventManager?.registerPointerMissedObject(child)

    if (childInstance.__tres.attach) {
      attach(parentInstance, childInstance, childInstance.__tres.attach)
    }
    else if (is.object3D(child) && is.object3D(parentInstance)) {
      parentInstance.add(child)
      child.dispatchEvent({ type: 'added' })
    }

    // NOTE: Update __tres parent/objects graph
    childInstance.__tres.parent = parentInstance
    if (parentInstance.__tres.objects && !parentInstance.__tres.objects.includes(childInstance)) {
      parentInstance.__tres.objects.push(childInstance)
    }
  }

  /**
   * @param node – the node root to remove
   * @param dispose – the disposal type
   */
  function remove(node: TresObject | null, dispose?: DisposeType) {
    // NOTE: `remove` is initially called by Vue only on
    // the root `node` of the tree to be removed. We will
    // recursively call the function on children, if necessary.
    // NOTE: Vue does not pass a `dispose` argument; it is
    // used by the recursive calls.

    if (!node) { return }

    // Remove from event manager if necessary
    if (node?.__tres && node.__tres?.eventCount > 0) {
      context.eventManager?.deregisterObject(node)
    }

    // NOTE: Derive `dispose` value for this `remove` call and
    // recursive remove calls.
    dispose = is.und(dispose) ? 'default' : dispose
    const userDispose = node.__tres?.dispose
    if (!is.und(userDispose)) {
      if (userDispose === null) {
        // NOTE: Treat as `false` to act like R3F
        dispose = false
      }
      else {
        // NOTE: Otherwise, if the user has defined a `dispose`, use it
        dispose = userDispose
      }
    }

    // NOTE: Create a `shouldDispose` boolean for readable predicates below.
    // 1) If `dispose` is "default", then:
    //   - dispose declarative components, e.g., <TresMeshNormalMaterial />
    //   - do *not* dispose primitives or their non-declarative children
    // 2) Otherwise, follow `dispose`
    const isPrimitive = node.__tres?.primitive
    const shouldDispose = dispose === 'default' ? !isPrimitive : !!(dispose)

    // NOTE: This function has 5 stages:
    // 1) Recursively remove `node`'s children
    // 2) Detach `node` from its parent
    // 3) Deregister `node` with `context` and invalidate
    // 4) Dispose `node`
    // 5) Remove `node`'s `LocalState`

    // NOTE: 1) Recursively remove `node`'s children
    // NOTE: Remove declarative children.
    if (node.__tres && 'objects' in node.__tres) {
    // NOTE: In the recursive `remove` calls, the array elements
    // will remove themselves from the array, resulting in skipped
    // elements. Make a shallow copy of the array.
      [...node.__tres.objects].forEach(obj => remove(obj, dispose))
    }

    // NOTE: Remove remaining THREE children.
    // On primitives, we do not remove THREE children unless disposing.
    // Otherwise we would alter the user's `:object`.
    if (shouldDispose) {
      // NOTE: In the recursive `remove` calls, the array elements
      // will remove themselves from the array, resulting in skipped
      // elements. Make a shallow copy of the array.
      if (node.children) {
        [...node.children].forEach(child => remove(child, dispose))
      }
    }

    // NOTE: 2) Detach `node` from its parent
    doRemoveDetach(node, context)

    // NOTE: 3) Deregister `node` THREE.Object3D children and invalidate `node`
    doRemoveDeregister(node, context)

    // NOTE: 4) Dispose `node`
    if (shouldDispose && !is.scene(node)) {
      if (is.fun(dispose)) {
        dispose(node as TresInstance)
      }
      else if (is.fun(node.dispose)) {
        try {
          node.dispose()
        }
        catch (e) {
          // NOTE: We must try/catch here. We want to remove/dispose
          // Vue/THREE children in bottom-up order. But THREE objects
          // will e.g., call `this.material.dispose` without checking
          // if the material exists, leading to an error.
          // See issue #721:
          // https://github.com/Tresjs/tres/issues/721
          // Cannot read properties of undefined (reading 'dispose') - GridHelper
        }
      }
    }

    // NOTE: 5) Remove `LocalState`
    if ('__tres' in node) {
      delete node.__tres
    }
  }

  function patchProp(node: TresObject, prop: string, prevValue: any, nextValue: any) {
    if (!node) { return }

    let root = node
    let key = prop

    // NOTE: Update memoizedProps with the new value
    if (node.__tres) { node.__tres.memoizedProps[prop] = nextValue }

    if (prop === 'attach') {
      // NOTE: `attach` is not a field on a TresObject.
      // `nextValue` is a string representing how Tres
      // should attach `node` to its parent – if the
      // parent exists.
      const maybeParent = node.__tres?.parent || node.parent
      remove(node)
      prepareTresInstance(node, { attach: nextValue }, context)
      if (maybeParent) { insert(node, maybeParent) }
      return
    }

    if (prop === 'dispose') {
      // NOTE: Add node.__tres, if necessary.
      if (!node.__tres) { node = prepareTresInstance(node, {}, context) }
      node.__tres!.dispose = nextValue
      return
    }

    if (is.object3D(node) && key === 'blocks-pointer-events') {
      if (nextValue || nextValue === '') { node[key] = nextValue }
      else { delete node[key] }
      return
    }
    // Has events
    if (supportedPointerEvents.includes(prop) && node.__tres) {
      node.__tres.eventCount += 1
    }
    let finalKey = kebabToCamel(key)
    let target = root?.[finalKey]

    if (key === 'args') {
      const prevNode = node as TresObject3D
      const prevArgs = prevValue ?? []
      const args = nextValue ?? []
      const instanceName = node.__tres?.type || node.type

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
      // TODO: A standalone function called `resolve` is
      // available in /src/utils/index.ts. It's covered by tests.
      // Refactor below to DRY.
      const chain = key.split('-')
      target = chain.reduce((acc, key) => acc[kebabToCamel(key)], root)
      key = chain.pop() as string
      finalKey = key
      if (!target?.set) { root = chain.reduce((acc, key) => acc[kebabToCamel(key)], root) }
    }
    let value = nextValue
    if (value === '') { value = true }
    // Set prop, prefer atomic methods if applicable
    if (is.fun(target)) {
      // don't call pointer event callback functions

      if (!supportedPointerEvents.includes(prop)) {
        if (is.arr(value)) { node[finalKey](...value) }
        else { node[finalKey](value) }
      }
      // NOTE: Set on* callbacks
      // Issue: https://github.com/Tresjs/tres/issues/360
      if (finalKey.startsWith('on') && is.fun(value)) {
        root[finalKey] = value
      }
      return
    }
    if (!target?.set && !is.fun(target)) { root[finalKey] = value }
    else if (target.constructor === value.constructor && target?.copy) { target?.copy(value) }
    else if (is.arr(value)) { target.set(...value) }
    else if (!target.isColor && target.setScalar) { target.setScalar(value) }
    else { target.set(value) }

    invalidateInstance(node as TresObject)
  }

  function parentNode(node: TresObject): TresObject | null {
    return node?.__tres?.parent || null
  }

  /**
   * createComment
   *
   * Creates a comment object that can be used to represent a commented out string in a vue template
   * Used by Vue's internal runtime as a placeholder for v-if'd elements
   *
   * @param comment Any commented out string contaiend in a vue template, typically this is `v-if`
   * @returns TresObject
   */
  function createComment(comment: string): TresObject {
    // TODO: Add a custom type for comments instead of reusing Object3D. Comments should be light weight and not exist in the scene graph
    const commentObj = prepareTresInstance(new Object3D(), { type: 'Comment' }, context)
    commentObj.name = comment
    return commentObj
  }

  // nextSibling - Returns the next sibling of a TresObject
  function nextSibling(node: TresObject) {
    const parent = parentNode(node)
    const siblings = parent?.__tres?.objects || []
    const index = siblings.indexOf(node)

    // NOTE: If not found OR this is the last of the siblings ...
    if (index < 0 || index >= siblings.length - 1) { return null }

    return siblings[index + 1]
  }

  return {
    insert,
    remove,
    createElement,
    patchProp,
    parentNode,
    createText: () => noop('createText'),
    createComment,
    setText: () => noop('setText'),
    setElementText: () => noop('setElementText'),
    nextSibling,
    querySelector: () => noop('querySelector'),
    setScopeId: () => noop('setScopeId'),
    cloneNode: () => noop('cloneNode'),
    insertStaticContent: () => noop('insertStaticContent'),
  }
}
