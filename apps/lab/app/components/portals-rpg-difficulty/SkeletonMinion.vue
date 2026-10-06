<script setup lang="ts">
const props = defineProps<{
  nodes: Record<string, any>
  state: Record<string, any>
}>()

// GLTFLoader strips the Blender .001/.002 suffix dots from node names
// (Rig_Skeleton_Minion001) but not from clip names (Skeleton_Minion_Pose.001).
const SUFFIXES = ['', '.001', '.002']

const minions = SUFFIXES.map((suffix) => {
  const rig = props.nodes[`Rig_Skeleton_Minion${suffix.replace('.', '')}`]
  // One mixer per rig: a clip only binds to the armature it was authored on.
  const { actions } = useAnimations(props.state.animations, rig)
  actions[`Skeleton_Minion_Pose${suffix}`]?.play()
  return rig
})
</script>

<template>
  <primitive v-for="minion in minions" :key="minion.name" name="Skeleton Minion" :object="minion" />
</template>
