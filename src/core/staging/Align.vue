<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import type { Group, Object3D, Object3DEventMap } from 'three'
import { Box3, Sphere, Vector3 } from 'three'
import type { MaybeRefOrGetter } from 'vue'
import { shallowRef, toValue, watchEffect } from 'vue'

// NOTE: Sources
// https://github.com/pmndrs/drei/blob/master/src/core/Center.tsx

export interface AlignCallbackOptions {
  /** The next parent above <Align /> */
  parent: Object3D<Object3DEventMap>
  /** The outmost container group of the <Align/> component */
  container: Group
  width: number
  height: number
  depth: number
  boundingBox: Box3
  boundingSphere: Sphere
  center: Vector3
  verticalAlignment: number
  horizontalAlignment: number
  depthAlignment: number
}

export interface AlignProps {
  top?: boolean
  right?: boolean
  bottom?: boolean
  left?: boolean
  front?: boolean
  back?: boolean
  /** Disable all axes */
  disable?: boolean
  /** Disable x-axis alignment */
  disableX?: boolean
  /** Disable y-axis alignment */
  disableY?: boolean
  /** Disable z-axis alignment */
  disableZ?: boolean
  /** See https://threejs.org/docs/index.html?q=box3#api/en/math/Box3.setFromObject */
  precise?: boolean
  /** Optional cacheKey to keep the component from recalculating on every render */
  cacheKey?: MaybeRefOrGetter<any>
}

const props = withDefaults(defineProps<AlignProps>(), {
  precise: true,
  cacheKey: undefined,
})

const emit = defineEmits<{
  (e: 'update' | 'change', props: AlignCallbackOptions): void
}>()

const ref = shallowRef<Group>()
const outer = shallowRef<Group>()
const inner = shallowRef<Group>()

const box3 = new Box3()
const center = new Vector3()
const sphere = new Sphere()

const previous = { width: 0, height: 0, depth: 0, position: new Vector3() }

function update() {
  if (!outer.value || !inner.value || !ref.value) { return }
  outer.value.matrixWorld.identity()
  box3.setFromObject(inner.value, props.precise)
  const width = box3.max.x - box3.min.x
  const height = box3.max.y - box3.min.y
  const depth = box3.max.z - box3.min.z
  box3.getCenter(center)
  box3.getBoundingSphere(sphere)
  const yAlign = props.top ? height / 2 : props.bottom ? -height / 2 : 0
  const xAlign = props.left ? -width / 2 : props.right ? width / 2 : 0
  const zAlign = props.front ? depth / 2 : props.back ? -depth / 2 : 0

  outer.value.position.set(
    props.disable || props.disableX ? 0 : -center.x + xAlign,
    props.disable || props.disableY ? 0 : -center.y + yAlign,
    props.disable || props.disableZ ? 0 : -center.z + zAlign,
  )

  if (previous.width !== width
    || previous.height !== height
    || previous.depth !== depth
    || !outer.value.position.equals(previous.position)) {
    emit('change', {
      parent: ref.value.parent! as Object3D<Object3DEventMap>,
      container: ref.value,
      width,
      height,
      depth,
      boundingBox: box3,
      boundingSphere: sphere,
      center,
      verticalAlignment: yAlign,
      horizontalAlignment: xAlign,
      depthAlignment: zAlign,
    })
    previous.width = width
    previous.height = height
    previous.depth = depth
    previous.position.copy(outer.value.position)
  }
}

let off: (() => void) | null = null
let cacheKey: any = null

// NOTE: `useLoop` requires TresContext, which is only
// availble in setup. We need a handle in useEffect,
// so keep a reference.
const loop = useLoop()

watchEffect(() => {
  // NOTE: update whenever cachekey changes.

  // NOTE: We might already always be updating, so `off`.
  off?.()
  off = null

  // NOTE: Don't update if we resolve to the previous cacheKey value,
  // unless cacheKey is null or undefined.
  const nextKey = toValue(props.cacheKey)
  if (nextKey === cacheKey && cacheKey !== null && cacheKey !== undefined) { return }
  cacheKey = nextKey

  if (props.cacheKey === null || props.cacheKey === undefined) {
    off = loop.onBeforeRender(() => {
      update()
    }).off
  }
  else {
    update()
  }
})

defineExpose({ instance: ref, update })
</script>

<template>
  <TresGroup ref="ref">
    <TresGroup ref="outer">
      <TresGroup ref="inner">
        <slot></slot>
      </TresGroup>
    </TresGroup>
  </TresGroup>
</template>
