<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'

import { useLoop, useTresContext } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import type { Mesh } from 'three'

const { onRender } = useLoop()
const { renderer, scene, camera } = useTresContext()

const { shouldRender } = useControls({
  shouldRender: true,
})

renderer.replaceRenderFunction((notifySuccess) => {
  if (shouldRender.value && camera.activeCamera.value) {
    renderer.instance.render(scene.value, camera.activeCamera.value)
    notifySuccess()
  }
})

const boxRef = ref<Mesh>()

onRender(() => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01
  }
})
</script>

<template>
  <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
  <OrbitControls make-default />
  <TresMesh
    ref="boxRef"
    :position="[0, 0, 0]"
    cast-shadow
  >
    <TresBoxGeometry />
    <TresMeshNormalMaterial />
  </TresMesh>
  <TresAmbientLight :intensity="1" />
</template>
