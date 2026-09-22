<script setup lang="ts">
const props = defineProps<{
  nodes: Record<string, any>
  state: Record<string, any>
}>()

const skeletonWarrior = computed(() => props.nodes.Rig_Skeleton_Warrior)

const { actions } = useAnimations(props.state.animations, skeletonWarrior.value)

const currentAction = actions.Skeleton_Warrior_Pose
currentAction?.play()
</script>

<template>
  <primitive name="Skeleton Warrior" :object="skeletonWarrior" />
</template>
