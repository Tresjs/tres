<script lang="ts">
import { useLoop, useTresContext } from '@tresjs/core'
import { useDevicePixelRatio } from '@vueuse/core'
import { EffectComposer as EffectComposerThreejs } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { type InjectionKey, onUnmounted, provide, type ShallowRef, shallowRef, watchEffect } from 'vue'

export const effectComposerInjectionKey: InjectionKey<ShallowRef<EffectComposerThreejs | null>> = Symbol('effectComposerThree')
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  enabled?: boolean
  withoutRenderPass?: boolean
}>(), {
  enabled: true,
})

const effectComposer: ShallowRef<EffectComposerThreejs | null> = shallowRef(null)
provide(effectComposerInjectionKey, effectComposer)

defineExpose({ composer: effectComposer })

const { renderer, sizes, scene, camera, render: renderCtx } = useTresContext()

const initEffectComposer = () => {
  effectComposer.value?.dispose()
  effectComposer.value = new EffectComposerThreejs(renderer.value)
}
watchEffect(initEffectComposer)

watchEffect(() => {
  const { width, height } = sizes

  if (height.value && width.value) {
    effectComposer.value?.setSize(width.value, height.value)
  }
})

const { pixelRatio } = useDevicePixelRatio() // the renderers pixel ratio is not used because it is not reactive
watchEffect(() => {
  effectComposer.value?.setPixelRatio(pixelRatio.value)
})

if (!props.withoutRenderPass) {
  watchEffect(() => {
    if (camera.value && scene.value && effectComposer.value) {
      effectComposer.value.addPass(new RenderPass(scene.value, camera.value))
    }
  })
}

const { render } = useLoop()

render(() => {
  if (renderCtx.frames.value > 0 && effectComposer.value && props.enabled) {
    effectComposer.value.render()
  }

  renderCtx.frames.value = renderCtx.mode.value === 'always'
    ? 1
    : Math.max(0, renderCtx.frames.value - 1)
})

onUnmounted(() => {
  effectComposer.value?.dispose()
})
</script>

<template>
  <slot></slot>
</template>
