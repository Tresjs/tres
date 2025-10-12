<script setup lang="ts">


const { nodes, state } = useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/warcraft-3-alliance-footmanfanmade/source/Footman_RIG.glb',
)


const model = shallowRef()
const animations = computed(() => state.value?.animations || [])

// Update model reference when nodes are loaded
watch(nodes, (newNodes) => {
  if (newNodes?.Footman_rig) {
    model.value = newNodes.Footman_rig
  }
}, { immediate: true })

const { actions } = useAnimations(animations, model)

const currentAction = ref()


watch(actions, (newActions) => {
  currentAction.value = newActions.Idle
  currentAction.value.play()
})

</script>

<template>
  <primitive v-if="model" :object="model" />
</template>
