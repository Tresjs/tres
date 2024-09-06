import { useLoader, useTresContext } from '@tresjs/core'
import {
  CubeReflectionMapping,
  CubeTextureLoader,
  EquirectangularReflectionMapping,
} from 'three'
import { RGBELoader } from 'three-stdlib'
import { computed, ref, toRefs, unref, watch } from 'vue'
import type { LoaderProto, TresLoader } from '@tresjs/core'
import type {
  CubeTexture,
  Texture,
  WebGLCubeRenderTarget,
} from 'three'
import type { Ref } from 'vue'
import { environmentPresets } from './const'
import type { EnvironmentOptions } from './const'

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
 * @return {*}  {(Promise<Ref<Texture | CubeTexture | undefined>>)}
 */

const PRESET_ROOT = 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/hdr/'
export async function useEnvironment(
  options: Partial<EnvironmentOptions>,
  fbo: Ref<WebGLCubeRenderTarget | null>,
): Promise<Ref<Texture | CubeTexture | null>> {
  const { scene, invalidate } = useTresContext()

  const {
    preset,
    blur,
    files = ref([]),
    path = ref(''),
    background,
  } = toRefs(options)

  watch(options, () => {
    invalidate()
  })

  const texture: Ref<Texture | CubeTexture | null> = ref(null)
  const isCubeMap = computed(() => Array.isArray((files as Ref<string[]>).value))
  const loader = computed(() => isCubeMap.value ? CubeTextureLoader as unknown as LoaderProto<CubeTexture | RGBELoader> : RGBELoader as unknown as LoaderProto<CubeTexture | RGBELoader>)

  watch([files, path], async ([files, path]) => {
    if (!files) { return }
    if (files.length > 0 && !preset?.value) {
      try {
        texture.value = await useLoader<CubeTexture | RGBELoader>(
          loader.value,
          isCubeMap.value ? [...unref(files)] : unref(files),
          (loader: any) => {
            if (path) { loader.setPath(unref(path)) }
            /* if (colorSpace) loader.colorSpace = colorSpace */
          },
        )
      }
      catch (error) {
        throw new Error(`Failed to load environment map: ${error}`)
      }
      if (texture.value) {
        texture.value.mapping = isCubeMap.value ? CubeReflectionMapping : EquirectangularReflectionMapping
      }
    }
  }, {
    immediate: true,
  })

  watch(texture, (value) => {
    if (scene.value && value) {
      scene.value.environment = value
    }
  }, {
    immediate: true,
  })

  watch([background, texture], ([background, texture]) => {
    if (scene.value) {
      const bTexture = fbo?.value ? fbo.value.texture : texture
      if (bTexture) {
        scene.value.background = background ? bTexture as Texture : null
      }
    }
  }, {
    immediate: true,
  })

  watch(() => blur?.value, (value) => {
    if (scene.value && value) {
      scene.value.backgroundBlurriness = value
    }
  }, {
    immediate: true,
  })

  watch(() => preset?.value, async (value) => {
    if (value && value in environmentPresets) {
      const _path = PRESET_ROOT
      const _files = environmentPresets[value as unknown as keyof typeof environmentPresets]

      try {
        texture.value = await useLoader<RGBELoader>(
          RGBELoader as unknown as LoaderProto<RGBELoader>,
          _files,
          (loader: TresLoader<RGBELoader>) => {
            if (_path) { loader.setPath(_path) }
            /* if (colorSpace) loader.colorSpace = colorSpace */
          },
        )
      }
      catch (error) {
        throw new Error(`Failed to load environment map: ${error}`)
      }
      if (texture.value) {
        if (texture.value) {
          texture.value.mapping = EquirectangularReflectionMapping
        }
      }
      invalidate()
    }
    else if (value && !(value in environmentPresets)) {
      throw new Error(`Preset must be one of: ${Object.keys(environmentPresets).join(', ')}`)
    }
  }, {
    immediate: true,
  })

  return texture
}
