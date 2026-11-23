<script lang="ts" setup>
import type { N8AOProps } from '../../util/n8ao'
import { isProd, logWarning } from '@tresjs/core'
import { Pass } from 'three/examples/jsm/postprocessing/Pass.js'
import { inject } from 'vue'
import { loadN8AOPass, n8aoPropDefaults, useN8AO } from '../../util/n8ao'
import { effectComposerInjectionKey } from './EffectComposer.vue'

export type { N8AOProps }

const props = withDefaults(defineProps<N8AOProps>(), n8aoPropDefaults)

let warned = false

const { pass } = useN8AO(
  inject(effectComposerInjectionKey),
  {
    loadPassClass: loadN8AOPass,
    createPlaceholder: () => {
      const placeholder = new Pass()
      placeholder.enabled = false
      return placeholder
    },
    addPass: (composer, pass, index) => {
      // N8AOPass renders the scene itself, so an earlier RenderPass doubles the scene cost of each frame
      // while the output still looks correct
      const passesBefore = index === undefined ? composer.passes : composer.passes.slice(0, index)
      if (!isProd && !warned && passesBefore.some(p => (p as { isRenderPass?: boolean }).isRenderPass)) {
        warned = true
        logWarning('<N8AO> renders the scene itself, so the RenderPass before it renders the scene a second time each frame. Set `without-render-pass` on <EffectComposer>.')
      }

      index === undefined ? composer.addPass(pass) : composer.insertPass(pass, index)
    },
  },
  props,
)

defineExpose({ pass })
</script>
