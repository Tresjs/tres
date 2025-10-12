<script setup lang="ts">
import { LoopOnce } from 'three'

const { state, nodes } = useGLTF('/models/cult-of-the-lamb/lamb-v2.glb', { draco: true })

const lamb = computed(() => nodes.value?.['rig'])
const animations = computed(() => state.value?.animations || [])

const { actions } = useAnimations(animations, lamb)

const currentAction = ref(actions['elevate'])

watch(actions, (newActions) => {
  currentAction.value = newActions['elevate']
  if (!currentAction.value) return
  currentAction.value.clampWhenFinished = true
  currentAction.value.loop = LoopOnce
  currentAction.value.play()
})

</script>

<template>
  <TresGroup>
    <Levioso>
      <primitive v-if="lamb" :object="lamb" name="lamb" />
    </Levioso>
  </TresGroup>
</template>