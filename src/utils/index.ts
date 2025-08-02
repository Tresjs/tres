import type { nodeOps } from 'src/core/nodeOps'
import type { AttachType, LocalState, TresInstance, TresObject, TresPrimitive } from 'src/types'
import type { Material, Mesh, Texture } from 'three'
import type { TresContext } from '../composables/useTresContextProvider'
import { Scene } from 'three'
import { isString, isTresCamera, isTresPrimitive, isUndefined } from './is'
import { filterInPlace } from './array'

export * from './logger'

function hasMap(material: Material): material is Material & { map: Texture | null } {
  return 'map' in material
}

export function disposeMaterial(material: Material): void {
  if (hasMap(material) && material.map) {
    material.map.dispose()
  }

  material.dispose()
}

export function disposeObject3D(object: TresObject): void {
  if (object.parent) {
    object.removeFromParent?.()
  }
  delete object.__tres
  // Clone the children array to safely iterate
  const children = [...object.children]
  children.forEach(child => disposeObject3D(child))

  if (object instanceof Scene) {
    // TODO: Handle Scene-specific cleanup
  }
  else {
    const mesh = object as unknown as Partial<Mesh>
    if (object) {
      object.dispose?.()
    }
    if (mesh.geometry) {
      mesh.geometry.dispose()
    }

    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(material => disposeMaterial(material))
    }
    else if (mesh.material) {
      disposeMaterial(mesh.material)
    }
  }
}

export function resolve(obj: Record<string, any>, key: string) {
  let target = obj
  if (key.includes('-')) {
    const entries = key.split('-')
    let currKey = entries.shift() as string
    while (target && entries.length) {
      if (!(currKey in target)) {
        currKey = joinAsCamelCase(currKey, entries.shift() as string)
      }
      else {
        target = target[currKey]
        currKey = entries.shift() as string
      }
    }
    return { target, key: joinAsCamelCase(currKey, ...entries) }
  }
  else {
    return { target, key }
  }
}

