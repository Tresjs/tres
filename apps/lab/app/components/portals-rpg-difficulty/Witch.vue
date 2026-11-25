<script setup lang="ts">
import { useAnimations } from '@tresjs/cientos/webgpu'

const props = defineProps<{
  nodes: Record<string, any>
  state: Record<string, any>
}>()

const witch = computed(() => props.nodes.Rig_Witch)

const { actions } = useAnimations(props.state.animations, witch.value)

const currentAction = actions.Clapping

currentAction?.play()
</script>

<template>
  <primitive name="Witch" :object="witch" />
</template>
