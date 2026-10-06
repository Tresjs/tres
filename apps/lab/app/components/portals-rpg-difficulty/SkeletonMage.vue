<script setup lang="ts">
const props = defineProps<{
  nodes: Record<string, any>
  state: Record<string, any>
}>()

const skeletonMage = computed(() => props.nodes.Rig_Skeleton_Mage)

const { actions } = useAnimations(props.state.animations, skeletonMage.value)

const currentAction = actions.Skeleton_Mage_Pose
currentAction?.play()
</script>

<template>
  <primitive name="Skeleton Mage" :object="skeletonMage" />
</template>
