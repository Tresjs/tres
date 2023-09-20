<script setup lang="ts">
const { scene: model, animations } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/warcraft-3-alliance-footmanfanmade/source/Footman_RIG.glb',
)
const { actions, mixer } = useAnimations(animations, model)

let currentAction = actions.Idle

currentAction.play()

const { value: animation } = useControls({
  animation: {
    value: 'Idle',
    options: [
      { text: 'Idle', value: 'Idle' },
      { text: 'SwordAndShieldCrouchBlockIdle', value: 'SwordAndShieldCrouchBlockIdle' },
      { text: 'SwordAndShieldDeath_2', value: 'SwordAndShieldDeath_2' },
      { text: 'SwordAndShieldIdle', value: 'SwordAndShieldIdle' },
      { text: 'SwordAndShieldKick', value: 'SwordAndShieldKick' },
      { text: 'SwordAndShieldRun(back)', value: 'SwordAndShieldRun(back)' },
      { text: 'SwordAndShieldRun', value: 'SwordAndShieldRun' },
      { text: 'SwordAndShieldSlash_2', value: 'SwordAndShieldSlash_2' },
      { text: 'SwordAndShieldSlash', value: 'SwordAndShieldSlash' },
      { text: 'T-Pose', value: 'T-Pose' },
    ],
  },
})

watch(animation, (value) => {
  currentAction.stop()
  currentAction = actions[value as unknown as string]
  currentAction.play()
})

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (mixer) {
    mixer.update(0.01)
  }
})
</script>

<template>
  <Suspense>
    <primitive :object="model" />
  </Suspense>
</template>
