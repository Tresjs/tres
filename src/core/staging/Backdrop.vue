<script setup lang="ts">
import { BufferAttribute, PlaneGeometry } from 'three'
import { Ref, ref, toRefs, watch } from 'vue'

export type BackdropProps = {
  floor?: number
  segments?: number
  receiveShadow?: boolean
}

const easeInExpo = (x: number) => (x === 0 ? 0 : Math.pow(2, 10 * x - 10))

const props = withDefaults(defineProps<BackdropProps>(), {
  floor: 0.25,
  segments: 20,
  receiveShadow: false,
})

const { floor, segments, receiveShadow } = toRefs(props)

const planeRef: Ref<PlaneGeometry | null> = ref(null)

watch(
  () => [segments.value, floor.value, planeRef.value],
  ([segments, floor, planeRef]: [number, number, PlaneGeometry]) => {
    if (!planeRef || segments === null) return
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
</script>
<template>
  <TresGroup v-bind="$attrs">
    <TresMesh :receive-shadow="receiveShadow" :rotation="[-Math.PI / 2, 0, Math.PI / 2]">
      <TresPlaneGeometry ref="planeRef" :args="[1, 1, segments, segments]" />
      <slot>
        <TresMeshStandardMaterial :color="0x808080" :side="2" />
      </slot>
    </TresMesh>
  </TresGroup>
</template>
