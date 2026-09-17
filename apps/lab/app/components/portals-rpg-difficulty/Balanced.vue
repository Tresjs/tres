<script setup lang="ts">
import { Color, FogExp2, MathUtils, Vector3 } from 'three'

const { nodes, state } = useGLTF('/models/portals-rpg/dungeon-battle.glb', { draco: true })

const { scene: portalScene } = useTresContext()
portalScene.value.background = new Color('#000000')
// Blender's world background is pure black with no sky light, so an exponential
// falloff to near-black stands in for it. 0.02..0.04 reads well at room scale.
portalScene.value.fog = new FogExp2('#04080f', 0.03)

function pick(keyword: string) {
  return Object.values(nodes.value).filter(n =>
    n.name.includes(keyword) && !n.parent?.name.includes(keyword),
  )
}

// Leches mutates the Vector3 in place, and the template only tracks the ref
// itself, so read the components through a computed to get a re-render.
const { dungeonPosition, dungeonRotation } = useControls('dungeon', {
  position: { value: new Vector3(-1.4, -2.7, -5.4), step: 0.1 },
  rotation: { value: new Vector3(3, 37, 0), step: 1, min: -180, max: 180, label: 'rotation (deg)' },
}, { uuid: 'portals-rpg-difficulty' })

const groupPosition = computed(() => dungeonPosition.value.toArray() as [number, number, number])
const groupRotation = computed(() => dungeonRotation.value.toArray().map(MathUtils.degToRad) as [number, number, number])

const floors = computed(() => pick('floor'))
const walls = computed(() => pick('wall'))
const barriers = computed(() => pick('barrier'))
</script>

<template>
  <TresAmbientLight :intensity="0.2" />
  <TresGroup v-if="floors.length > 0" :position="groupPosition" :rotation="groupRotation">
    <primitive v-for="wall in walls" :key="wall.name" name="Walls" :object="wall" />
    <primitive v-for="floor in floors" :key="floor.name" name="Floors" :object="floor" />
    <primitive v-for="barrier in barriers" :key="barrier.name" name="Barriers" :object="barrier" />
    <primitive name="Banner" :object="nodes.banner_shield_blue" />
    <primitive name="Stacked boxes" :object="nodes.box_stacked" />
    <!-- Static prop floating beside Rig_Mage, not part of the rig. -->

    <PortalsRpgDifficultyZynrae :nodes="nodes" :state="state" />
    <PortalsRpgDifficultyFenrath :nodes="nodes" :state="state" />
    <PortalsRpgDifficultyMage :nodes="nodes" :state="state" />
    <PortalsRpgDifficultyNecromancer :nodes="nodes" :state="state" />
    <PortalsRpgDifficultySkeletonMage :nodes="nodes" :state="state" />
    <PortalsRpgDifficultyPaladin :nodes="nodes" :state="state" />
    <PortalsRpgDifficultySkeletonMinion :nodes="nodes" :state="state" />
    <PortalsRpgDifficultySkeletonWarrior :nodes="nodes" :state="state" />
    <PortalsRpgDifficultyDungeonMist />
    
  </TresGroup>
</template>
