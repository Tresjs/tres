import { useLoader, useTresContext } from '@tresjs/core'
import {
  CubeReflectionMapping,
  CubeTextureLoader,
  EquirectangularReflectionMapping,
  Euler,
  Mesh,
  Vector3,
} from 'three'
import { RGBELoader } from 'three-stdlib'
import { computed, ref, toRefs, unref, watch } from 'vue'
import type { LoaderProto } from '@tresjs/core'
import type {
  CubeTexture,
  Scene,
  Texture,
  WebGLCubeRenderTarget,
} from 'three'
import type { Ref } from 'vue'
import { environmentPresets } from './const'
import type { EnvironmentOptions } from './const'

const PRESET_ROOT = 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/hdr/'

/**
 * Converts various rotation formats to an Euler instance
 * @param value - The rotation value to convert
 * @returns An Euler instance or null if conversion fails
 */
function toEuler(value: any): Euler | null {
  if (value instanceof Euler) {
    return value
  }
  if (Array.isArray(value)) {
    return new Euler(value[0], value[1], value[2])
  }
  if (typeof value === 'number') {
    return new Euler(value, value, value)
  }
  if (value instanceof Vector3) {
    return new Euler(value.x, value.y, value.z)
  }
  if (typeof value === 'object' && 'x' in value && 'y' in value && 'z' in value) {
    return new Euler(value.x, value.y, value.z)
  }
  return null
}

/**
 * Updates all materials in the scene
 * @param scene - The scene to update
 */
function updateMaterials(scene: Scene) {
  scene.traverse((child) => {
    if (child instanceof Mesh && child.material) {
      child.material.needsUpdate = true
    }
  })
}

/**
 * Component that loads an environment map and sets it as the scene's background and environment.
 *
 * @export
 * @param {Partial<EnvironmentOptions>} options - The options for the environment map
 *   files = ['/px.png', '/nx.png', '/py.png', '/ny.png', '/pz.png', '/nz.png'],
 *   blur = 0,
 *   background = false,
 *   path = undefined,
 *   preset = undefined,
 *   colorSpace = 'srgb',
 *   backgroundIntensity = 1,
 *   environmentIntensity = 1,
 *   backgroundRotation = [0, 0, 0],
 *   environmentRotation = [0, 0, 0],
 *   syncMaterials = false,
 * @param {Ref<WebGLCubeRenderTarget | null>} fbo - The framebuffer object
 * @return {Promise<Ref<Texture | CubeTexture | null>>} The loaded texture
 */
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
    backgroundIntensity = ref(1),
    environmentIntensity = ref(1),
    backgroundRotation = ref([0, 0, 0]),
    environmentRotation = ref([0, 0, 0]),
    syncMaterials = ref(false),
  } = toRefs(options)

  watch(options, () => {
    invalidate()
  })

  const texture: Ref<Texture | CubeTexture | null> = ref(null)
  const isCubeMap = computed(() => Array.isArray((files as Ref<string[]>).value))
  const loader = computed(() => isCubeMap.value ? CubeTextureLoader : RGBELoader)

  // Watch for texture loading
  watch([files, path], async ([files, path]) => {
    if (!files) { return }
    if (files.length > 0 && !preset?.value) {
      try {
        const result = await useLoader(
          loader.value as unknown as LoaderProto<Texture | CubeTexture>,
          isCubeMap.value ? [...unref(files)] : unref(files),
          (loader: any) => {
            if (path) { loader.setPath(unref(path)) }
          },
        )
        texture.value = Array.isArray(result) ? result[0] : result
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

  // Watch for texture changes
  watch(texture, (value) => {
    if (scene.value && value) {
      scene.value.environment = value
    }
  }, {
    immediate: true,
  })

  // Watch for background changes
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

  // Watch for blur changes
  watch(() => blur?.value, (value) => {
    if (scene.value && value) {
      scene.value.backgroundBlurriness = value
    }
  }, {
    immediate: true,
  })

  // Watch for intensity changes
  watch(() => backgroundIntensity?.value, (value) => {
    if (scene.value) {
      scene.value.backgroundIntensity = value ?? 1
    }
  }, {
    immediate: true,
  })

  watch(() => environmentIntensity?.value, (value) => {
    if (scene.value) {
      scene.value.environmentIntensity = value ?? 1
    }
  }, {
    immediate: true,
  })

  // Watch for background rotation changes
  watch(() => backgroundRotation?.value, (value) => {
    if (scene.value) {
      const euler = toEuler(value)
      if (euler) {
        scene.value.backgroundRotation = euler
      }
    }
  }, {
    immediate: true,
  })

  // Watch for environment rotation changes
  watch(() => environmentRotation?.value, (value) => {
    if (scene.value && !syncMaterials?.value) {
      const euler = toEuler(value)
      if (euler) {
        scene.value.environmentRotation = euler
        updateMaterials(scene.value)
      }
    }
  }, {
    immediate: true,
  })

  // Watch for preset changes
  watch(() => preset?.value, async (value) => {
    if (value && value in environmentPresets) {
      const _path = PRESET_ROOT
      const _files = environmentPresets[value as unknown as keyof typeof environmentPresets]

      try {
        const result = await useLoader(
          RGBELoader as unknown as LoaderProto<Texture>,
          _files,
          (loader) => {
            if (_path) { loader.setPath(_path) }
          },
        )
        texture.value = Array.isArray(result) ? result[0] : result
      }
      catch (error) {
        throw new Error(`Failed to load environment map: ${error}`)
      }
      if (texture.value) {
        texture.value.mapping = EquirectangularReflectionMapping
      }
      invalidate()
    }
    else if (value && !(value in environmentPresets)) {
      throw new Error(`Preset must be one of: ${Object.keys(environmentPresets).join(', ')}`)
    }
  }, {
    immediate: true,
  })

  // Watch for sync materials changes
  watch([syncMaterials, backgroundRotation], ([sync, bgRotation]) => {
    if (sync && scene.value) {
      const euler = toEuler(bgRotation)
      if (euler) {
        scene.value.environmentRotation = euler
        updateMaterials(scene.value)
      }
    }
  }, {
    immediate: true,
  })

  return texture
}
