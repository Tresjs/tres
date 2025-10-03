<script lang="ts">
import { useTresContext } from '@tresjs/core'
import { useDevicePixelRatio } from '@vueuse/core'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { type InjectionKey, onUnmounted, provide, type ShallowRef, shallowRef, watchEffect } from 'vue'

export const effectComposerInjectionKey: InjectionKey<ShallowRef<EffectComposer | null>> = Symbol('effectComposerThree')

export interface EffectComposerProps {
  enabled?: boolean
  withoutRenderPass?: boolean
}
</script>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<EffectComposerProps>(),
  { enabled: true },
)

const effectComposer: ShallowRef<EffectComposer | null> = shallowRef(null)
provide(effectComposerInjectionKey, effectComposer)

defineExpose({ composer: effectComposer })

const { renderer, sizes, scene, camera } = useTresContext()

const initEffectComposer = () => {
  effectComposer.value?.dispose()
  effectComposer.value = new EffectComposer(renderer.instance)
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
    if (camera.activeCamera.value && scene.value && effectComposer.value) {
      effectComposer.value.addPass(new RenderPass(scene.value, camera.activeCamera.value))
    }
  })
}

renderer.replaceRenderFunction((notifySuccess) => {
  if (effectComposer.value && props.enabled) {
    effectComposer.value.render()
    notifySuccess()
  }
})

onUnmounted(() => {
  effectComposer.value?.dispose()
})
</script>

<template>
  <slot></slot>
</template>
