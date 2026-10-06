<script setup lang="ts">
const props = defineProps<{
  nodes: Record<string, any>
  state: Record<string, any>
}>()

const necromancer = computed(() => props.nodes.Rig_Skeleton_Necromancer)

const { actions } = useAnimations(props.state.animations, necromancer.value)

const currentAction = actions.Necromancer_Pose
currentAction?.play()
</script>

<template>
  <primitive name="Necromancer" :object="necromancer" />
</template>
