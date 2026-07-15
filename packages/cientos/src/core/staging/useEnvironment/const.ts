import type { VectorFlexibleParams } from '@tresjs/core'

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
   * The resolution variant of the preset HDR to load.
   *
   * Only applies when `preset` is set — ignored when loading via `files` / `path`.
   *
   * Higher tiers are sharper but significantly larger
   * (4K ≈ 30–60MB vs ≈1–3MB at 1K). Prefer `'1k'` unless you need the fidelity.
   *
   * @type {EnvironmentPresetQuality}
   * @default '1k'
   */
  quality?: EnvironmentPresetQuality
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
  /**
   * The intensity of the background.
   *
   * @type {number}
   * @default 1
   */
  backgroundIntensity?: number
  /**
   * The rotation of the background.
   *
   * @type {VectorFlexibleParams}
   * @default [0, 0, 0]
   */
  backgroundRotation?: VectorFlexibleParams
  /**
   * The intensity of the environment.
   *
   * @type {number}
   * @default 1
   */
  environmentIntensity?: number
  /**
   * The rotation of the environment.
   *
   * @type {VectorFlexibleParams}
   * @default [0, 0, 0]
   */
  environmentRotation?: VectorFlexibleParams
  /**
   * If true, the environment rotation will be synced with the background rotation.
   * This means when backgroundRotation changes, environmentRotation will be updated to match.
   *
   * @type {boolean}
   * @default false
   */
  syncMaterials?: boolean
}

/**
 * The available resolution variants for preset HDRs.
 */
export type EnvironmentPresetQuality = '1k' | '2k' | '4k'

/**
 * The available preset HDR quality variants, in ascending order.
 */
export const environmentPresetQualities: EnvironmentPresetQuality[] = ['1k', '2k', '4k']

/**
 * Base paths (without resolution suffix) for the preset HDRs hosted in `Tresjs/assets`.
 * The loader appends `_${quality}.hdr` to resolve the final file.
 */
export const environmentPresets = {
  sunset: 'venice/venice_sunset',
  studio: 'studio/poly_haven_studio',
  city: 'city/canary_wharf',
  umbrellas: 'outdoor/outdoor_umbrellas',
  night: 'outdoor/satara_night',
  forest: 'outdoor/mossy_forest',
  snow: 'outdoor/snowy_forest_path_01',
  dawn: 'kiara/kiara_1_dawn',
  hangar: 'indoor/small_hangar_01',
  urban: 'indoor/abandoned_games_room_02',
  modern: 'city/modern_buildings_2',
  shangai: 'city/shanghai_bund',
}

export type EnvironmentPresetsType = keyof typeof environmentPresets
