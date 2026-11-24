<script setup lang="ts">
import { useAnimations } from '@tresjs/cientos/webgpu'

const props = defineProps<{
  nodes: Record<string, any>
  state: Record<string, any>
}>()

const rogue = computed(() => props.nodes.Rig_Rogue)

const { actions } = useAnimations(props.state.animations, rogue.value)

const currentAction = actions.Jamming

currentAction?.play()
</script>

<template>
  <primitive name="Rogue" :object="rogue" />
</template>
