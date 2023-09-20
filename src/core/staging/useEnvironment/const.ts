
export interface EnvironmentOptions {
  /**
   * If true, the environment will be set as the scene's background.
   *
   * @type {boolean}
   * @default false
   */
  background?: boolean | string
  /**
   * The blur radius of the environment.
   *
   * @type {number}
   * @default 0
   */
  blur?: number
  /**
   * The files to load. If a string is provided, it will be loaded as an equirectangular texture.
   * If an array is provided, it will be loaded as a cube texture.
   *
   * @type {(string | string[])}
   */
  files?: string | string[]
  /**
   * The path to the files.
   *
   * @type {string}
   * @default '/'
   */
  path?: string
  /**
   * The preset to use. If provided, the files and path props will be ignored.
   *
   * @type {EnvironmentPresetsType}
   */
  preset?: EnvironmentPresetsType
  /**
   * The encoding of the environment.
   *
   * @type {TextureEncoding}
   */
  encoding?: TextureEncoding
}

export const environmentPresets = {
  sunset: 'venice/venice_sunset_4k.hdr',
}

export type EnvironmentPresetsType = keyof typeof environmentPresets
