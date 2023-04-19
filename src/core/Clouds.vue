<script setup lang="ts">
import { shallowRef, computed } from 'vue'
import { TresColor, TresObject, useTexture, useRenderLoop } from '@tresjs/core'
import { useCientos } from './useCientos'
import { Object3D } from 'three'

// chage values here
export interface CloudsProps extends TresObject {
  /**
   * The color of the opacity.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof CloudsProps
   * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
   */
  color?: TresColor
  /**
   * The color of the opacity.
   * @default 0.5
   * @type {number}
   * @memberof CloudsProps
   * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
   */
  opacity?: number
  /**
   * The color of the opacity.
   * @default 0.4
   * @type {number}
   * @memberof CloudsProps
   * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
   */
  speed?: number
  /**
   * The color of the opacity.
   * @default 4
   * @type {number}
   * @memberof CloudsProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  width?: number
  /**
   * The color of the opacity.
   * @default 10
   * @type {number}
   * @memberof CloudsProps
   * @see https://threejs.org/docs/#api/en/geometries/PlaneGeometry
   */
  depth?: number
  /**
   * The color of the opacity.
   * @default 10
   * @type {number}
   * @memberof CloudsProps
   * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
   */
  segments?: number
  /**
   * The color of the opacity.
   * @default 10
   * @type {number}
   * @memberof CloudsProps
   * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
   */
  texture?: number
  /**
   * The color of the opacity.
   * @default 10
   * @type {boolean}
   * @memberof CloudsProps
   * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
   */
  depthTest?: boolean
}

const props = withDefaults(defineProps<CloudsProps>(), {
  opacity: 0.5,
  speed: 0.4,
  width: 10,
  depth: 1.5,
  segments: 20,
  texture: 'https://assets.codepen.io/4698468/pngwing.png',
  color: '#ffffff',
  depthTest: true,
})

const clouds = [...new Array(props.segments)].map((_, index) => ({
  x: props.width / 2 - Math.random() * props.width,
  y: props.width / 2 - Math.random() * props.width,
  scale: 0.4 + Math.sin(((index + 1) / props.segments) * Math.PI) * ((0.2 + Math.random()) * 10),
  density: Math.max(0.2, Math.random()),
  rotation: Math.max(0.002, 0.005 * Math.random()) * props.speed,
}))
const opacity = (scale: number, density: number): number => (scale / 6) * density * props.opacity

const { map: cloudTexture } = await useTexture({ map: props.texture })

const { state } = useCientos()
const encoding = computed(() => state.renderer?.outputEncoding)

const { onLoop } = useRenderLoop()

onLoop(({ elapsed}) => {
  if (cloudsRef.value && state.camera && groupRef.value) {
    groupRef.value?.children.forEach((cloud: Object3D, index: number) => {
      cloud.rotation.z += clouds[index].rotation
    })
    cloudsRef.value.lookAt(state.camera?.position)
  }
})

const cloudsRef = shallowRef()
const groupRef = shallowRef()

defineExpose({
  value: cloudsRef,
})
</script>
<template>
  <TresGroup ref="cloudsRef" v-bind="$attrs" >
    <TresGroup ref="groupRef" :position="[0, 0, (segments / 2) * depth]">
      <TresMesh v-for="({ scale, x, y, density }, index) in clouds" :key="index" :position="[x, y, -index * depth]">
        <TresPlaneGeometry :scale="[scale, scale, scale]" :rotation="[0, 0, 0]" />
        <TresMeshStandardMaterial
        :map="cloudTexture"
        :map-encoding="encoding"
        :depthTest="depthTest"
        :color="color"
        :depthWrite="false"
        transparent
        :opacity="opacity(scale, density)"
        />
      </TresMesh>
    </TresGroup>
  </TresGroup>
</template>
