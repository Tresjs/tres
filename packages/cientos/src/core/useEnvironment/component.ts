import { EnvironmentOptions, EnvironmentPresetsType } from './const'
import { CubeTexture, Texture, TextureEncoding } from 'three'
import { defineComponent, PropType } from 'vue'

import { useEnvironment } from '.'

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
    },
    encoding: Object as PropType<TextureEncoding>,
    path: String,
    preset: Object as PropType<EnvironmentPresetsType>,
  },
  async setup(props, { expose }) {
    let texture: Texture | CubeTexture | null = null

    expose({ getTexture: () => texture })

    texture = await useEnvironment(props as EnvironmentOptions)

    return () => {
      texture
    }
  },
})
