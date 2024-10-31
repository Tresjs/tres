<script setup lang="ts">
import { PerspectiveCamera } from 'three';
import type { State } from '../index.vue';

const state = inject('state') as State
const cam = shallowRef()

watch(() => state.i, () => {
    const targetInfo = state.shaderToyTargets[state.i] ?? {}

    if (targetInfo.cameras && targetInfo.cameras.length > 0) {
        const otherCam = targetInfo.cameras[0] as PerspectiveCamera
        otherCam.getWorldPosition(cam.value.position)
        otherCam.getWorldQuaternion(cam.value.rotation)
        cam.value.setFocalLength(otherCam.getFocalLength())
    }
})
</script>

<template>
    <Levioso :rotation-factor="0">
        <TresPerspectiveCamera ref="cam" :position="[0, 5, 0]" :fov="60" :near="0.1" :far="1000" />
    </Levioso>
</template>