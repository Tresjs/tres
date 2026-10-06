<script lang="ts" setup>
import type { N8AOProps } from '../../util/n8ao'
import { inject } from 'vue'
import { N8AOPass, n8aoPropDefaults, useN8AO } from '../../util/n8ao'
import { effectComposerInjectionKey } from './EffectComposer.vue'

export type { N8AOProps }

const props = withDefaults(defineProps<N8AOProps>(), n8aoPropDefaults)

const { pass } = useN8AO(
  inject(effectComposerInjectionKey),
  N8AOPass,
  (composer, pass, index) => index === undefined ? composer.addPass(pass) : composer.insertPass(pass, index),
  props,
)

defineExpose({ pass })
</script>
