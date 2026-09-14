<script setup lang="ts">
import vertexShader from './shaders/fire-vertex.glsl?raw'
import fragmentShader from './shaders/fire-fragment.glsl?raw'
import type { Box3, PointLight } from 'three';
import { Color, DoubleSide, Uniform, Vector2, Vector3 } from 'three';
import { marble } from './marble'

const props = defineProps<{
    nodes: Record<string, any>
}>()

const fireplace = computed(() => props.nodes['Fireplace'])
const fire = computed(() => props.nodes['Fire'])

// Stand-in for the "Fire Animator" empty in Blender. The Displace texture is read
// in this point's object space, so moving it up scrolls the marble veins up
// through the mesh. The sway keeps it off a pure vertical slide.
const animator = new Vector3()
const RISE_SPEED = 0.7
const SWAY = 0.08

// Heights up the flame axis where the light samples the marble field. A single
// sample swings the full 0..1 but at up to 7 units/s, which strobes; averaging
// four spreads them over half a vein cycle and lands on ~0.17..0.98 at 2.3/s,
// which reads as the flame swelling rather than one vein crossing.
const LIGHT_SAMPLES = [0.3, 0.55, 0.78, 0.95]
const LIGHT_SWELL_MID = 0.53
const LIGHT_SWING = 6

// Read by the fire light and by Sparks.vue, so a flare reaches both on the same
// frame. A Uniform rather than a ref: the sparks material consumes it directly and
// a per-frame reactive write would re-render the component tree for nothing.
const swell = new Uniform(0)

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

    uMaskFloor: new Uniform(1.0),
    uPowerA: new Uniform(2.0),
    uPowerB: new Uniform(4.0),
    uRampA: new Uniform(new Vector2(0.0, 1.0)),
    uRampB: new Uniform(new Vector2(0.082, 1.0)),

    uAnimator: new Uniform(animator),
    uMarbleSize: new Uniform(0.4),
    uMarbleTurbulence: new Uniform(5.0),
    uMarbleVeins: new Uniform(5.0),
    uDisplaceStrength: new Uniform(0.12),
    uDisplaceMid: new Uniform(0.5),
    uBaseMask: new Uniform(0.18),

    uTime: new Uniform(0),
    uFlicker: new Uniform(0.06),
}

// shallowRef: a plain ref() hands back a reactive proxy of the light, and every
// matrix write then pays for the proxy.
const fireLight = shallowRef<PointLight | null>(null)
const flameCenter = new Vector3()
const flameBounds = shallowRef<Box3 | null>(null)
// The notes rise out of the flame tip, not off the bard's lute, so the whole camp
// reads as singing along rather than one player.
const notesOrigin = computed(() => flameBounds.value
    ? [flameCenter.x, flameBounds.value.max.y, flameCenter.z]
    : [0, 0, 0])
const lightRest = { intensity: 1, position: new Vector3() }

// The template props stay the rest pose the flicker swings around.
watch(fireLight, (light) => {
    if (!light) { return }
    lightRest.intensity = light.intensity
    lightRest.position.copy(light.position)
})

// immediate: nodes are already loaded when this component mounts, because Easy.vue
// gates the whole group on nodes.Ground, so a plain watch would never fire.
watch(fire, () => {
    if (fire.value?.geometry) {
        fire.value.geometry.computeBoundingBox()
        const bounds = fire.value.geometry.boundingBox!
        uniforms.uHeightMin.value = bounds.min.y
        uniforms.uHeightRange.value = bounds.max.y - bounds.min.y
        bounds.getCenter(flameCenter)
        flameBounds.value = bounds 
    }
}, { immediate: true })

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
    animator.y = elapsed * RISE_SPEED
    animator.x = Math.sin(elapsed * 2.6) * SWAY
    animator.z = Math.cos(elapsed * 1.8) * SWAY
    uniforms.uTime.value = elapsed

    // Same field, same offset as the vertex shader, so the light and the sparks peak
    // on the frame the flame swells instead of drifting against it.
    let sum = 0
    for (const t of LIGHT_SAMPLES) {
        sum += marble(
            flameCenter.x - animator.x,
            uniforms.uHeightMin.value + t * uniforms.uHeightRange.value - animator.y,
            flameCenter.z - animator.z,
            uniforms.uMarbleVeins.value,
            uniforms.uMarbleSize.value,
            uniforms.uMarbleTurbulence.value,
        )
    }
    swell.value = sum / LIGHT_SAMPLES.length

    if (!fireLight.value) { return }

    fireLight.value.intensity = lightRest.intensity + (swell.value - LIGHT_SWELL_MID) * LIGHT_SWING
    fireLight.value.position.set(
        lightRest.position.x + animator.x,
        lightRest.position.y,
        lightRest.position.z + animator.z,
    )
})
</script>

<template>
    <TresGroup name="Fireplace">
        <TresPointLight ref="fireLight" :position="[0, 0, 0]" :intensity="10" :color="'#ff9d2e'" />
        <primitive name="Fireplace" :object="fireplace" />
        <primitive name="Fire" :object="fire">
            <TresShaderMaterial :vertex-shader="vertexShader" :fragment-shader="fragmentShader" :uniforms="uniforms"
                :side="DoubleSide" />
            <!-- Parented to the flame mesh, so the sparks inherit its transform from the
            GLTF instead of repeating its placement here. -->
            <PortalsRpgDifficultySparks v-if="flameBounds" :bounds="flameBounds" :animator="animator"
                :swell="swell" :sway-amplitude="SWAY" />
        </primitive>
        <PortalsRpgDifficultyNotes v-if="flameBounds" :position="notesOrigin" />
    </TresGroup>
</template>