<script setup lang="ts">
import type { RectAreaLight } from 'three'
import { Matrix4, Vector3 } from 'three'
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js'

// The blue mist the glTF export left out. Transforms are in the dungeon's local
// space, converted from Blender Z-up with (x, z, -y).

// RectAreaLight is a no-op on WebGLRenderer until its LTC textures exist. Idempotent.
RectAreaLightUniformsLib.init()

const MIST_CENTER = new Vector3(4, 2, -2)

// shallowRef: a plain ref() wraps the light in a proxy that every matrix write pays for.
const sidelight = shallowRef<RectAreaLight | null>(null)
const backlight = shallowRef<RectAreaLight | null>(null)
const fill = shallowRef<RectAreaLight | null>(null)

const aim = new Matrix4()

// lookAt works in world space but the parent matrixWorld is not built yet, so aim in
// local space. Eye-at-light order puts local -Z on the target, the side a RectAreaLight emits from.
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

    <!-- Density keeps Blender's per-box ratios but the scale is by eye: the raymarch
         integrates over 10-20 world units, so small numbers go a long way. -->
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
