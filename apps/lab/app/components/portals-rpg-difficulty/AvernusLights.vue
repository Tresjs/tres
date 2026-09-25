<script setup lang="ts">
import type { Ref } from 'vue'
import { AmbientLight, Color, HemisphereLight, LinearSRGBColorSpace, Matrix4, PointLight, RectAreaLight, Vector3 } from 'three'
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js'

// Positions are the Blender rig converted from Z-up with (x, z, -y). Watts are kept
// as data and scaled once: Blender radiant watts and Three lumens only share ratios.

// RectAreaLight is a no-op on WebGLRenderer until its LTC textures exist. Idempotent.
RectAreaLightUniformsLib.init()

const UUID = 'portals-rpg-difficulty'

type Role = 'candle' | 'key' | 'fill' | 'rim' | 'wash'

interface PointSource {
  name: string
  watts: number
  rgb: [number, number, number]
  position: [number, number, number]
  role: Role
}

interface DiskSource extends PointSource {
  diameter: number
  direction: [number, number, number]
}

const CANDLE_RGB: [number, number, number] = [1, 0.45, 0.12]

const POINT_SOURCES: PointSource[] = [
  { name: 'LGT_Candle_Glow_01', watts: 5, rgb: CANDLE_RGB, position: [0.147432, 0.878714, -3.09903], role: 'candle' },
  { name: 'LGT_Candle_Glow_02', watts: 5, rgb: CANDLE_RGB, position: [-1.796603, 0.759967, 2.501622], role: 'candle' },
  { name: 'LGT_Candle_Glow_03', watts: 5, rgb: CANDLE_RGB, position: [-3.035675, 0.883079, -1.014837], role: 'candle' },
  { name: 'LGT_Candle_Glow_04', watts: 5, rgb: CANDLE_RGB, position: [2.987487, 0.693267, -0.997998], role: 'candle' },
  { name: 'LGT_Candle_Glow_05', watts: 5, rgb: CANDLE_RGB, position: [1.781932, 0.761622, 2.548063], role: 'candle' },
  { name: 'LGT_Candle_Glow_06', watts: 5, rgb: CANDLE_RGB, position: [1.913052, 0.893835, 2.400672], role: 'candle' },
  { name: 'LGT_Candle_Glow_07', watts: 5, rgb: CANDLE_RGB, position: [1.973535, 0.703057, 2.525791], role: 'candle' },
  { name: 'LGT_Candle_Glow_08', watts: 5, rgb: CANDLE_RGB, position: [-0.134384, 0.753536, -3.131217], role: 'candle' },
  { name: 'LGT_Original_RedFill', watts: 100, rgb: [1, 0.12761, 0.12761], position: [4.076245, 5.903862, -1.005454], role: 'fill' },
]

// A square with side d*sqrt(pi)/2 keeps the emitting area of Blender's disk lights.
const DISK_SOURCES: DiskSource[] = [
  { name: 'LGT_Cavern_Ambience', watts: 450, rgb: [1, 0.56, 0.28], position: [-4.0248, 9, -1.3416], diameter: 7, direction: [0, -0.666678, -0.745346], role: 'wash' },
  { name: 'LGT_Lava_Rim', watts: 1400, rgb: [1, 0.28, 0.055], position: [-2.236, 5, -4.472], diameter: 5, direction: [0.383479, -0.514507, 0.766959], role: 'rim' },
  { name: 'LGT_Soft_Fill', watts: 480, rgb: [0.7, 0.79, 1], position: [5.8136, 5, 0.4472], diameter: 5, direction: [-0.916375, -0.394065, -0.07049], role: 'fill' },
  { name: 'LGT_Warm_Key', watts: 1150, rgb: [1, 0.76, 0.53], position: [-1.3416, 8, 6.2608], diameter: 6, direction: [0.152892, -0.683774, -0.713496], role: 'key' },
]

const WORLD_RGB: [number, number, number] = [0.13 * 0.22, 0.105 * 0.22, 0.085 * 0.22]

const linear = (rgb: [number, number, number]) => new Color().setRGB(rgb[0], rgb[1], rgb[2], LinearSRGBColorSpace)

