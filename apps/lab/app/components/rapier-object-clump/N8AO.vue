<script setup lang="ts">
import type { EffectComposer } from 'postprocessing'
import { useTres } from '@tresjs/core'
import { N8AOPostPass } from 'n8ao'
import { Color } from 'three'

interface Props {
  composer: EffectComposer | null | undefined
  aoRadius?: number
  distanceFalloff?: number
  intensity?: number
  aoSamples?: number
  denoiseSamples?: number
  denoiseRadius?: number
  halfRes?: boolean
  color?: string | number
  /** 0=combined, 1=AO only, 2=no denoise, 3=split, 4=split AO */
  renderMode?: 0 | 1 | 2 | 3 | 4
}

const props = withDefaults(defineProps<Props>(), {
  aoRadius: 5,
  distanceFalloff: 1,
  intensity: 5,
  aoSamples: 16,
  denoiseSamples: 8,
  denoiseRadius: 12,
  halfRes: false,
  color: 0x000000,
  renderMode: 0,
})

const { scene, camera, sizes } = useTres()
const pass = shallowRef<N8AOPostPass | null>(null)

const applyConfig = (p: N8AOPostPass) => {
  p.configuration.aoRadius = props.aoRadius
  p.configuration.distanceFalloff = props.distanceFalloff
  p.configuration.intensity = props.intensity
  p.configuration.aoSamples = props.aoSamples
  p.configuration.denoiseSamples = props.denoiseSamples
  p.configuration.denoiseRadius = props.denoiseRadius
  p.configuration.halfRes = props.halfRes
  p.configuration.color = new Color(props.color)
  p.configuration.renderMode = props.renderMode
}

const stop = watchEffect(() => {
  if (pass.value || !props.composer || !scene.value || !camera.value || !sizes.width.value || !sizes.height.value) { return }
  nextTick(() => stop())
  const p = new N8AOPostPass(scene.value, camera.value, sizes.width.value, sizes.height.value)
  applyConfig(p)
  props.composer.addPass(p)
  pass.value = p
})

watch(
  () => [props.aoRadius, props.distanceFalloff, props.intensity, props.halfRes, props.color, props.renderMode],
  () => { if (pass.value) { applyConfig(pass.value) } },
)

watch(
  () => [sizes.width.value, sizes.height.value],
  ([w, h]) => { if (pass.value && w && h) { pass.value.setSize(w, h) } },
)

onUnmounted(() => {
  const p = pass.value
  if (!p) { return }
  if (props.composer) { props.composer.removePass(p) }
  if (typeof p.dispose === 'function') { p.dispose() }
})

defineExpose({ pass })
</script>

<template>
  <slot />
</template>
