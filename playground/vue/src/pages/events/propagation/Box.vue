<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { Color } from 'three'

const props = defineProps(['position', 'name'])

// TODO: Once we have troika text in cientos, display the count over each box
const count = ref(0)
const boxRef = shallowRef()

// Event Testing Colors
const black = new Color('black')
const green = new Color('green')

const blue = new Color('blue')

// Once the box has flashed green, lerp it back to black
const { onLoop } = useRenderLoop()
onLoop(() => {
  boxRef.value?.material.color.lerp(black, 0.1)
})

// onClick flash the box a color and update the counter
function handleClick(color: Color, ev) {
  count.value++
  ev?.eventObject?.material.color.set(color)
  // eslint-disable-next-line no-console
  console.log(`Box ${boxRef.value.name} count=${count.value}`)
}
</script>

<template>
  <TresMesh
    ref="boxRef"
    v-bind="props"
    @click.self="ev => handleClick(green, ev)"
    @pointer-missed="ev => handleClick(blue, ev)"
  >
    <TresBoxGeometry />
    <TresMeshStandardMaterial />
    <slot></slot>
  </TresMesh>
</template>
