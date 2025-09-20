<script lang="ts" setup>
import { useLoop, useTresContext } from '@tresjs/core'
import { FrontSide, RepeatWrapping, TextureLoader, Vector3 } from 'three'
import { Water } from 'three-stdlib'
import { nextTick, onMounted, shallowRef, toRefs } from 'vue'
import type { TresColor, TresVector3 } from '@tresjs/core'
import type { Sky } from 'three-stdlib'

export interface OceanProps {
  /**
   * The textureWidth of the internal WebGLRenderTarget.
   *
   * @default 512
   * @type {number}
   * @memberof OceanProps
   *
   */
  textureWidth?: number
  /**
   * The textureHeight of the internal WebGLRenderTarget.
   *
   * @default 512
   * @type {number}
   * @memberof OceanProps
   *
   */
  textureHeight?: number
  /**
   * The normal texture of the ocean.
   * @default 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/water/Water_1_M_Normal.jpg'
   * @type {string}
   * @memberof OceanProps
   * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
   */
  waterNormals?: string
  /**
   * The sun direction
   * @default '[0,0,0]'
   * @type {TresVector3}
   * @memberof OceanProps
   */
  sunDirection?: TresVector3
  /**
   * The sun color.
   *
   * @default '#fff'
   * @type {TresColor}
   * @memberof OceanProps
   *
   */
  sunColor?: TresColor
  /**
   * The water color.
   *
   * @default '#001e0f'
   * @type {TresColor}
   * @memberof OceanProps
   *
   */
  waterColor?: TresColor
  /**
   * The distortion scale of the reflections.
   * @default 3.7
   * @type {number}
   * @memberof OceanProps
   *
   */
  distortionScale?: number
  /**
   * The size of the normal texture.
   *
   * @default 1
   * @type {number}
   * @memberof OceanProps
   *
   */
  size?: number
  /**
   * The ClipBias.
   *
   * @default 0.0
   * @type {number}
   * @memberof OceanProps
   *
   */
  clipBias?: number
  /**
   * The alpha factor.
   *
   * @default 1.0
   * @type {number}
   * @memberof OceanProps
   *
   */
  alpha?: number
  /**
   * ThreeJs side material property.
   *
   * @default FrontSide
   * @type {TresVector3}
   * @memberof OceanProps
   *
   */
  side?: TresVector3
}

const props = withDefaults(defineProps<OceanProps>(), {
  textureWidth: 512,
  textureHeight: 512,
  waterNormals: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/water-normals/Water_1_M_Normal.jpg',
  sunDirection: () => new Vector3(),
  sunColor: 0xFFFFFF,
  waterColor: 0x001E0F,
  distortionScale: 3.7,
  size: 1,
  clipBias: 0.0,
  alpha: 1.0,
  side: FrontSide,
})

const { textureWidth, textureHeight, waterNormals, sunDirection, sunColor, waterColor, distortionScale, size, clipBias, alpha, side } = toRefs(props)

const { extend, scene } = useTresContext()

extend({ Water })

const waterRef = shallowRef()
const sunRef = shallowRef()
const _fog = scene.value.fog !== undefined

defineExpose({
  instance: waterRef,
})

scene.value.traverse((child) => {
  if (Object.prototype.hasOwnProperty.call(child, 'isSky')) {
    sunRef.value = child as Sky
  }
})

onMounted(async () => {
  await nextTick()
  if (sunRef.value) {
    const sunPosition = sunRef.value.material.uniforms.sunPosition.value
    waterRef.value.material.uniforms.sunDirection.value.copy(sunPosition)
  }
})

const normalMap = new TextureLoader().load(waterNormals.value)

normalMap.wrapS = normalMap.wrapT = RepeatWrapping

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta /* invalidate */ }) => {
  if (waterRef.value) {
    waterRef.value.material.uniforms.time.value += delta
    // TODO: comment this until invalidate is back in the loop callback on v5
    // invalidate()
  }
})
</script>

<template>
  <TresWater
    ref="waterRef"
    :rotation-x="-Math.PI / 2"
    :args="[undefined, {
      textureWidth,
      textureHeight,
      waterNormals: normalMap,
      sunDirection,
      sunColor,
      waterColor,
      distortionScale,
      fog: _fog,
      size,
      clipBias,
      alpha,
      side,
    }]"
  >
    <slot>
      <TresPlaneGeometry :args="[10000, 10000]" />
    </slot>
  </TresWater>
</template>
