<script setup lang="ts">
import {
  AccumulativeShadows,
  Environment,
  OrbitControls,
  RandomizedLights,
} from '@tresjs/cientos'

const gl = {
  clearColor: '#839681',
  shadows: true,
  alpha: false,
  powerPreference: 'high-performance',
}

useControls('fpsgraph', {
  uuid: 'gelatinous-cube-experiment',
})
</script>

<template>
  <ClientOnly>
    <TresLeches uuid="gelatinous-cube-experiment" />
  </ClientOnly>
  <TresCanvas window-size v-bind="gl">
    <TresPerspectiveCamera :position="[15, 0, 15]" :fov="25" />
    <OrbitControls
      :min-polar-angle="0"
      :max-polar-angle="Math.PI / 2"
      auto-rotate
      :auto-rotate-speed="0.05"
    />

    <TresAmbientLight :intensity="Math.PI" />

    <TresGroup :position="[0, -2.5, 0]">
      <Suspense>
        <GelatinousCubeModel />
      </Suspense>

      <AccumulativeShadows
        :frames="100"
        :alpha-test="0.9"
        color="#3ead5d"
        :color-blend="1"
        :opacity="0.8"
        :scale="20"
      >
        <RandomizedLights
          :radius="10"
          :ambient="0.5"
          :intensity="Math.PI"
          :position="[2.5, 8, -2.5]"
          :bias="0.001"
        />
      </AccumulativeShadows>
    </TresGroup>

    <Suspense>
      <Environment preset="sunset" background :blur="1" />
    </Suspense>

    <TheScreenshot />
  </TresCanvas>
</template>
