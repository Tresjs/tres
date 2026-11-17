import type { LocalState } from '../types'
import { isTresPrimitive } from '../utils/is'
import { assignsProp } from './catalogueOptions'

interface Cloneable { clone: () => object }

// Tres can write into its own clones; tracking them avoids a new clone on every patch.
const tresClones = new WeakSet<object>()

export const isNonArrayObject = (value: unknown): value is object =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isCloneable = (value: object): value is Cloneable =>
  'clone' in value && typeof value.clone === 'function'

// `Object3D` defines `position`, `rotation`, `quaternion` and `scale` as read-only own properties.
const isWritableProp = (object: object, key: string) => {
  // A primitive is a Proxy over an empty object, so read the descriptor from its `:object`.
  const owner = isTresPrimitive(object) ? object.object : object
  const descriptor = Object.getOwnPropertyDescriptor(owner, key)
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
  && (current === previous || tresClones.has(current) || assignsProp(instance, key))
  && isWritableProp(root, key)

export const tresOwnedValue = (root: Record<string, unknown>, key: string, current: object) => {
  if (tresClones.has(current) || !isCloneable(current)) { return current }
  const clone = current.clone()
  tresClones.add(clone)
  root[key] = clone
  return clone
}