function joinAsCamelCase(...strings: string[]): string {
  return strings.map((s, i) => i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

export function attach(parent: TresInstance, child: TresInstance, type: AttachType) {
  // Checks if a dash-cased string ends with an integer
  const INDEX_REGEX = /-\d+$/

  if (isString(type)) {
    // NOTE: If attaching into an array (foo-0), create one
    if (INDEX_REGEX.test(type)) {
      const typeWithoutTrailingIndex = type.replace(INDEX_REGEX, '')
      const { target, key } = resolve(parent, typeWithoutTrailingIndex)
      if (!Array.isArray(target[key])) {
        // NOTE: Create the array and augment it with a function
        // that resets the original value if the array is empty or
        // `[undefined, undefined, ...]`. The function will be run
        // every time an element is `detach`ed from the array.
        const previousAttach = target[key]
        const augmentedArray: any[] & { __tresDetach?: () => void } = []
        augmentedArray.__tresDetach = () => {
          if (augmentedArray.every(v => isUndefined(v))) {
            target[key] = previousAttach
          }
        }
        target[key] = augmentedArray
      }
    }

    const { target, key } = resolve(parent, type)
    child.__tres.previousAttach = target[key]
    target[key] = unboxTresPrimitive(child)
  }
  else {
    child.__tres.previousAttach = type(parent, child)
  }
}

export function detach(parent: any, child: TresInstance, type: AttachType) {
  if (isString(type)) {
    const { target, key } = resolve(parent, type)
    const previous = child.__tres.previousAttach
    // When the previous value was undefined, it means the value was never set to begin with
    if (previous === undefined) {
      delete target[key]
    }
    // NOTE: If the previous value was not an array, and `attach` turned it into an array
    // then it also set `__tresOnArrayElementsUndefined`. Check for it and revert
    // Otherwise set the previous value
    else {
      target[key] = previous
    }

    if ('__tresDetach' in target) { target.__tresDetach() }
  }
  else {
    child.__tres?.previousAttach?.(parent, child)
  }
  delete child.__tres?.previousAttach
}

export function prepareTresInstance<T extends TresObject>(obj: T, state: Partial<LocalState>, context: TresContext): TresInstance {
  const instance = obj as unknown as TresInstance

  instance.__tres = {
    type: 'unknown',
    root: context,
    memoizedProps: {},
    objects: [],
    parent: null,
    previousAttach: null,
    ...state,
  }

  if (!instance.__tres.attach) {
    if (instance.isMaterial) { instance.__tres.attach = 'material' }
    else if (instance.isBufferGeometry) { instance.__tres.attach = 'geometry' }
    else if (instance.isFog) { instance.__tres.attach = 'fog' }
  }

  return instance
}

export function invalidateInstance(instance: TresObject) {
  const ctx = instance?.__tres?.root

  if (!ctx?.renderer) { return }

  if (ctx.renderer.canBeInvalidated.value) {
    ctx.renderer.invalidate()
  }
}

export function setPrimitiveObject(
  newObject: TresObject,
  primitive: TresPrimitive,
  setTarget: (object: TresObject) => void,
  nodeOpsFns: Pick<ReturnType<typeof nodeOps>, 'patchProp' | 'insert' | 'remove'>,
  context: TresContext,
) {
  // NOTE: copy added/attached Vue children
  // We need to insert `objects` into `newObject` later.
  // In the meantime, `remove(primitive)` will alter
  // the array, so make a copy.
  const objectsToAttach = [...primitive.__tres.objects]

  const oldObject = unboxTresPrimitive(primitive)
  newObject = unboxTresPrimitive(newObject)
  if (oldObject === newObject) { return true }

  const newInstance: TresInstance = prepareTresInstance(newObject, primitive.__tres ?? {}, context)

  // NOTE: `remove`ing `oldInstance` will modify `parent` and `memoizedProps`.
  // Copy before removing.
  const parent = primitive.parent ?? primitive.__tres.parent ?? null
  const propsToPatch = { ...primitive.__tres.memoizedProps }
  // NOTE: `object` is a reference to `oldObject` and not to be patched.
  delete propsToPatch.object

  // NOTE: detach/deactivate added/attached Vue children, but don't
  // otherwise alter them and don't recurse.
  for (const obj of objectsToAttach) {
    doRemoveDetach(obj, context)
    doRemoveDeregister(obj, context)
  }
  oldObject.__tres.objects = []

  nodeOpsFns.remove(primitive)

  for (const [key, value] of Object.entries(propsToPatch)) {
    nodeOpsFns.patchProp(newInstance, key, newInstance[key], value)
  }

  setTarget(newObject)
  nodeOpsFns.insert(primitive, parent)

  // NOTE: insert added/attached Vue children
  for (const obj of objectsToAttach) {
    nodeOpsFns.insert(obj, primitive)
  }

  return true
}

export function unboxTresPrimitive<T>(maybePrimitive: T): T | TresInstance {
  if (isTresPrimitive(maybePrimitive)) {
    // NOTE:
    // `primitive` has-a THREE object. Multiple `primitive`s can have
    // the same THREE object. We want to allow the same THREE object
    // to be inserted in the graph in multiple places, where THREE supports
    // that, e.g., materials and geometries.
    // But __tres (`LocalState`) only allows for a single parent.
    // So: copy `__tres` to the object when unboxing.
    const primitive = maybePrimitive as unknown as TresPrimitive
    primitive.object.__tres = primitive.__tres
    return primitive.object
  }
  else {
    return maybePrimitive
  }
}

export function doRemoveDetach(node: TresObject, context: TresContext) {
  // NOTE: Remove `node` from its parent's __tres parent/objects graph
  const parent = node.__tres?.parent || context.scene.value
  if (node.__tres) { node.__tres.parent = null }
  if (parent && parent.__tres && 'objects' in parent.__tres) {
    filterInPlace(parent.__tres.objects, obj => obj !== node)
  }

  // NOTE: THREE.removeFromParent removes `node` from
  // `parent.children`.
  if (node.__tres?.attach) {
    detach(parent, node as TresInstance, node.__tres.attach)
  }
  else {
    // NOTE: In case this is a primitive, we added the :object, not
    // the primitive. So we "unbox" here to remove the :object.
    // If not a primitive, unboxing returns the argument.
    node.parent?.remove?.(unboxTresPrimitive(node))
    // NOTE: THREE doesn't set `node.parent` when removing `node`.
    // We will do that here to properly maintain the parent/children
    // graph as a source of truth.
    node.parent = null
  }
}

export function doRemoveDeregister(node: TresObject, context: TresContext) {
  // TODO: Refactor as `context.deregister`?
  // That would eliminate `context.deregisterCamera`.
  node.traverse?.((child: TresObject) => {
    if (isTresCamera(child)) {
      context.camera.deregisterCamera(child)
    }
  })

  if (isTresCamera(node)) {
    context.camera.deregisterCamera(node)
  }
  invalidateInstance(node as TresObject)
}
