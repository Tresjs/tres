<script setup lang="ts">
import { useTexture } from '@tresjs/core'
import MeshReflectionMaterial from '../meshReflectionMaterial/index.vue'
import { Euler, Mesh, Vector3 } from 'three';
import type { State } from '../index.vue';

const normalMapSrc = '/textures/shadertoy-museum/normal.jpg'
const normalMap = await useTexture([normalMapSrc])

const roughnessMapSrc = '/textures/shadertoy-museum/roughness.jpg'
const roughnessMap = await useTexture([roughnessMapSrc])

const displacementMapSrc = '/textures/shadertoy-museum/displacement.png'
const displacementMap = await useTexture([displacementMapSrc])

const state = inject('state') as State
const position = shallowRef(new Vector3())
const rotation = shallowRef(new Euler())
const scale = shallowRef(new Vector3())

watch(() => state.i, () => {
    const targetInfo = state.shaderToyTargets[state.i] ?? {}

    if (targetInfo.floor) {
        position.value = targetInfo.floor.position
        rotation.value = targetInfo.floor.rotation
        scale.value = targetInfo.floor.scale
    }
})
</script>

<template>
    <TresMesh :position="position" :scale="scale" :rotation="rotation">
        <TresPlaneGeometry />
        <MeshReflectionMaterial :mix="0.5" :normal-map="normalMap" :roughness-map="roughnessMap"
            :displacement-map="displacementMap" />
    </TresMesh>
</template>