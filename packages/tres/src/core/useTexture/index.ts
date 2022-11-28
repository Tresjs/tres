import { isArray } from '@alvarosabu/utils'
import { LoadingManager, Texture, TextureLoader } from 'three'

export interface PBRMaterialOptions {
  maps: string[]
  ext: 'png' | 'jpg'
}

export interface PBRTextureMaps {
  [key: string]: Texture | null
}
// eslint-disable-next-line require-await
export async function useTexture(
  paths: Array<string> | { [key: string]: string },
): Promise<Texture | Array<Texture> | PBRTextureMaps> {
  const loadingManager = new LoadingManager()
  const textureLoader = new TextureLoader(loadingManager)

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
    if (paths.length > 1) {
      return textures
    } else {
      return textures[0]
    }
  } else {
    const { map, displacementMap, normalMap, roughnessMap, metalnessMap, aoMap } = paths as { [key: string]: string }
    return {
      map: map ? await loadTexture(map) : null,
      displacementMap: displacementMap ? await loadTexture(displacementMap) : null,
      normalMap: normalMap ? await loadTexture(normalMap) : null,
      roughnessMap: roughnessMap ? await loadTexture(roughnessMap) : null,
      metalnessMap: metalnessMap ? await loadTexture(metalnessMap) : null,
      aoMap: aoMap ? await loadTexture(aoMap) : null,
    }
  }

  /*   const getPbrTextures = async (path: string, options: PBRMaterialOptions = { maps: ['albedo'], ext: 'png' }) => {
    const [albedoMap, normalMap, roughnessMap, metalnessMap] = await Promise.all(
      options.maps.map(map => loadTexture(`${path}${map}.${options.ext}`)),
    )

    return {
      map: albedoMap,
      normalMap,
      roughnessMap,
      metalnessMap,
    }
  } */

  /*  return new MeshStandardMaterial({
      map: albedoMap,
      normalMap,
      roughnessMap,
      metalnessMap,
    })
  } */
  /*   return { textureLoader, loadTexture, getPbrMaterial } */
}
