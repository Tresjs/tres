<script lang="ts">
import { watch } from 'vue';
import { useControls } from '..';

/* const { nameOfControl } = useControls({
    nameOfControl: 'awiwi'
}) */
export default {
  setup() {
    const { value: awiwi } = useControls({
      awiwi: 'chavroso'
    })

    watch(awiwi, value => {
      console.log('INSIDE TEST', value)
    })
    return {
      awiwi
    }
}
}
</script>
<template>
    <TresLeches />
</template>