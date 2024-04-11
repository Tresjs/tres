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
  * The resolution of the WebGLCubeRenderTarget.
  *
  * @type {number}
  * @default 256
  */
  resolution?: number
  /**
  * The near of the CubeCamera.
  *
  * @type {number}
  * @default 1
  */
  near?: number
  /**
  * The far of the CubeCamera.
  *
  * @type {number}
  * @default 1000
  */
  far?: number
  /**
  * The frames of the cubeCamera.update.
  *
  * @type {number}
  * @default Infinity
  */
  frames?: number
}

export const environmentPresets = {
  sunset: 'venice/venice_sunset_1k.hdr',
  studio: 'studio/poly_haven_studio_1k.hdr',
  city: 'city/canary_wharf_1k.hdr',
  umbrellas: 'outdoor/outdoor_umbrellas_1k.hdr',
  night: 'outdoor/satara_night_1k.hdr',
  forest: 'outood/mossy_forest_1k.hdr',
  snow: 'outdoor/snowy_forest_path_01_1k.hdr',
  dawn: 'kiara/kiara_1_dawn_1k.hdr',
  hangar: 'indoor/small_hangar_01_1k.hdr',
  urban: 'indoor/abandoned_games_room_02_1k.hdr',
  modern: 'city/modern_buildings_2_1k.hdr',
  shangai: 'city/shanghai_bund_1k.hdr',
}

export type EnvironmentPresetsType = keyof typeof environmentPresets
