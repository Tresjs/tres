<script lang="ts" setup>
import type { TresColor, TresVector3 } from '@tresjs/core'
import { useLoop, useTresContext } from '@tresjs/core'
import { FrontSide, RepeatWrapping, TextureLoader, Vector3 } from 'three'
import type { Sky } from 'three-stdlib'
import { Water } from 'three-stdlib'
import { nextTick, onMounted, shallowRef, toRefs, watch } from 'vue'

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
  /**
   * The animation speed of the water surface.
   * Acts as a multiplier applied to the elapsed time (delta) that drives the `time` uniform,
   * controlling how fast the wave animation plays back.
   *
   * @default 1
   * @type {number}
   * @memberof OceanProps
   *
   */
  speed?: number
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
  speed: 1,
})

const { waterNormals, sunColor, waterColor, distortionScale, size, alpha, speed } = toRefs(props)

const { extend, scene } = useTresContext()

extend({ Water })

const waterRef = shallowRef()
const sunRef = shallowRef()
const _fog = scene.value.fog !== undefined

function changeSunColor(val: TresColor) {
  if (waterRef.value) {
    waterRef.value.material.uniforms.sunColor.value.set(val)
  }
}

function changeWaterColor(val: TresColor) {
  if (waterRef.value) {
    waterRef.value.material.uniforms.waterColor.value.set(val)
  }
}

function changeDistortionScale(val: number) {
  if (waterRef.value) {
    waterRef.value.material.uniforms.distortionScale.value = val
  }
}

function changeSize(val: number) {
  if (waterRef.value) {
    waterRef.value.material.uniforms.size.value = val
  }
}

function changeAlpha(val: number) {
  if (waterRef.value) {
    waterRef.value.material.uniforms.alpha.value = val
  }
}

// Watch for prop changes and update uniforms directly, avoiding recreation of the Water object
watch(sunColor, changeSunColor)
watch(waterColor, changeWaterColor)
watch(distortionScale, changeDistortionScale)
watch(size, changeSize)
watch(alpha, changeAlpha)

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

// Static initial values used to instantiate the Water object.
// These params are only read once at construction time; subsequent changes are handled via watchers above.
const initialParams = {
  textureWidth: props.textureWidth,
  textureHeight: props.textureHeight,
  waterNormals: normalMap,
  sunDirection: props.sunDirection,
  sunColor: props.sunColor,
  waterColor: props.waterColor,
  distortionScale: props.distortionScale,
  fog: _fog,
  size: props.size,
  clipBias: props.clipBias,
  alpha: props.alpha,
  side: props.side,
}

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta /* invalidate */ }) => {
  if (waterRef.value) {
    waterRef.value.material.uniforms.time.value += delta * speed.value
    // TODO: comment this until invalidate is back in the loop callback on v5
    // invalidate()
  }
})
</script>

<template>
  <TresWater ref="waterRef" :rotation-x="-Math.PI / 2" :args="[undefined, initialParams]">
    <slot>
      <TresPlaneGeometry :args="[10000, 10000]" />
    </slot>
  </TresWater>
</template>
