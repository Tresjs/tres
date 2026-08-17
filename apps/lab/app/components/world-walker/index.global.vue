<script setup lang="ts">
import { Environment } from '@tresjs/cientos'
import { Physics } from '@tresjs/rapier'

const glow = {
  intensity: 0.8,
  threshold: 0.5,
  smoothing: 0.35,
  radius: 0.85,
}

// BloomPmndrs declares no `radius` prop, so binding it does nothing — the value never
// reaches the BloomEffect constructor. It has to be set on the mipmap pass directly.
const bloomRef = shallowRef()
watch(() => bloomRef.value?.effect, (exposed) => {
  const effect = exposed?.value ?? exposed
  if (effect?.mipmapBlurPass) effect.mipmapBlurPass.radius = glow.radius
}, { immediate: true })
</script>

<template>
  <TresCanvas window-size clear-color="#111">
    <TresPerspectiveCamera :position="[0, 8, 10]" :fov="45" :near="0.1" :far="1000" />
    <TresFog color="#626A71" :near="0.1" :far="100" />
    <Suspense>
      <EffectComposerPmndrs :multisampling="4" disable-normal-pass>
        <BloomPmndrs
          ref="bloomRef"
          :intensity="glow.intensity"
          :luminance-threshold="glow.threshold"
          :luminance-smoothing="glow.smoothing"
          mipmap-blur
        />
      </EffectComposerPmndrs>
    </Suspense>
    <Suspense>
      <TresGroup>
        <Environment preset="dawn" background />
        <Physics>
          <WorldWalkerTerrain />
          <WorldWalkerFootman />
        </Physics>
        <WorldWalkerVegetation />
      </TresGroup>
    </Suspense>
  </TresCanvas>
</template>
