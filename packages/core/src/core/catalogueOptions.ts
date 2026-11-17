import type { AttachType, CatalogueEntry, LocalState } from '../types'

type CatalogueName = Partial<Pick<LocalState, 'type' | 'primitive'>>

const defaultAttach = new Map<string, AttachType>()
// Separate from `defaultAttach` so `assignsProp`, which runs on every patch, can exit early when it is empty.
const assignedProps = new Map<string, readonly string[]>()

const setOrDelete = <T>(map: Map<string, T>, name: string, value: T | undefined) => {
  if (value) { map.set(name, value) }
  else { map.delete(name) }
}

export const setCatalogueOptions = (name: string, entry: CatalogueEntry | undefined) => {
  setOrDelete(defaultAttach, name, entry?.attach)
  setOrDelete(assignedProps, name, entry?.assign?.length ? entry.assign : undefined)
}

// A primitive's `type` comes from its `:object` (such as 'Mesh'), not from the catalogue, so options never apply.
const catalogueName = (instance: CatalogueName | undefined) =>
  instance?.type && !instance.primitive ? instance.type : undefined

// Vue passes `null` when it removes a prop, so `null` must fall back too.
export const attachOrDefault = (attach: AttachType | null | undefined, instance: CatalogueName | undefined) => {
  if (attach != null) { return attach }
  const name = catalogueName(instance)
  return name ? defaultAttach.get(name) : undefined
}

export const assignsProp = (instance: CatalogueName | undefined, key: string) => {
  if (assignedProps.size === 0) { return false }
  const name = catalogueName(instance)
  return !!name && !!assignedProps.get(name)?.includes(key)
}
