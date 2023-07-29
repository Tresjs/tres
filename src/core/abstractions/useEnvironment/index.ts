import { useLoader, useTresContext } from '@tresjs/core'
import {
  CubeReflectionMapping,
  CubeTexture,
  CubeTextureLoader,
  EquirectangularReflectionMapping,
  SRGBColorSpace,
  Texture,
} from 'three'
import { RGBELoader } from 'three-stdlib'
import { EnvironmentOptions, environmentPresets } from './const'

/**
 * Component that loads an environment map and sets it as the scene's background and environment.
 *
 * @export
 * @param {Partial<EnvironmentOptions>} {
 *   files = ['/px.png', '/nx.png', '/py.png', '/ny.png', '/pz.png', '/nz.png'],
 *   blur = 0,
 *   background = false,
 *   path = undefined,
 *   preset = undefined,
 *   colorSpace = undefined,
 * }
 * @return {*}  {(Promise<Texture | CubeTexture>)}
 */
export async function useEnvironment({
  files = ['/px.png', '/nx.png', '/py.png', '/ny.png', '/pz.png', '/nz.png'],
  blur = 0,
  background = false,
  path = '/',
  preset = undefined,
}: Partial<EnvironmentOptions>): Promise<Texture | CubeTexture> {
  const { scene } = useTresContext()

  if (preset) {
    if (!(preset in environmentPresets))
      throw new Error('Preset must be one of: ' + Object.keys(environmentPresets).join(', '))
    files = environmentPresets[preset]
    path = 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/hdr/'
  }

  const isCubeMap = Array.isArray(files)

  const loader = isCubeMap ? CubeTextureLoader : RGBELoader

  const result = await useLoader(
    // @ts-expect-error There is a bug in the types for useLoader
    loader,
    isCubeMap ? [files] : files,
    (loader: any) => {
      if (path) loader.setPath(path)
      /* if (colorSpace) loader.colorSpace = colorSpace */
    },
  )

  const texture: Texture | CubeTexture = isCubeMap ? result[0] : result

  if (texture) {
    texture.mapping = isCubeMap ? CubeReflectionMapping : EquirectangularReflectionMapping
    texture.colorSpace = SRGBColorSpace
  }

  if (scene.value) {
    scene.value.environment = texture
    if (background) {
      scene.value.background = texture
    }
    if (blur) {
      scene.value.backgroundBlurriness = blur | 0
    }
  }

  return texture
}
