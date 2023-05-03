import { isArray } from '@alvarosabu/utils'
import { LoadingManager, Texture, TextureLoader } from 'three'

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
// eslint-disable-next-line require-await
/**
 * Composable for loading textures.
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
 * @param {(Array<string> | { [key: string]: string })} paths
 * @return {*}  {(Promise<Texture | Array<Texture> | PBRTextureMaps>)}
 */
export async function useTexture(
  paths: Array<string> | { [key: string]: string },
): Promise<Texture | Array<Texture> | PBRTextureMaps> {
  const loadingManager = new LoadingManager()
  const textureLoader = new TextureLoader(loadingManager)

  /**
   * Load a texture.
   *
   * @param {string} url
   * @return {*}  {Promise<Texture>}
   */
  const loadTexture = (url: string): Promise<Texture> => {
    return new Promise((resolve, reject) => {
      textureLoader.load(
        url,
        texture => resolve(texture),
        () => null,
        () => {
          reject(new Error('[useTextures] - Failed to load texture'))
        },
      )
    })
  }

  if (isArray(paths)) {
    const textures = await Promise.all((paths as Array<string>).map(path => loadTexture(path)))
    if ((paths as Array<string>).length > 1) {
      return textures
    } else {
      return textures[0]
    }
  } else {
    const { map, displacementMap, normalMap, roughnessMap, metalnessMap, aoMap, alphaMap, matcap
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
