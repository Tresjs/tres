<script setup lang="ts">
import { ref, shallowRef, toRefs, watch } from 'vue'
import type { BufferAttribute, PlaneGeometry } from 'three'
import type { Ref } from 'vue'

export interface BackdropProps {
  floor?: number
  segments?: number
  receiveShadow?: boolean
}

const props = withDefaults(defineProps<BackdropProps>(), {
  floor: 0.25,
  segments: 20,
  receiveShadow: false,
})

const easeInExpo = (x: number) => (x === 0 ? 0 : 2 ** (10 * x - 10))

const { floor, segments, receiveShadow } = toRefs(props)

const planeRef: Ref<PlaneGeometry | null> = ref(null)

watch(
  [segments, floor, planeRef],
  ([segments, floor, planeRef]) => {
    if (!planeRef || segments === null) { return }
    let i = 0
    const offset = segments / segments / 2
    const position = planeRef.attributes.position as BufferAttribute
    for (let x = 0; x < segments + 1; x++) {
      for (let y = 0; y < segments + 1; y++) {
        position.setXYZ(
          i++,
          x / segments - offset + (x === 0 ? -floor : 0),
          y / segments - offset,
          easeInExpo(x / segments),
        )
      }
    }
    position.needsUpdate = true
    planeRef.computeVertexNormals()
  },
)

const backdropRef = shallowRef()
defineExpose({ instance: backdropRef })
</script>

<template>
  <TresGroup
    ref="backdropRef"
    v-bind="$attrs"
  >
    <TresMesh
      :receive-shadow="receiveShadow"
      :rotation="[-Math.PI / 2, 0, Math.PI / 2]"
    >
      <TresPlaneGeometry
        ref="planeRef"
        :args="[1, 1, segments, segments]"
      />
      <slot>
        <TresMeshStandardMaterial
          :color="0x808080"
          :side="2"
        />
      </slot>
    </TresMesh>
  </TresGroup>
</template>