// Eight candle glows are per-fragment cost across the whole cavern for a few faint dots.
// Phones keep the red fill only. Read once: the light list is built at setup, not reactive.
const isPhone = useIsPhone()
const pointSources = isPhone.value ? POINT_SOURCES.filter(s => s.role !== 'candle') : POINT_SOURCES

const pointLights = pointSources.map((source) => {
  const light = new PointLight(linear(source.rgb), 1, 0, 2)
  light.name = source.name
  light.position.set(...source.position)
  return light
})

const aim = new Matrix4()
const target = new Vector3()

const rectLights = DISK_SOURCES.map((source) => {
  const side = source.diameter * Math.sqrt(Math.PI) / 2
  const light = new RectAreaLight(linear(source.rgb), 1, side, side)
  light.name = source.name
  light.position.set(...source.position)
  // lookAt works in world space but the parent matrixWorld is not built yet, so aim in
  // local space. Eye-at-light order puts local -Z on the target, the side a RectAreaLight emits from.
  target.set(...source.direction).add(light.position)
  aim.lookAt(light.position, target, light.up)
  light.quaternion.setFromRotationMatrix(aim)
  return light
})

const ambient = new AmbientLight(linear(WORLD_RGB), 1)
ambient.name = 'WORLD_Avernus_Cavern'

// Not in the source rig: stand-ins for the Cycles bounce of lava and candle emission.
const spillBounce = new HemisphereLight(new Color('#1a0408'), new Color('#ff4a12'), 1)
spillBounce.name = 'SPILL_Lava_Bounce'
const spillHotspot = new PointLight(new Color('#ff4a12'), 1, 16, 2)
spillHotspot.name = 'SPILL_Lava_Hotspot'
spillHotspot.position.set(0, 0.6, 0)
const SPILL_BOUNCE_INTENSITY = 0.9
const SPILL_HOTSPOT_INTENSITY = 12

const {
  lightsPowerScale,
  lightsKey,
  lightsFill,
  lightsRim,
  lightsWash,
  lightsCandles,
  lightsAmbient,
  lightsSpill,
} = useControls('lights', {
  powerScale: { value: 0.12, min: 0, max: 2, step: 0.01, label: 'power scale' },
  key: { value: 1, min: 0, max: 4, step: 0.05 },
  fill: { value: 1, min: 0, max: 4, step: 0.05 },
  rim: { value: 1, min: 0, max: 4, step: 0.05 },
  wash: { value: 1, min: 0, max: 4, step: 0.05 },
  candles: { value: 1, min: 0, max: 4, step: 0.05 },
  ambient: { value: 1, min: 0, max: 20, step: 0.1 },
  spill: { value: 0.35, min: 0, max: 2, step: 0.05 },
}, { uuid: UUID })

const roleGain: Record<Role, Ref<number>> = {
  key: lightsKey,
  fill: lightsFill,
  rim: lightsRim,
  wash: lightsWash,
  candle: lightsCandles,
}

watchEffect(() => {
  const scale = lightsPowerScale.value
  pointSources.forEach((source, i) => {
    pointLights[i].power = source.watts * scale * roleGain[source.role].value
  })
  DISK_SOURCES.forEach((source, i) => {
    rectLights[i].power = source.watts * scale * roleGain[source.role].value
  })
  ambient.intensity = lightsAmbient.value
  spillBounce.intensity = SPILL_BOUNCE_INTENSITY * lightsSpill.value
  spillHotspot.intensity = SPILL_HOTSPOT_INTENSITY * lightsSpill.value
})

onUnmounted(() => {
  for (const light of [...pointLights, ...rectLights, ambient, spillBounce, spillHotspot]) { light.dispose() }
})
</script>

<template>
  <TresGroup name="AvernusLights">
    <primitive v-for="light in pointLights" :key="light.name" :object="light" />
    <primitive v-for="light in rectLights" :key="light.name" :object="light" />
    <primitive :object="ambient" />
    <primitive :object="spillBounce" />
    <primitive :object="spillHotspot" />
  </TresGroup>
</template>
