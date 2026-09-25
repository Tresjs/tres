<script setup lang="ts">

const props = defineProps<{
    nodes: Record<string, any>
    state: Record<string, any>
}>()

const druid = computed(() => props.nodes['Rig_Druid'])

const { actions } = useAnimations(props.state.animations, druid.value)

const currentAction = actions.Singing

currentAction?.play()
</script>

<template>
    <primitive name="Druid" :object="druid" />
</template>