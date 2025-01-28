<script lang="ts" setup>
import type { DepthPackingStrategies } from 'three'
import { DepthPickingPass } from 'postprocessing'
import { inject, nextTick, onUnmounted, watchEffect } from 'vue'
import { effectComposerInjectionKey } from './EffectComposerPmndrs.vue'

export interface DepthPickingPassPmndrsProps {
  depthPacking?: DepthPackingStrategies
  mode?: number
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
  if (!composer?.value || !pass.value) { return }

  composer?.value?.removePass(pass.value)
  pass.value.dispose()
})

defineExpose({ pass })
</script>
