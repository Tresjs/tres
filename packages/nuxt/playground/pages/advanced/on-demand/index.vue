<script setup lang="ts">
const renderTimes = ref(0)
useControls({
  renderTimes: {
    value: renderTimes,
    type: 'graph',
    label: 'Render Times (ms)',
    onUpdate: () => {
      renderTimes.value = 0
    },
  },
}, {
  uuid: 'on-demand',
})

function onRender() {
  renderTimes.value = 1
}
</script>

<template>
  <div class="w-full h-screen relative">
    <ClientOnly>
      <TresLeches uuid="on-demand" />
    </ClientOnly>
    <TresCanvas
      render-mode="on-demand"
      @render="onRender"
    >
      <TresPerspectiveCamera />
      <Suspense>
        <Environment
          background
          preset="sunset"
          :blur="0.8"
        />
      </Suspense>
      <TresMesh>
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
      <OrbitControls />
    </TresCanvas>
  </div>
</template>
