import type { LocalState } from '../types'
import { isTresPrimitive } from '../utils/is'
import { assignsProp } from './catalogueOptions'

interface Cloneable { clone: () => object }

interface CloneOwner { root: object, key: string }

// Tres can write into its own clones; tracking them avoids a new clone on every patch.
const tresClones = new WeakMap<object, CloneOwner>()

const isTresClone = (value: object, root: object, key: string) => {
  const owner = tresClones.get(value)
  return owner?.root === root && owner.key === key
}

const findDescriptor = (object: object, key: string) => {
  for (let proto: object | null = object; proto; proto = Object.getPrototypeOf(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, key)
    if (descriptor) { return descriptor }
  }
}

export const isNonArrayObject = (value: unknown): value is object =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isCloneable = (value: object): value is Cloneable =>
  'clone' in value && typeof value.clone === 'function'

// `Object3D` defines `position`, `rotation`, `quaternion` and `scale` as read-only own properties.
const isWritableProp = (object: object, key: string) => {
  // A primitive is a Proxy over an empty object, so read the descriptor from its `:object`.
  const owner = isTresPrimitive(object) ? object.object : object
  const descriptor = findDescriptor(owner, key)
  return !descriptor || !!descriptor.writable || !!descriptor.set
}

// The user's object (from an earlier patch, or from `args` for an assigned prop) or a Tres clone; never write into the user's.
export const isReplaceable = (
  root: object,
  key: string,
  current: unknown,
  previous: unknown,
  instance: LocalState | undefined,
): current is object =>
  isNonArrayObject(current)
  && (current === previous || isTresClone(current, root, key) || assignsProp(instance, key))
  && isWritableProp(root, key)

export const tresOwnedValue = (root: Record<string, unknown>, key: string, current: object) => {
  if (isTresClone(current, root, key) || !isCloneable(current)) { return current }
  const clone = current.clone()
  tresClones.set(clone, { root, key })
  root[key] = clone
  return clone
}
