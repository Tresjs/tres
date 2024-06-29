import type { RendererOptions } from 'vue'
import { BufferAttribute, Object3D } from 'three'
import type { TresContext } from '../composables'
import { useLogger } from '../composables'
import { attach, deepArrayEqual, detach, filterInPlace, invalidateInstance, isHTMLTag, kebabToCamel, noop, prepareTresInstance } from '../utils'
import type { InstanceProps, TresInstance, TresObject, TresObject3D } from '../types'
import * as is from '../utils/is'
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
      if (props?.object === undefined) { logError('Tres primitives need a prop \'object\'') }
      const object = props.object as TresObject
      name = object.type
      obj = Object.assign(object.clone(), { type: name }) as TresObject
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

    const instance = prepareTresInstance(obj, {
      ...obj.__tres,
      type: name,
      memoizedProps: props,
      eventCount: 0,
      disposable: true,
      primitive: tag === 'primitive',
      attach: props.attach,
    }, context)

    if (!instance.__tres.attach) {
      if (instance.isMaterial) { instance.__tres.attach = 'material' }
      else if (instance.isBufferGeometry) { instance.__tres.attach = 'geometry' }
      else if (instance.isFog) { instance.__tres.attach = 'fog' }
    }

    // determine whether the material was passed via prop to
    // prevent it's disposal when node is removed later in it's lifecycle
    if (instance.isObject3D && (props?.material || props?.geometry)) {
      instance.__tres.disposable = false
    }

    return obj as TresObject
  }

  function insert(child: TresObject, parent: TresObject) {
    if (!child) { return }
    parent = parent || scene
    const childInstance: TresInstance = (child.__tres ? child as TresInstance : prepareTresInstance(child, {}, context))
    const parentInstance: TresInstance = (parent.__tres ? parent as TresInstance : prepareTresInstance(parent, {}, context))

    context.registerCamera(child)
    // NOTE: Track onPointerMissed objects separate from the scene
    context.eventManager?.registerPointerMissedObject(child)

    let insertedWithAdd = false
    if (childInstance.__tres.attach) {
      attach(parentInstance, childInstance, childInstance.__tres.attach)
    }
    else if (is.object3D(child) && is.object3D(parentInstance)) {
      parentInstance.add(child)
      insertedWithAdd = true
      child.dispatchEvent({ type: 'added' })
    }

    // NOTE: Update __tres parent/objects graph
    childInstance.__tres.parent = parentInstance
    if (parentInstance.__tres?.objects && !insertedWithAdd) {
      if (!parentInstance.__tres.objects.includes(child)) {
        parentInstance.__tres.objects.push(child)
      }
    }
  }

  function remove(node: TresObject | null, dispose?: boolean) {
    // NOTE: `remove` is initially called by Vue only on
    // the root `node` of the tree to be removed. Vue does not
    // pass a `dispose` argument.
    // Where appropriate, we will recursively call `remove`
    // on `children` and `__tres.objects`.
    // We will derive and pass a value for `dispose`, allowing
    // nodes to "bail out" of disposal for their subtree.

    if (!node) { return }

    // NOTE: Derive value for `dispose`.
    // We stop disposal of a node and its tree if any of these are true:
    // 1) it is a <primitive :object="..." />
    // 2) it has :dispose="null"
    // 3) it was bailed out by a parent passing `remove(..., false)`
    const isPrimitive = node.__tres?.primitive
    const isDisposeNull = node.dispose === null
    const isBailedOut = dispose === false
    const shouldDispose = !(isPrimitive || isDisposeNull || isBailedOut)

    // TODO:
    // Figure out why `parent` is being set on `node` here
    // and remove/refactor.
    node.parent = node.parent || scene

    // NOTE: Remove `node` from __tres parent/objects graph
    const parent = node.__tres?.parent || scene
    if (node.__tres) { node.__tres.parent = null }
    if (parent.__tres && 'objects' in parent.__tres) {
      filterInPlace(parent.__tres.objects, obj => obj !== node)
    }

    // NOTE: THREE.removeFromParent removes `node` from
    // `parent.children`.
    if (node.__tres?.attach) {
      detach(parent, node, node.__tres.attach)
    }
    else {
      node.removeFromParent?.()
    }

    // NOTE: Deregister `node` THREE.Object3D children
    node.traverse?.((child) => {
      context.deregisterCamera(child)
      // deregisterAtPointerEventHandlerIfRequired?.(child as TresObject)
      context.eventManager?.deregisterPointerMissedObject(child)
    })

    // NOTE: Deregister `node`
    context.deregisterCamera(node)
    /*  deregisterAtPointerEventHandlerIfRequired?.(node as TresObject) */
    invalidateInstance(node as TresObject)

    // TODO: support removing `attach`ed components

    // NOTE: Recursively `remove` children and objects.
    // Never on primitives:
    // - removing children would alter the primitive :object.
    // - primitives are not expected to have declarative children
    //   and so should not have `objects`.
    if (!isPrimitive) {
      // NOTE: In recursive `remove`, the array elements will
      // remove themselves from these arrays, resulting in
      // skipped elements. Make shallow copies of the arrays.
      if (node.children) {
        [...node.children].forEach(child => remove(child, shouldDispose))
      }
      if (node.__tres && 'objects' in node.__tres) {
        [...node.__tres.objects].forEach(obj => remove(obj, shouldDispose))
      }
    }

    // NOTE: Dispose `node`
    if (shouldDispose && node.dispose && !is.scene(node)) {
      node.dispose()
    }

    delete node.__tres
  }

  function patchProp(node: TresObject, prop: string, prevValue: any, nextValue: any) {
    if (!node) { return }

    let root = node
    let key = prop

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

    if (node.__tres?.primitive && key === 'object' && prevValue !== null) {
      // If the prop 'object' is changed, we need to re-instance the object and swap the old one with the new one
      const newInstance = createElement('primitive', undefined, undefined, {
        object: nextValue,
      })
      for (const subkey in newInstance) {
        if (subkey === 'uuid') { continue }
        const target = node[subkey]
        const value = newInstance[subkey]
        if (!target?.set && !is.fun(target)) { node[subkey] = value }
        else if (target.constructor === value.constructor && target?.copy) { target?.copy(value) }
        else if (Array.isArray(value)) { target.set(...value) }
        else if (!target.isColor && target.setScalar) { target.setScalar(value) }
        else { target.set(value) }
      }
      if (newInstance?.__tres) {
        newInstance.__tres.root = context
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

    if (is.object3D(node) && key === 'blocks-pointer-events') {
      if (nextValue || nextValue === '') { node[key] = nextValue }
      else { delete node[key] }
      return
    }
    // Has events
    if (supportedPointerEvents.includes(prop)) {
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
    return node?.parent || null
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
    const commentObj = new Object3D() as TresObject

    // Set name and type to comment
    // TODO: Add a custom type for comments instead of reusing Object3D. Comments should be light weight and not exist in the scene graph
    commentObj.name = comment
    commentObj.__tres = { type: 'Comment' }

    // Without this we have errors in other nodeOp functions that come across this object
    commentObj.__tres.root = scene?.__tres.root as TresContext

    return commentObj
  }

  // nextSibling - Returns the next sibling of a TresObject
  function nextSibling(node: TresObject) {
    if (!node) { return null }

    const parent = node.parent || scene
    const index = parent.children.indexOf(node)

    return parent.children[index + 1] || null
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
