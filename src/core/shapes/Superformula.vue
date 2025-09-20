<script setup lang="ts">
import { type TresColor, useTres } from '@tresjs/core'
import { BufferAttribute, BufferGeometry } from 'three'
import { onUnmounted, shallowRef, watch } from 'vue'

export type Float3 = [number, number, number]

export interface SuperFormulaProps {
  /**
   * Number of horizontal mesh segments
   */
  widthSegments?: number
  /**
   * Number of vertical mesh segments
   */
  heightSegments?: number
  /**
   * The 3D Superformula is the spherical product of 2 2D superformula curves: here called curves "A" and "B".
   * Number of radial arms/ripples of A, corresponding to "m" [in this article.](https://en.wikipedia.org/wiki/Superformula)
   */
  numArmsA?: number
  /**
   * A's 3 exponents
   */
  expA?: Float3
  /**
   * For B, number of radial arms/ripples
   */
  numArmsB?: number
  /**
   * B's 3 exponents
   */
  expB?: Float3
  /**
   * If no material is provided, a color for the default material
   */
  color?: TresColor
}

const props = withDefaults(defineProps<SuperFormulaProps>(), {
  widthSegments: 32,
  heightSegments: 32,
  numArmsA: 4,
  expA: () => [40, 1.3, 0.9],
  numArmsB: 4,
  expB: () => [40, 1.3, 0.9],
  color: 'white',
})

const { invalidate } = useTres()

const { cos, sin, abs } = Math

const geometry = shallowRef()
const color = shallowRef(props.color)

function makeGeometry(widthSegments: number, heightSegments: number) {
  const geometry = new BufferGeometry()
  const numPoints = widthSegments * heightSegments
  const vertices = new Float32Array(Array.from({ length: 3 * numPoints }).fill(0) as number[])
  const normals = new Float32Array(Array.from({ length: 3 * numPoints }).fill(0) as number[])
  const indices: number[] = []
  for (let h = 0; h < heightSegments - 1; h++) {
    for (let w = 0; w < widthSegments - 1; w++) {
      const tl = h * widthSegments + w
      const tr = tl + 1
      const bl = tl + widthSegments
      const br = tr + widthSegments
      indices.push(tl, bl, tr)
      indices.push(bl, br, tr)
    }
    const tl = h * widthSegments + widthSegments - 1
    const tr = h * widthSegments
    const bl = tl + widthSegments
    const br = tr + widthSegments
    indices.push(tl, bl, tr)
    indices.push(bl, br, tr)
  }
  geometry.setIndex(indices)
  geometry.setAttribute('position', new BufferAttribute(vertices, 3))
  geometry.setAttribute('normal', new BufferAttribute(normals, 3))
  return geometry
}

// Source:
// https://en.wikipedia.org/wiki/Superformula
// NOTE: Superformula 2D
function r(theta: number, numArms: number, exp1: number, exp2: number, exp3: number): number {
  return (abs(cos(numArms * theta * 0.25)) ** exp2 + abs(sin(numArms * theta * 0.25)) ** exp3) ** (-1 / exp1)
}

// NOTE: Superformula 3D
function updateGeometry(geometry: BufferGeometry, numArmsA: number, expA1: number, expA2: number, expA3: number, numArmsB: number, expB1: number, expB2: number, expB3: number, widthSegments: number, heightSegments: number) {
  const thetaStep = 2 * Math.PI / widthSegments
  const thetaStart = -Math.PI
  const phiStep = Math.PI / (heightSegments - 1)
  const phiStart = -0.5 * Math.PI
  const positionAttribute = geometry.getAttribute('position')

  let i = 0
  let theta = 0
  let phi = phiStart
  for (let pi = 0; pi < heightSegments; pi++) {
    theta = thetaStart
    for (let ti = 0; ti < widthSegments; ti++) {
      const rA = r(theta, numArmsA, expA1, expA2, expA3)
      const rB = r(phi, numArmsB, expB1, expB2, expB3)
      positionAttribute.setXYZ(
        i,
        rA * cos(theta) * rB * cos(phi),
        rB * sin(phi),
        rA * sin(theta) * rB * cos(phi),
      )
      i++
      theta += thetaStep
    }
    phi += phiStep
  }
  positionAttribute.needsUpdate = true
  geometry.computeVertexNormals()
}

watch(() => props.color, () => color.value = props.color)

watch(() => [props.widthSegments, props.heightSegments], () => {
  if (geometry.value) {
    geometry.value.dispose()
  }
  geometry.value = makeGeometry(props.widthSegments, props.heightSegments)
  invalidate()
}, { immediate: true })

watch(() => [
  props.numArmsA,
  props.expA[0],
  props.expA[1],
  props.expA[2],
  props.numArmsB,
  props.expB[0],
  props.expB[1],
  props.expB[2],
], () => {
  updateGeometry(geometry.value, props.numArmsA, props.expA[0], props.expA[1], props.expA[2], props.numArmsB, props.expB[0], props.expB[1], props.expB[2], props.widthSegments, props.heightSegments)
  invalidate()
}, { immediate: true })

onUnmounted(() => {
  if (geometry.value) {
    geometry.value.dispose()
  }
})

const superformulaRef = shallowRef()

defineExpose({
  instance: superformulaRef,
})
</script>

<template>
  <TresMesh
    ref="superformulaRef"
    v-bind="$attrs"
    :geometry="geometry"
  >
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
