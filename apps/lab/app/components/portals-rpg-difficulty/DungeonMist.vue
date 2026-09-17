<script setup lang="ts">
import type { RectAreaLight } from 'three'
import { Matrix4, Vector3 } from 'three'
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js'

// The blue mist from the COL_Blue_Mist collection that the glTF export left
// out: 3 area lights + 4 noise-driven fog volumes, with the values read from
// the Blender scene. Mount it inside the same group as dungeon-battle.glb, the
// transforms below are in the dungeon's local space (Blender Z-up already
// converted to Y-up: x = x, y = z, z = -y).

// RectAreaLight is a no-op on WebGLRenderer until its LTC lookup textures exist.
// Module scope, so it runs once per page load and not once per portal.
RectAreaLightUniformsLib.init()

// Where every light aims, in the dungeon group's local space.
const MIST_CENTER = new Vector3(4, 2, -2)

// shallowRef: a plain ref() hands back a reactive proxy and every matrix write
// would go through it.
const sidelight = shallowRef<RectAreaLight | null>(null)
const backlight = shallowRef<RectAreaLight | null>(null)
const fill = shallowRef<RectAreaLight | null>(null)

const aim = new Matrix4()

// Object3D.lookAt works in world space and the parent group's matrixWorld is
// not built yet when these refs land, so it would aim off by the group offset.
// The group only translates, so aiming in local space is exact. Eye-at-light
// order puts local -Z on the target, which is the side a RectAreaLight emits from.
function aimAtMist(light: RectAreaLight) {
  aim.lookAt(light.position, MIST_CENTER, light.up)
  light.quaternion.setFromRotationMatrix(aim)
}

watch([sidelight, backlight, fill], (lights) => {
  for (const light of lights) {
    if (light) { aimAtMist(light) }
  }
})
</script>

<template>
  <TresGroup name="DungeonMist">
    <!-- LGT_Mist_Blue_Sidelight, LGT_Mist_Cyan_Backlight, LGT_Mist_Soft_Front_Fill.
         A RectAreaLight is the closest real match to a Blender disk Area light. -->
    <TresRectAreaLight
      ref="sidelight"
      :color="[0.06, 0.32, 1]"
      :intensity="3"
      :width="4"
      :height="4"
      :position="[-2, 2.7, -2]"
    />
    <TresRectAreaLight
      ref="backlight"
      :color="[0.08, 0.65, 1]"
      :intensity="4"
      :width="5"
      :height="5"
      :position="[6, 3.4, -6.7]"
    />
    <TresRectAreaLight
      ref="fill"
      :color="[0.58, 0.77, 1]"
      :intensity="5"
      :width="6"
      :height="6"
      :position="[-3, 6, 5]"
    />

    <!-- The four VOL_Blue_Mist_* boxes. Seed is each box's Noise Texture "W";
         density keeps the ratio of Blender's per-box multipliers
         (0.075 / 0.2 / 0.13 / 0.045) but the scale is by eye: the raymarch
         integrates it over 10-20 world units, so small numbers go a long way. -->
    <PortalsRpgDifficultyFogVolume
      :position="[5, 2.7, -3.5]"
      :scale="[15, 6.8, 8]"
      :seed="5.8"
      :density="0.09"
      :render-order="1"
    />
    <PortalsRpgDifficultyFogVolume
      :position="[4, 0.55, 0]"
      :scale="[22, 3, 18]"
      :seed="1.7"
      :density="0.22"
      :render-order="2"
    />
    <PortalsRpgDifficultyFogVolume
      :position="[-0.3, 1.7, -1]"
      :scale="[5, 4.5, 13]"
      :seed="9.2"
      :density="0.15"
      :render-order="3"
    />
    <PortalsRpgDifficultyFogVolume
      :position="[6, 5.5, -7.5]"
      :scale="[13, 3.5, 6]"
      :seed="14.1"
      :density="0.05"
      :render-order="4"
    />
  </TresGroup>
</template>
