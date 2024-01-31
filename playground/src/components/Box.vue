
<script setup lang="ts">
import { ref, shallowRef, useAttrs } from 'vue'
import { useRenderLoop } from '@tresjs/core';
import { Color } from 'three'

const props = defineProps(['position', 'name'])

const boxRef = shallowRef();
const count = ref(0);

// Event Testing Colors
const black = new Color('black');
const green = new Color('green');
const red = new Color('red');
const blue = new Color('blue');
const yellow = new Color('yellow');
const white = new Color('white');
const purple = new Color('purple');
const cyan = new Color('cyan');

// Once the box has flashed green, lerp it back to black
const { onLoop } = useRenderLoop();
onLoop(() => {
  boxRef.value?.material.color.lerp(black, 0.1)
})

// onClick flash the box green and update the counter
function handleClick(color: Color) {
  boxRef.value.material.color.set(color);
  count.value++;
  console.log('Box ' + boxRef.value.name + ' count=' + count.value)
}

</script>

<template>
  <TresMesh
    ref="boxRef"
    v-bind="props"
    @click="handleClick(green)"
  >
    <TresBoxGeometry />
    <TresMeshStandardMaterial />
    <!-- <Text fontSize={0.5} font="monospace" position-z={0.501}>
        {count}
      </Text> -->
      <slot></slot>
  </TresMesh>
</template>
