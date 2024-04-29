<script setup lang="ts">
import { onMounted, shallowRef, watch } from 'vue'
import type { Object3D } from 'three'
import { Box3, Group, Vector3 } from 'three'

export interface Props {
  /**
   * If `into` is:
   * * omitted or explicitly `undefined`: position/scale children to fit into a 1 × 1 × 1 `Box3` at world origin.
   * * `null`: turn off `<Fit />`; reset scale/position of children.
   * * `number`: convert argument to `Vector3(number, number, number)`.
   * * `number[]`: convert argument to `Vector3`.
   * * `Vector3`: position/scale children to fit inside a `Box3` of size `Vector3` at target objects' cumulative center.
   * * `Box3`: position/scale children to fit inside `Box3`.
   * * `Object3D`: position/scale children to fit inside calculated `Box3`. [See `THREE.Box3.setFromObject`](https://threejs.org/docs/#api/en/math/Box3.setFromObject). `<Fit />` must not contain the `Object3D` and vice-versa.
   **/
  into?: number | number[] | Vector3 | Box3 | Object3D | null
  /** [See `precise` argument in `THREE.Box3.setFromObject`](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3.setFromObject) */
  precise?: boolean
}

const props: Props = withDefaults(defineProps<Props>(), {
  into: () => new Box3(new Vector3(-0.5, -0.5, -0.5), new Vector3(0.5, 0.5, 0.5)),
  precise: false,
})

const middle = shallowRef<Group>(new Group())
const inner = shallowRef<Group>(new Group())

interface IntoPropNormalized {
  box3: Box3 
  use: { position: boolean }
}

function fit(container: typeof props.into, precise: typeof props.precise) {
  middle.value.position.set(0, 0, 0)
  middle.value.updateMatrixWorld()
  inner.value.scale.set(1, 1, 1)
  inner.value.updateMatrixWorld()

  if (!inner.value.children.length || container === null) {
    // NOTE: Nothing to do.
    return
  }

  const { box3: containerBox, use } = normalizeContainer(container, precise)

  const childBox = new Box3()
  inner.value.children.forEach(c => childBox.expandByObject(c, precise))
  const childBoxSize = childBox.getSize(new Vector3())
  const containerBoxSize = containerBox.getSize(new Vector3())

  const { POSITIVE_INFINITY: INF } = Number
  const scale = Math.min(
    containerBoxSize.x / childBoxSize.x,
    containerBoxSize.y / childBoxSize.y,
    containerBoxSize.z / childBoxSize.z,
  )
  inner.value.scale.setScalar(scale === INF ? 1 : scale)
  inner.value.updateMatrixWorld()

  const containerBoxCenter = middle.value.worldToLocal(containerBox.getCenter(new Vector3()))
  const childBoxCenter = middle.value.worldToLocal(childBox.getCenter(new Vector3()))
  const newPosition = containerBoxCenter.sub(childBoxCenter.clone().multiplyScalar(scale))
  const oldPosition = childBoxCenter.sub(childBoxCenter.clone().multiplyScalar(scale))

  middle.value.position.x = use.position ? newPosition.x : oldPosition.x
  middle.value.position.y = use.position ? newPosition.y : oldPosition.y
  middle.value.position.z = use.position ? newPosition.z : oldPosition.z
}

function normalizeContainer(container: typeof props.into, precise: typeof props.precise): IntoPropNormalized {
  if (typeof container === 'number') {
    container = new Vector3(container, container, container)
  } 
  else if (Array.isArray(container)) {
    // NOTE: Don't modify the user's array.
    container = [... container]
    if (container.length < 1) container.push(1)
    while (container.length < 3) container.push(container[container.length - 1])
    container = new Vector3(... container)
  }

  if (container && 'isVector3' in container && container.isVector3) {
    return { box3: new Box3(new Vector3(0, 0, 0), container), use: { position: false } }
  }
  else if (container && 'isBox3' in container && container.isBox3) {
    return { box3: container as Box3, use: { position: true } }
  }
  else if (container && 'isObject3D' in container && container.isObject3D) {
    return { box3: new Box3().setFromObject(container as Object3D, precise ?? false),
      use: { position: true },
    }
  }

  return {
    box3: new Box3(new Vector3(-0.5, -0.5, -0.5), new Vector3(0.5, 0.5, 0.5)),
    use: { position: true },
  }
}

watch(() => [ props.into, props.precise ], () => fit(props.into, props.precise))

onMounted(() => {
  fit(props.into, props.precise)
  // NOTE: Tres core doesn't appear to apply transformations (position, rotation, scale)
  // immediately on newly created elements. So we'll `fit` again in a moment.
  setTimeout(() => fit(props.into, props.precise), 5)
})

defineExpose({ 
  fit: (
    into: typeof props.into = new Box3(new Vector3(-0.5, -0.5, -0.5), new Vector3(0.5, 0.5, 0.5)), 
    precise = false,
  ) => { fit(into, precise) },
  update: () => fit(props.into, props.precise),
})
</script>

<template>
  <TresGroup>
    <TresGroup ref="middle">
      <TresGroup ref="inner">
        <slot />
      </TresGroup>
    </TresGroup>
  </TresGroup>
</template>