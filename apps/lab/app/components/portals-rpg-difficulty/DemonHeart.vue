<script setup lang="ts">
import type { Mesh } from 'three'
import { gsap } from 'gsap'

// The DemonHeart is a root-level mesh in avernus.glb with no animation tracks
// (the mixers only drive the two rigs), so its scale is free to animate. The
// beat is a real one: a strong contraction, a weaker second one, then a long
// rest, rather than a sine breathing. The beam aims at the heart's bounding
// sphere centre, which sits on the mesh origin, so it is unaffected.

const props = defineProps<{
  heart: Mesh
}>()

const UUID = 'portals-rpg-difficulty'

// useGLTF caches the scene between portal mounts, so read the base scale once
// and restore it on unmount, or every remount would start from a mid-beat size.
const base = props.heart.scale.x

const { heartBpm, heartStrength } = useControls('heart', {
  bpm: { value: 132, min: 30, max: 180, step: 1 },
  strength: { value: 0.26, min: 0, max: 0.5, step: 0.01 },
}, { uuid: UUID })

let ctx: gsap.Context | undefined

function build() {
  ctx?.revert()
  ctx = gsap.context(() => {
    const beat = 60 / heartBpm.value
    const scale = props.heart.scale
    const at = (k: number) => ({ x: base * (1 + k), y: base * (1 + k), z: base * (1 + k) })
    // Fractions of one beat. The two contractions take about two thirds of
    // it, the rest fills the remainder so the tempo matches the bpm.
    gsap.timeline({ repeat: -1 })
      .to(scale, { ...at(heartStrength.value), duration: beat * 0.12, ease: 'power2.out' })
      .to(scale, { ...at(0), duration: beat * 0.18, ease: 'power2.in' })
      .to(scale, { ...at(heartStrength.value * 0.6), duration: beat * 0.1, ease: 'power2.out' })
      .to(scale, { ...at(0), duration: beat * 0.25, ease: 'sine.inOut' })
      .to({}, { duration: beat * 0.35 })
  })
}

watch([heartBpm, heartStrength], build, { immediate: true })

onUnmounted(() => ctx?.revert())
</script>

<template>
  <primitive name="Demon heart" :object="heart" />
</template>
