<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import gsap from 'gsap'
import type { TresObject } from '@tresjs/core'

const boxesRef = shallowRef<TresObject>()
const zs = []
for (let z = -4.5; z <= 4.5; z++) {
  zs.push(z)
}

watch(boxesRef, () => {
  if (!boxesRef.value) { return }

  // Getting positions for all the boxes
  const positions = Array.from(boxesRef.value.children).map(
    (child: TresObject) => child.position,
  )
  // Getting rotations for all the boxes
  const rotations = Array.from(boxesRef.value.children).map(
    (child: TresObject) => child.rotation,
  )

  const animProperties = {
    ease: 'power1.inOut',
    duration: 1,
    stagger: {
      each: 0.25,
      repeat: -1,
      yoyo: true,
    },
  }
  gsap.to(positions, {
    y: 2.5,
    ...animProperties,
  })
  gsap.to(rotations, {
    x: 2,
    ...animProperties,
  })
})
</script>

<template>
  <TresPerspectiveCamera :position="[-10, 5, 10]" />
  <OrbitControls />
  <TresGroup ref="boxesRef">
    <TresMesh v-for="(z, i) of zs" :key="i" :position="[0, 0.5, z]">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresGroup>
  <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
</template>
