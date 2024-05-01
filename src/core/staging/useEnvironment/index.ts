import { useLoader, useTresContext } from '@tresjs/core'
import type {
  CubeTexture,
  Texture,
  WebGLCubeRenderTarget,
} from 'three'
import {
  CubeReflectionMapping,
  CubeTextureLoader,
  EquirectangularReflectionMapping,
} from 'three'
import { RGBELoader } from 'three-stdlib'
import type { Ref } from 'vue'
import { computed, ref, toRefs, unref, watch } from 'vue'
import type { EnvironmentOptions } from './const'
import { environmentPresets } from './const'

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

const PRESET_ROOT = 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/hdr/'
export async function useEnvironment(
  options: Partial<EnvironmentOptions>,
  fbo: Ref<WebGLCubeRenderTarget | undefined>,
): Promise<Texture | CubeTexture> {
  const { scene } = useTresContext()

  const {
    preset,
    blur,
    files = [],
    path = '',
    background,
  } = toRefs(options)

  const texture: Ref<Texture | CubeTexture | undefined> = ref()
  const isCubeMap = computed(() => Array.isArray((files as Ref<string[]>).value))
  const loader = computed(() => isCubeMap.value ? CubeTextureLoader : RGBELoader)

  const result = ref(null)

  watch(() => [files, path], async ([_files, _path]: [Ref<string[]>, Ref<string>]) => {
    if (_files.value.length > 0 && !preset.value) {
      try {
        result.value = await useLoader(
          unref(loader),
          isCubeMap.value ? [unref(_files)] : unref(_files),
          (loader: any) => {
            if (_path.value) { loader.setPath(unref(_path)) }
            /* if (colorSpace) loader.colorSpace = colorSpace */
          },
        )
      }
      catch (error) {
        throw new Error(`Failed to load environment map: ${error}`)
      }
      if (result.value) {
        texture.value = isCubeMap.value ? result.value[0] : result.value
        texture.value.mapping = isCubeMap.value ? CubeReflectionMapping : EquirectangularReflectionMapping
      }
    }
  }, {
    immediate: true,
  })

  watch(() => texture.value, (value) => {
    if (scene.value) {
      scene.value.environment = value
    }
  }, {
    immediate: true,
  })

  watch(() => [background.value, texture.value], ([_background, _texture]) => {
    if (scene.value) {
      const bTexture = fbo?.value ? fbo.value.texture : _texture
      scene.value.background = _background ? bTexture : undefined as unknown as Texture
    }
  }, {
    immediate: true,
  })

  watch(() => blur?.value, (value) => {
    if (scene.value) {
      scene.value.backgroundBlurriness = value
    }
  }, {
    immediate: true,
  })

  watch(preset, async (value) => {
    if (value && value in environmentPresets) {
      const _path = PRESET_ROOT
      const _files = environmentPresets[value as unknown as keyof typeof environmentPresets]

      try {
        result.value = await useLoader(
          RGBELoader,
          _files,
          (loader: any) => {
            if (_path) { loader.setPath(_path) }
            /* if (colorSpace) loader.colorSpace = colorSpace */
          },
        )
      }
      catch (error) {
        throw new Error(`Failed to load environment map: ${error}`)
      }
      if (result.value) {
        texture.value = result.value
        texture.value.mapping = EquirectangularReflectionMapping
      }
    }
    else if (value && !(value in environmentPresets)) {
      throw new Error(`Preset must be one of: ${Object.keys(environmentPresets).join(', ')}`)
    }
  }, {
    immediate: true,
  })

  return { texture }
}
