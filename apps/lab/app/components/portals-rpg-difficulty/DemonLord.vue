<script setup lang="ts">
const props = defineProps<{
  nodes: Record<string, any>
  state: Record<string, any>
}>()

const demonLord = computed(() => props.nodes.Rig_Demon)

const { actions } = useAnimations(props.state.animations, demonLord.value)

const currentAction = actions.Demon_Lord_Pose
currentAction?.play()
</script>

<template>
  <primitive name="Demon Lord" :object="demonLord" />
</template>
