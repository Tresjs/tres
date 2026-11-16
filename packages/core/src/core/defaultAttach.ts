import type { AttachType } from '../types'

const defaultAttach = new Map<string, AttachType>()

export const setDefaultAttach = (name: string, attach: AttachType | undefined) => {
  if (attach) { defaultAttach.set(name, attach) }
  else { defaultAttach.delete(name) }
}

// Vue passes `null` when it removes a prop, so `null` must fall back too.
export const attachOrDefault = (attach: AttachType | null | undefined, name: string | undefined) =>
  attach ?? (name ? defaultAttach.get(name) : undefined)
