import type { Texture } from 'three'
import { LoadingManager, TextureLoader } from 'three'
import { isArray } from '../../utils'

export interface PBRMaterialOptions {
  /**
   * List of texture maps to load.
   *
   * @type {string[]}
   * @memberof PBRMaterialOptions
   */
  maps: string[]
  /**
   * Path to the texture maps.
   *
   * @type {('png' | 'jpg')}
   * @memberof PBRMaterialOptions
   */
  ext: 'png' | 'jpg'
}

export interface PBRTextureMaps {
  [key: string]: Texture | null
}

/**
 * Map of textures to load that can be passed to `useTexture()`.
 */
export interface PBRUseTextureMap {
  map?: string
  displacementMap?: string
  normalMap?: string
  roughnessMap?: string
  metalnessMap?: string
  aoMap?: string
  alphaMap?: string
  matcap?: string
}

/**
 * Loads a single texture.
 *
 * ```ts
 * import { useTexture } from 'tres'
 *
 * const matcapTexture = await useTexture(['path/to/texture.png'])
 * ```
 * Then you can use the texture in your material.
 *
 * ```vue
 * <TresMeshMatcapMaterial :matcap="matcapTexture" />
 * ```
 * @see https://tresjs.org/examples/load-textures.html
 * @export
 * @param paths
 * @return A promise of the resulting texture
 */
export async function useTexture(paths: readonly [string]): Promise<Texture>
/**
 * Loads multiple textures.
 *
 * ```ts
 * import { useTexture } from 'tres'
 *
 * const [texture1, texture2] = await useTexture([
 *  'path/to/texture1.png',
 *  'path/to/texture2.png',
 * ])
 * ```
 * Then you can use the texture in your material.
 *
 * ```vue
 * <TresMeshStandardMaterial map="texture1" />
 * ```
 * @see https://tresjs.org/examples/load-textures.html
 * @export
 * @param paths
 * @return A promise of the resulting textures
 */
export async function useTexture<T extends string[]>(
  paths: [...T]
): Promise<{ [K in keyof T]: Texture }>
/**
 * Loads a PBR texture map.
 *
 * ```ts
 * import { useTexture } from 'tres'
 *
 * const pbrTexture = await useTexture({
 *  map: 'path/to/texture.png',
 *  displacementMap: 'path/to/displacement-map.png',
 *  roughnessMap: 'path/to/roughness-map.png',
 *  normalMap: 'path/to/normal-map.png',
 *  ambientOcclusionMap: 'path/to/ambient-occlusion-map.png',
 * })
 * ```
 * Then you can use the texture in your material.
 *
 * ```vue
 * <TresMeshStandardMaterial v-bind="pbrTexture" />
 * ```
 * @see https://tresjs.org/examples/load-textures.html
 * @export
 * @param paths
 * @return A promise of the resulting pbr texture map
 */
export async function useTexture<TextureMap extends PBRUseTextureMap>(
  paths: TextureMap
): Promise<{
  [K in keyof Required<PBRUseTextureMap>]: K extends keyof TextureMap
    ? Texture
    : null
}>

export async function useTexture(
  paths: readonly [string] | string[] | PBRUseTextureMap,
): Promise<Texture | Texture[] | PBRTextureMaps> {
  const loadingManager = new LoadingManager()
  const textureLoader = new TextureLoader(loadingManager)

  /**
   * Load a texture.
   *
   * @param {string} url
   * @return {*}  {Promise<Texture>}
   */
  const loadTexture = (url: string): Promise<Texture> => new Promise((resolve, reject) => {
    textureLoader.load(
      url,
      texture => resolve(texture),
      () => null,
      () => {
        reject(new Error('[useTextures] - Failed to load texture'))
      },
    )
  })

  if (isArray(paths)) {
    const textures = await Promise.all((paths as Array<string>).map(path => loadTexture(path)))
    if ((paths as Array<string>).length > 1) {
      return textures
    }
    else {
      return textures[0]
    }
  }
  else {
    const { map, displacementMap, normalMap, roughnessMap, metalnessMap, aoMap, alphaMap, matcap,
    } = paths as { [key: string]: string }
    return {
      map: map ? await loadTexture(map) : null,
      displacementMap: displacementMap ? await loadTexture(displacementMap) : null,
      normalMap: normalMap ? await loadTexture(normalMap) : null,
      roughnessMap: roughnessMap ? await loadTexture(roughnessMap) : null,
      metalnessMap: metalnessMap ? await loadTexture(metalnessMap) : null,
      aoMap: aoMap ? await loadTexture(aoMap) : null,
      alphaMap: alphaMap ? await loadTexture(alphaMap) : null,
      matcap: matcap ? await loadTexture(matcap) : null,
    }
  }
}
