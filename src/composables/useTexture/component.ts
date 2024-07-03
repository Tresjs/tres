import { defineComponent, reactive } from 'vue'
import { useTexture } from './index'
import type { PBRUseTextureMap } from './index'

export const UseTexture = defineComponent<PBRUseTextureMap>({
  name: 'UseTexture',
  props: ['map', 'displacementMap', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'alphaMap', 'matcap'] as unknown as undefined,
  async setup(props, { slots }) {
    const data = await reactive(useTexture(props))

    return () => {
      if (slots.default) { return slots.default(data) }
    }
  },
})
