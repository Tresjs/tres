<script setup lang="ts">

const props = defineProps<{
    nodes: Record<string, any>
    state: Record<string, any>
}>()

const dog = computed(() => props.nodes['Rig_Dog'])

const { actions } = useAnimations(props.state.animations, dog.value)

const currentAction = actions.Chilling

currentAction?.play()
</script>

<template>
    <primitive name="Dog" :object="dog" />
</template>