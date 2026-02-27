<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import ModelWithBVH from './ModelWithBVH.vue'
import { TresLeches, useControls } from '@tresjs/leches'
const uuid = 'bvh-demo'

useControls('fpsgraph', { uuid })

</script>

<template>
    <TresLeches :uuid="uuid" />
    <TresCanvas clear-color="#333333">
        <TresPerspectiveCamera :position="[5, 0, 8]" />
        <TresAmbientLight :intensity="1" />
        <OrbitControls />
        <ModelWithBVH />
    </TresCanvas>
</template>