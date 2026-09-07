<script setup lang="ts">
import vertexShader from './shaders/fire-vertex.glsl?raw'
import fragmentShader from './shaders/fire-fragment.glsl?raw'
import { Color, DoubleSide, Uniform, Vector2 } from 'three';

const props = defineProps<{
    nodes: Record<string, any>
}>()

const fireplace = computed(() => props.nodes['Fireplace'])
const fire = computed(() => props.nodes['Fire'])

const uniforms = {
    uCoreOffset: new Uniform(0.8),
    uCoreScale: new Uniform(0.54),
    uCoreMidPos: new Uniform(0.327),
    uCoreStrength: new Uniform(1.4),
    uCoreLow: new Uniform(new Color('#ff4d00')),
    uCoreMid: new Uniform(new Color('#ff9d2e')),
    uCoreHigh: new Uniform(new Color('#ffe6a8')),

    uRimStops: new Uniform(new Vector2(0.0, 0.523)),
    uRimOffset: new Uniform(1.0),
    uRimScale: new Uniform(1.0),
    uRimStrength: new Uniform(1.0),
    uRimLow: new Uniform(new Color('#ff6a1a')),
    uRimHigh: new Uniform(new Color('#d81400')),

    uHeightMin: new Uniform(0),
    uHeightRange: new Uniform(1),
}

// immediate: nodes are already loaded when this component mounts, because Easy.vue
// gates the whole group on nodes.Ground, so a plain watch would never fire.
watch(fire, () => {
    if (fire.value?.geometry) {
        fire.value.geometry.computeBoundingBox()
        const bounds = fire.value.geometry.boundingBox!
        uniforms.uHeightMin.value = bounds.min.y
        uniforms.uHeightRange.value = bounds.max.y - bounds.min.y
    }
}, { immediate: true })
</script>

<template>
    <TresGroup name="Fireplace">
        <primitive name="Fireplace" :object="fireplace" />
        <primitive name="Fire" :object="fire">
            <TresShaderMaterial :vertex-shader="vertexShader" :fragment-shader="fragmentShader" :uniforms="uniforms"
                :side="DoubleSide" />
        </primitive>
    </TresGroup>
</template>