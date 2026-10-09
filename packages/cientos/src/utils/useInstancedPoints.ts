import { InstancedBufferAttribute } from 'three'
import { instancedBufferAttribute, instancedDynamicBufferAttribute } from 'three/tsl'
import type { PointsNodeMaterial } from 'three/webgpu'
import type { Ref, ShallowRef } from 'vue'
import { computed, shallowRef, watch } from 'vue'

// Imports `three/tsl`: only `webgpu.vue` may import this, and `utils/index.ts` must not re-export it.

// WebGPU draws `Points` at 1 pixel. The sprite needs `frustumCulled: false`: its bounds miss the points.
export function useInstancedPoints(
  positions: Ref<Float32Array>,
  material: ShallowRef<PointsNodeMaterial | undefined>,
  { dynamic = false } = {},
) {
  // The node takes the attribute as is, so `needsUpdate` on it reaches the GPU buffer.
  const createNode = dynamic ? instancedDynamicBufferAttribute : instancedBufferAttribute

  const attribute = shallowRef(new InstancedBufferAttribute(positions.value, 3))
  const positionNode = shallowRef(createNode(attribute.value))
  const count = computed(() => attribute.value.count)

  watch(positions, (array) => {
    // three r186 cannot dispose one attribute, so a replaced one leaks its GPU buffer until unmount.
    if (array.length === attribute.value.array.length) {
      attribute.value.array = array
      attribute.value.needsUpdate = true
      return
    }
    attribute.value = new InstancedBufferAttribute(array, 3)
    positionNode.value = createNode(attribute.value)
    if (material.value) { material.value.needsUpdate = true }
  })

  return { attribute, positionNode, count }
}
