import { useRenderPipeline } from '@tresjs/core/webgpu'
import type { RenderPipelineCallbackState } from '@tresjs/core/webgpu'
import type { Node } from 'three/webgpu'
import type { PropType } from 'vue'
import { defineComponent, onUnmounted, watch } from 'vue'
import type { ComposedEffect } from './context'
import { buildOutput, collectOwnedNodes, disposeUnused, nextNodeId } from './graph'

// A child of the composer, so `enabled: false` unmounts it and core restores the default render function.
export default defineComponent({
  name: 'RenderPipelineHost',
  props: {
    effects: { type: Array as PropType<readonly ComposedEffect[]>, required: true },
  },
  setup(props) {
    let owned = new Set<Node>()

    const build = ({ renderPipeline, passes, scene, camera, renderer }: RenderPipelineCallbackState) => {
      const input = passes.scenePass.getTextureNode()
      const firstId = nextNodeId()
      const { output, outputColorTransform } = buildOutput(input, props.effects, { passes, scene, camera, renderer })
      renderPipeline.outputNode = output
      renderPipeline.outputColorTransform = outputColorTransform
      const next = collectOwnedNodes(output, firstId, owned, [passes.scenePass, input])
      disposeUnused(owned, next)
      owned = next
    }

    // `rebuild` re-runs the callbacks in a new session (new store reads are tracked) and also recreates the scene pass.
    const { rebuild } = useRenderPipeline(build)
    watch(() => props.effects, () => rebuild())

    onUnmounted(() => {
      disposeUnused(owned, new Set())
      owned = new Set()
    })

    return () => null
  },
})
