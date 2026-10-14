<script lang="ts" setup>
import type { N8AOProps } from '../../util/n8ao'
import { Pass } from 'postprocessing'
import { inject } from 'vue'
import { loadN8AOPostPass, n8aoPropDefaults, useN8AO } from '../../util/n8ao'
import { effectComposerInjectionKey } from './EffectComposerPmndrs.vue'

export type N8AOPmndrsProps = N8AOProps

const props = withDefaults(defineProps<N8AOPmndrsProps>(), n8aoPropDefaults)

const { pass } = useN8AO(
  inject(effectComposerInjectionKey),
  {
    loadPassClass: loadN8AOPostPass,
    createPlaceholder: () => {
      const placeholder = new Pass('N8AOPlaceholder')
      placeholder.enabled = false
      return placeholder
    },
    addPass: (composer, pass, index) => composer.addPass(pass, index),
  },
  props,
)

defineExpose({ pass })
</script>
