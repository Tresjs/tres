<script setup lang="ts">
import { Group, Vector2, type Light } from 'three';
import type { ShaderToyMuseumState } from './const';
import { MathUtils } from 'three';
const { lerp, pingpong } = MathUtils

const state: ShaderToyMuseumState = inject('state')!

const shaderToyTarget = computed(() => state.shaderToyTargets[state.i])

const lightsGroup = shallowRef(new Group())


watch(shaderToyTarget, (target) => {
  if(target && target.lights) {
    for (const light of lightsGroup.value.children) {
        (light as Light).removeFromParent()
    }

    if (target.lights && target.lights.length > 0) {
        for (const light of target.lights) {
            lightsGroup.value.add(light)
        }
    }
  }
}, { immediate: true })

const { onBeforeRender } = useLoop()

const center = new Vector2(0.5, 0.5)

onBeforeRender(({ elapsed }) => {
  if(shaderToyTarget.value && shaderToyTarget.value.lights ) {
    for (const light of shaderToyTarget.value.lights) {
      if (light.userData.x) {
        light.position.x = light.userData.x.init + Math.cos(light.userData.x.speed * elapsed + light.userData.x.phase) * light.userData.x.dist
      }
      if (light.userData.y) {
        light.position.y = light.userData.y.init + Math.cos(light.userData.y.speed * elapsed + light.userData.y.phase) * light.userData.y.dist
      }
      if (light.userData.z) {
        light.position.z = light.userData.z.init + Math.cos(light.userData.z.speed * elapsed + light.userData.z.phase) * light.userData.z.dist
      }
      if (light.userData.intensity) {
        light.intensity = lerp(light.userData.intensity.a, light.userData.intensity.b, pingpong(elapsed * light.userData.intensity.speed))
      }
      if (shaderToyTarget.value.lightFn) {
        shaderToyTarget.value.lightFn(light as Light, center, elapsed)
      }
    }
  }
})
</script>
<template>
  <TresGroup ref="lightsGroup"/>
</template>