/* import { useLoader } from '../../../../tres/src/core/useLoader' */
import { useLoader } from '@tresjs/core'
import { EnvironmentPresetsType } from './const'
import {
  CubeReflectionMapping,
  CubeTexture,
  CubeTextureLoader,
  EquirectangularReflectionMapping,
  LinearEncoding,
  sRGBEncoding,
  Texture,
  TextureEncoding,
} from 'three'
import { defineComponent, PropType } from 'vue'

import { useCientos } from '../useCientos'
import { RGBELoader } from 'three-stdlib'

export const Environment = defineComponent({
  name: 'Environment',
  props: {
    background: {
      type: Boolean,
      default: false,
    },
    blur: {
      type: Number,
      default: 0,
    },
    files: {
      type: [String, Array],
      required: true,
    },
    encoding: Object as PropType<TextureEncoding>,
    path: {
      type: String,
      default: '/',
    },
    preset: Object as PropType<EnvironmentPresetsType>,
  },
  async setup(props, { expose }) {
    const { state } = useCientos()
    let texture: Texture | CubeTexture | null = null
    const isCubeMap = Array.isArray(props.files)

    expose({ getTexture: () => texture })
    const loader = isCubeMap ? CubeTextureLoader : RGBELoader

    const result = await useLoader(loader, isCubeMap ? [props.files] : props.files, (loader: any) => {
      /* if (props.path) loader.setPath(props.path) */
      if (props.encoding) loader.encoding = props.encoding
    })

    texture = isCubeMap ? result[0] : result

    if (texture) {
      texture.mapping = isCubeMap ? CubeReflectionMapping : EquirectangularReflectionMapping
      texture.encoding = props.encoding ?? isCubeMap ? sRGBEncoding : LinearEncoding
    }

    if (props.background && state.scene) {
      state.scene.environment = texture
      state.scene.background = texture

      if (props.blur) {
        state.scene.backgroundBlurriness = props.blur | 0
      }
    }
    return () => {
      texture
    }
  },
})
