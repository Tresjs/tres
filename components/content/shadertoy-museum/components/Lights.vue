<script setup lang="ts">
import { Group, Light, Vector2 } from 'three';
import type { State } from '../index.vue';
import { lerp, pingpong } from 'three/src/math/MathUtils.js';

const state = inject('state') as State

const lightsGroup = shallowRef(new Group())

watch(() => state.i, () => {
    const targetInfo = state.shaderToyTargets[state.i] ?? {}

    for (const light of lightsGroup.value.children) {
        (light as Light).removeFromParent()
    }

    if (targetInfo.lights && targetInfo.lights.length > 0) {
        for (const light of targetInfo.lights) {
            lightsGroup.value.add(light)
        }
    }
})

const center = new Vector2(0.5, 0.5)

useLoop().onBeforeRender(
    () => {
        const targetInfo = state.shaderToyTargets[state.i] ?? {}
        const elapsed = state.clock.getElapsedTime()
        if (targetInfo.lights) {
            for (const light of targetInfo.lights) {
                const d = light.userData
                if (d.x) {
                    light.position.x = d.x.init + Math.cos(d.x.speed * elapsed + d.x.phase) * d.x.dist
                }
                if (d.y) {
                    light.position.y = d.y.init + Math.cos(d.y.speed * elapsed + d.y.phase) * d.y.dist
                }
                if (d.z) {
                    light.position.z = d.z.init + Math.cos(d.z.speed * elapsed + d.z.phase) * d.z.dist
                }
                if (d.intensity) {
                    light.intensity = lerp(d.intensity.a, d.intensity.b, pingpong(elapsed * d.intensity.speed))
                }
                targetInfo.lightFn(light as Light, center, elapsed)
            }
        }
    }
)
</script>

<template>
    <TresGroup ref="lightsGroup"></TresGroup>
</template>