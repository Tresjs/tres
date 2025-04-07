<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { TextureEffect } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'
import type { Texture } from 'three'
import { watch } from 'vue'

export interface TexturePmndrsProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction
  /**
   * The texture.
   */
  texture?: Texture
  /**
   * The opacity of the effect.
   */
  opacity?: number
}

const props = defineProps<TexturePmndrsProps>()

const { pass, effect } = useEffectPmndrs(() => new TextureEffect(props), props)

defineExpose({
  pass,
  effect,
})

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
  ],
  effect,
  () => new TextureEffect(),
)

watch(
  [() => props.opacity],
  () => {
    if (props.opacity !== undefined) {
      effect.value?.blendMode.setOpacity(props.opacity)
    }
    else {
      const plainEffect = new TextureEffect()
      effect.value?.blendMode.setOpacity(plainEffect.blendMode.getOpacity())
      plainEffect.dispose()
    }
  },
  {
    immediate: true,
  },
)
</script>
