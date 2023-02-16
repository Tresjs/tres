import { useLoader } from '@tresjs/core'
import {
  CubeReflectionMapping,
  CubeTexture,
  CubeTextureLoader,
  EquirectangularReflectionMapping,
  LinearEncoding,
  sRGBEncoding,
  Texture,
} from 'three'
import { RGBELoader } from 'three-stdlib'
import { useCientos } from '../useCientos'
import { EnvironmentOptions } from './const'

export async function useEnvironment({
  files = ['/px.png', '/nx.png', '/py.png', '/ny.png', '/pz.png', '/nz.png'],
  blur = 0,
  background = false,
  path = undefined,
  preset = undefined,
  encoding = undefined,
}: Partial<EnvironmentOptions>): Promise<Texture | CubeTexture> {
  const { state } = useCientos()
  const isCubeMap = Array.isArray(files)

  const loader = isCubeMap ? CubeTextureLoader : RGBELoader

  const result = await useLoader(loader, isCubeMap ? [files] : files, (loader: any) => {
    /*  if (path) loader.setPath(path) */
    if (encoding) loader.encoding = encoding
  })

  const texture: Texture | CubeTexture = isCubeMap ? result[0] : result

  if (texture) {
    texture.mapping = isCubeMap ? CubeReflectionMapping : EquirectangularReflectionMapping
    texture.encoding = encoding ?? isCubeMap ? sRGBEncoding : LinearEncoding
  }

  if (background && state.scene) {
    state.scene.environment = texture
    state.scene.background = texture

    if (blur) {
      state.scene.backgroundBlurriness = blur | 0
    }
  }

  return texture
}
