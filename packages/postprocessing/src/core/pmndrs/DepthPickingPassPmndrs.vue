<script lang="ts" setup>
import type { DepthPackingStrategies } from 'three'
import type { DepthCopyMode } from 'postprocessing'
import { DepthPickingPass } from 'postprocessing'
import { inject, nextTick, onUnmounted, watchEffect } from 'vue'
import { effectComposerInjectionKey } from './EffectComposerPmndrs.vue'

export interface DepthPickingPassPmndrsProps {
  /**
   * The depth packing strategy.
   * Default: RGBADepthPacking
   */
  depthPacking?: DepthPackingStrategies

  /**
   * The depth copy mode.
   * Default: DepthCopyMode.SINGLE
   */
  mode?: DepthCopyMode
}

const props = defineProps<DepthPickingPassPmndrsProps>()
const composer = inject(effectComposerInjectionKey)

const pass = new DepthPickingPass(props)

const unwatch = watchEffect(() => {
  if (!composer?.value) { return }
  nextTick(() => unwatch())
  composer.value.addPass(pass)
})

onUnmounted(() => {
  if (!composer?.value || !pass) { return }

  composer?.value?.removePass(pass)
  pass.dispose()
})

defineExpose({ pass })
</script>
