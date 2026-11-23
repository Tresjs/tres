<script setup lang="ts">
import { useAnimations } from '@tresjs/cientos/webgpu'

const props = defineProps<{
  nodes: Record<string, any>
  state: Record<string, any>
}>()

const engineer = computed(() => props.nodes.Rig_Engineer)

const { actions } = useAnimations(props.state.animations, engineer.value)

const currentAction = actions.Laying

currentAction?.play()
</script>

<template>
  <primitive name="Engineer" :object="engineer" />
</template>
