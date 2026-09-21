<script setup lang="ts">
import type { Mesh } from 'three'
import { Color, FogExp2, MathUtils, Vector3 } from 'three'

const { nodes, state } = useGLTF('/models/portals-rpg/avernus.glb', { draco: true })

const { scene: portalScene } = useTresContext()

// Everything static in avernus.glb is exported flat at the root with a GEO_
// prefix (basalt banks, cavern walls, rubble, obsidian, lava, pentagram,
// candle flames). The two rigs and the DemonHeart are the only exceptions.
const terrain = computed<Mesh[]>(() => Object.values(nodes.value).filter(n => n.name.startsWith('GEO_')))

// Leches mutates the Vector3 in place, and the template only tracks the ref
// itself, so read the components through a computed to get a re-render.
const {
  avernusPosition,
  avernusRotation,
  avernusSkyColor,
  avernusFogColor,
  avernusFogDensity,
} = useControls('avernus', {
  // Tuned by eye in the Leches panel: the yaw turns the island so the Knight
  // stands between the camera and the Demon Lord, the pitch tips the summoning
  // circle up so it reads through the frame.
  position: { value: new Vector3(0.5, -2.7, -10.6), step: 0.1 },
  rotation: { value: new Vector3(12, -24, 0), step: 1, min: -180, max: 180, label: 'rotation (deg)' },
  // A light orange sky reads as a hellscape lit from above by fire. The fog
  // defaults to the same color so distant geometry fades into the sky instead
  // of leaving a dark halo against it. Same falloff band as Balanced.vue.
  skyColor: { value: '#ff0a0a', type: 'color', label: 'sky color' },
  fogColor: { value: '#f46434', type: 'color', label: 'fog color' },
  fogDensity: { value: 0.03, min: 0, max: 0.2, step: 0.005, label: 'fog density' },
}, { uuid: 'portals-rpg-difficulty' })

const fog = new FogExp2(avernusFogColor.value, avernusFogDensity.value)
portalScene.value.background = new Color(avernusSkyColor.value)
portalScene.value.fog = fog

// Mutate the existing Color and fog in place instead of replacing them: the
// portal scene is not reactive and a new object per tick would be wasted work.
watch(avernusSkyColor, (value) => {
  (portalScene.value.background as Color).set(value)
})
watch(avernusFogColor, value => fog.color.set(value))
watch(avernusFogDensity, (value) => {
  fog.density = value
})

const groupPosition = computed(() => avernusPosition.value.toArray() as [number, number, number])
const groupRotation = computed(() => avernusRotation.value.toArray().map(MathUtils.degToRad) as [number, number, number])
</script>

<template>
  <TresGroup v-if="nodes.GEO_Volcanic_Island" :position="groupPosition" :rotation="groupRotation">
    <primitive v-for="node in terrain" :key="node.name" :name="node.name" :object="node" />
    <PortalsRpgDifficultyDemonHeart :heart="nodes.DemonHeart" />

    <!-- Swap the flattened glTF materials for the Blender node trees: the lava
         and the ritual energy are procedural GLSL, the light rig is the 13
         captured lights. They live inside the group so they ride its transform. -->
    <PortalsRpgDifficultyAvernusLava :nodes="nodes" />
    <PortalsRpgDifficultyAvernusEnergy :nodes="nodes" />
    <PortalsRpgDifficultyAvernusLights />

    <PortalsRpgDifficultyDemonLord :nodes="nodes" :state="state" />
    <PortalsRpgDifficultyKnight :nodes="nodes" :state="state" />
    <!-- After the rigs so its loop callback runs after their mixers and the
         beam tracks the chest without a one-frame lag. -->
    <PortalsRpgDifficultyAvernusBeam :nodes="nodes" />
  </TresGroup>
</template>
