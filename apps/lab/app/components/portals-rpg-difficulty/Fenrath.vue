<script setup lang="ts">
import { useAnimations } from '@tresjs/cientos/webgpu'

const props = defineProps<{
  nodes: Record<string, any>
  state: Record<string, any>
}>()

const fenrath = computed(() => props.nodes.Rig_Large)

const { actions } = useAnimations(props.state.animations, fenrath.value)

const currentAction = actions.Fenrath_Pose
currentAction?.play()
</script>

<template>
  <primitive name="Fenrath" :object="fenrath" />
</template>
