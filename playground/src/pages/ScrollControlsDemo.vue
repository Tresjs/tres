<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { ScrollControls, Stars, Sphere, Box } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'
import { TresLeches, useControls } from '@tresjs/leches';
import '@tresjs/leches/styles'

const scRef = ref()
const sphereRef = ref()
const boxRef = ref()
const progress = ref(0)

watchEffect(() => {
  // eslint-disable-next-line no-console
  console.log('jaime ~ progress:', progress.value)
})

const gl = {
  clearColor: '#333',
  alpha: true,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

useControls('fpsgraph')
useControls({
  progress: progress.value
})

const { onLoop } = useRenderLoop()
onLoop(() => {
  if (boxRef.value) {
    boxRef.value.value.rotation.x = progress.value * 10
    boxRef.value.value.rotation.y = progress.value * 2
  }
})
</script>
<template>
  <TresLeches class="important-fixed" />
  <TresCanvas v-bind="gl" ref="canvasRef" window-size>
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Stars :radius="1" />
    <TresGridHelper :args="[10, 10]" />

    <ScrollControls ref="scRef" v-model="progress" :distance="10" :smooth-scroll="0.1" html-scroll>
      <Sphere ref="sphereRef" :scale="0.1" :position="[1, 2, 0]" />
      <Box ref="boxRef" :scale="0.5" :color="0xff00ff" :position="[-1, 1, 0]" />
    </ScrollControls>
  </TresCanvas>
  <main>
    <section>
      <h1>First section</h1>
    </section>

    <section>
      <h2>Second section</h2>
    </section>
    <section>
      <h3>Third section</h3>
    </section>
  </main>
</template>
<style scoped>
.fixed {
  position: fixed;
  top: 0;
  right: 0;
}
.scroll {
  height: 200vh;
}
.container {
  height: 50vh;
  overflow: scroll;
}
main {
  background-color: transparent;
}
section {
  min-height: 100vh;
  display: grid;
  place-items: center;
  outline: 1px solid red;
}
h1,
h2,
h3 {
  color: #f7f7f7;
}
</style>
