<script lang="ts" setup>
import type { N8AOProps } from '../../util/n8ao'
import { inject } from 'vue'
import { N8AOPostPass, n8aoPropDefaults, useN8AO } from '../../util/n8ao'
import { effectComposerInjectionKey } from './EffectComposerPmndrs.vue'

export type N8AOPmndrsProps = N8AOProps

const props = withDefaults(defineProps<N8AOPmndrsProps>(), n8aoPropDefaults)

const { pass } = useN8AO(
  inject(effectComposerInjectionKey),
  N8AOPostPass,
  (composer, pass, index) => composer.addPass(pass, index),
  props,
)

defineExpose({ pass })
</script>
