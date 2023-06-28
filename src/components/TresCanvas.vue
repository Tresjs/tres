<script setup lang="ts">
import TresScene, { TresSceneProps } from './TresScene.vue'
import { useTresProvider } from '../composables'

const props = defineProps<TresSceneProps>()

const tres = useTresProvider()

defineExpose(tres)
</script>
<template>
    <TresScene v-bind="props">
        <slot />
    </TresScene>
</template>