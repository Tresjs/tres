<script setup lang="ts">
import { useAnimations } from '@tresjs/cientos/webgpu'

const props = defineProps<{
  nodes: Record<string, any>
  state: Record<string, any>
}>()

const knight = computed(() => props.nodes.Rig_Knight)

const { actions } = useAnimations(props.state.animations, knight.value)

const currentAction = actions.Knight_Action_Pose
currentAction?.play()
</script>

<template>
  <primitive name="Knight" :object="knight" />
</template>
