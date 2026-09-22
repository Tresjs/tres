<script setup lang="ts">
import type { Mesh } from 'three'
import { Color, FogExp2, MathUtils, Vector3 } from 'three'

const { nodes, state } = useGLTF('/models/portals-rpg/avernus.glb', { draco: true })

const { scene: portalScene } = useTresContext()

// Static geometry in avernus.glb sits flat at the root with a GEO_ prefix; only the rigs and DemonHeart differ.
const terrain = computed<Mesh[]>(() => Object.values(nodes.value).filter(n => n.name.startsWith('GEO_')))

// Leches mutates the Vector3 in place, so read components through a computed to re-render.
const {
  avernusPosition,
  avernusRotation,
  avernusSkyColor,
  avernusFogColor,
  avernusFogDensity,
} = useControls('avernus', {
  position: { value: new Vector3(0.5, -2.7, -10.6), step: 0.1 },
  rotation: { value: new Vector3(12, -24, 0), step: 1, min: -180, max: 180, label: 'rotation (deg)' },
  // Fog defaults to the sky color so distant geometry fades into it instead of leaving a dark halo.
  skyColor: { value: '#ff0a0a', type: 'color', label: 'sky color' },
  fogColor: { value: '#f46434', type: 'color', label: 'fog color' },
  fogDensity: { value: 0.03, min: 0, max: 0.2, step: 0.005, label: 'fog density' },
}, { uuid: 'portals-rpg-difficulty' })

const fog = new FogExp2(avernusFogColor.value, avernusFogDensity.value)
portalScene.value.background = new Color(avernusSkyColor.value)
portalScene.value.fog = fog

// Mutate in place: the portal scene is not reactive, so a new object per tick is wasted work.
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

    <PortalsRpgDifficultyAvernusLava :nodes="nodes" />
    <PortalsRpgDifficultyAvernusEnergy :nodes="nodes" />
    <PortalsRpgDifficultyAvernusLights />

    <PortalsRpgDifficultyDemonLord :nodes="nodes" :state="state" />
    <PortalsRpgDifficultyKnight :nodes="nodes" :state="state" />
    <!-- After the rigs, so its loop callback runs after their mixers and the beam does not lag a frame. -->
    <PortalsRpgDifficultyAvernusBeam :nodes="nodes" />
  </TresGroup>
</template>
