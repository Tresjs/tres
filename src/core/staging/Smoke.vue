<script setup lang="ts">
import { shallowRef, computed, toRefs } from 'vue'
import type { TresColor } from '@tresjs/core'
import { useTexture, useRenderLoop, useTresContext } from '@tresjs/core'
import type { Object3D, Texture } from 'three'

export interface SmokeProps {
  /**
   * The color of the smoke.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof SmokeProps
   * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
   */
  color?: TresColor
  /**
   * The strength of the opacity.
   * @default 0.5
   * @type {number}
   * @memberof SmokeProps
   * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
   */
  opacity?: number
  /**
   * The rotation speed of the smoke.
   * @default 0.4
   * @type {number}
   * @memberof SmokeProps
   * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
   */
  speed?: number
  /**
   * The base width.
   * @default 4
   * @type {number}
   * @memberof SmokeProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  width?: number
  /**
   * The base depth.
   * @default 10
   * @type {number}
   * @memberof SmokeProps
   * @see https://threejs.org/docs/#api/en/geometries/PlaneGeometry
   */
  depth?: number
  /**
   * The number of smoke to render.
   * @default 10
   * @type {number}
   * @memberof SmokeProps
   * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
   */
  segments?: number
  /**
   * The texture of the smoke.
   * @default 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/clouds/defaultCloud.png'
   * @type {string}
   * @memberof SmokeProps
   * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
   */
  texture?: string
  /**
   * The depthTest.
   * @default true
   * @type {boolean}
   * @memberof SmokeProps
   * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
   */
  depthTest?: boolean
}

const props = withDefaults(defineProps<SmokeProps>(), {
  opacity: 0.5,
  speed: 0.4,
  width: 10,
  depth: 1.5,
  segments: 20,
  texture: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/clouds/defaultCloud.png',
  color: '#ffffff',
  depthTest: true,
})

const { width, depth, segments, texture, color, depthTest, opacity, speed } = toRefs(props)

const smokeRef = shallowRef()
const groupRef = shallowRef()

defineExpose({
  value: smokeRef,
})

const smoke = [...new Array(segments)].map((_, index) => ({
  x: width.value / 2 - Math.random() * width.value,
  y: width.value / 2 - Math.random() * width.value,
  scale: 0.4 + Math.sin(((index + 1) / segments.value) * Math.PI) * ((0.2 + Math.random()) * 10),
  density: Math.max(0.2, Math.random()),
  rotation: Math.max(0.002, 0.005 * Math.random()) * speed.value,
}))

const calculateOpacity = (scale: number, density: number): number => (scale / 6) * density * opacity.value

const { map } = (await useTexture({ map: texture.value })) as { map: Texture }

const { renderer, camera } = useTresContext()
const colorSpace = computed(() => renderer.value?.outputColorSpace)

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (smokeRef.value && camera.value && groupRef.value) {
    groupRef.value?.children.forEach((child: Object3D, index: number) => {
      child.rotation.z += smoke[index].rotation
    })
    smokeRef.value.lookAt(camera.value?.position)
  }
})
</script>

<template>
  <TresGroup
    ref="smokeRef"
    v-bind="$attrs"
  >
    <TresGroup
      ref="groupRef"
      :position="[0, 0, (segments / 2) * depth]"
    >
      <TresMesh
        v-for="({ scale, x, y, density }, index) in smoke"
        :key="`${index}`"
        :position="[x, y, -index * depth]"
      >
        <TresPlaneGeometry
          :scale="[scale, scale, scale]"
          :rotation="[0, 0, 0]"
        />
        <TresMeshStandardMaterial
          :map="map"
          :depth-test="depthTest"
          :color-space="colorSpace"
          :color="color"
          :depth-write="false"
          transparent
          :opacity="calculateOpacity(scale, density)"
        />
      </TresMesh>
    </TresGroup>
  </TresGroup>
</template>
