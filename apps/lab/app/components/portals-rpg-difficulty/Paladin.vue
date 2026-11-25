<script setup lang="ts">
import { useAnimations } from '@tresjs/cientos/webgpu'

const props = defineProps<{
  nodes: Record<string, any>
  state: Record<string, any>
}>()

const paladin = computed(() => props.nodes.Rig_Paladin)

const { actions } = useAnimations(props.state.animations, paladin.value)

const currentAction = actions.Paladin_Pose
currentAction?.play()
</script>

<template>
  <primitive name="Paladin" :object="paladin" />
</template>
