<template>
  <div style="height: 100vh;">
    <TresCanvas>
      <TresPerspectiveCamera />
      <OrbitControls />
      <EffectComposer>
        <Glitch />
      </EffectComposer>
      <TresMesh ref="donut">
        <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
        <TresMeshBasicMaterial color="orange" />
      </TresMesh>
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
const donut = shallowRef<TresObject>()
const { onLoop } = useRenderLoop()
onLoop(({ delta, elapsed }) => {
  if (donut.value) {
    donut.value.rotation.y += delta
  }
})
</script>
