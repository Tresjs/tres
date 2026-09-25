<script setup lang="ts">

const props = defineProps<{
    nodes: Record<string, any>
    state: Record<string, any>
}>()

const bard = computed(() => props.nodes['Rig_Bard'])

const { actions } = useAnimations(props.state.animations, bard.value)

const currentAction = actions.Playing

currentAction?.play()
</script>

<template>
    <primitive name="Bard" :object="bard" />
</template>