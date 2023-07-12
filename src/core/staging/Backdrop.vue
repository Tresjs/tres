<script setup lang="ts">
import { BufferAttribute, PlaneGeometry } from 'three'
import { Ref, ref, watch } from 'vue'

export type BackdropProps = {
  floor?: number
  segments?: number
  receiveShadow?: boolean
}

const easeInExpo = (x: number) => (x === 0 ? 0 : Math.pow(2, 10 * x - 10))

// TODO: remove disable once eslint is updated to support vue 3.3
// eslint-disable-next-line vue/no-setup-props-destructure
const {
  floor = 0.25,
  segments = 20,
  receiveShadow = false,
} = defineProps<BackdropProps>()

const planeRef: Ref<PlaneGeometry | null> = ref(null)

watch(() => [segments, floor, planeRef.value], ([segments, floor, planeRef]) => {
  if (!planeRef) return
  let i = 0
  const offset = segments / segments / 2
  const position = planeRef.attributes.position as BufferAttribute
  for (let x = 0; x < segments + 1; x++) {
    for (let y = 0; y < segments + 1; y++) {
      position.setXYZ(
        i++,
        x / segments - offset + (x === 0 ? -floor : 0),
        y / segments - offset,
        easeInExpo(x / segments)
      )
    }
  }
  position.needsUpdate = true
  planeRef.computeVertexNormals()
})


</script>
<template>
  <TresGroup v-bind="$attrs">
    <TresMesh :receive-shadow="receiveShadow" :rotation="[-Math.PI /2, 0, Math.PI /2]">
      <TresPlaneGeometry ref="planeRef" :args="[1, 1, segments, segments]" />
      <slot>
        <TresMeshStandardMaterial :color="0x808080" :side="2"/>
      </slot>
    </TresMesh>
  </TresGroup>  
</template>