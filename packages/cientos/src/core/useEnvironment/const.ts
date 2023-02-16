import { TextureEncoding } from 'three'

export type EnvironmentOptions = {
  background?: boolean
  blur?: number
  files?: string | string[]
  path?: string
  preset?: EnvironmentPresetsType
  encoding?: TextureEncoding
}

export const environmentPresets = {
  sunset: 'venice/venice_sunset_1k.hdr',
}

export type EnvironmentPresetsType = keyof typeof environmentPresets
