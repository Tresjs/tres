<script setup lang="ts">

const props = defineProps<{
    nodes: Record<string, any>
    state: Record<string, any>
}>()

const zynrae = computed(() => props.nodes['Rig_Zynrae'])

const { actions } = useAnimations(props.state.animations, zynrae.value)

const currentAction = actions['Zynrae_Pose']
currentAction?.play()
</script>

<template>
    <primitive name="Zynrae" :object="zynrae" />
</template>
