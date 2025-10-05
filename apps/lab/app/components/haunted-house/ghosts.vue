<script setup>
import { shallowRef } from 'vue'

const ghost1 = shallowRef(null)
const ghost2 = shallowRef(null)
const ghost3 = shallowRef(null)

const { onBeforeRender } = useLoop()
onBeforeRender(({ elapsed }) => {
  const ghost1Angle = elapsed * 0.5
  const ghost2Angle = -elapsed * 0.32
  const ghost3Angle = -elapsed * 0.18
  if (ghost1.value && ghost2.value && ghost3.value) {
    ghost1.value.position.x = Math.cos(ghost1Angle) * 4
    ghost1.value.position.z = Math.sin(ghost1Angle) * 4
    ghost1.value.position.y = Math.sin(elapsed * 3)

    ghost2.value.position.x = Math.cos(ghost2Angle) * 5
    ghost2.value.position.z = Math.sin(ghost2Angle) * 5
    ghost2.value.position.y = Math.sin(elapsed * 4) + Math.sin(elapsed * 2.5)

    ghost3.value.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsed * 0.32))
    ghost3.value.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsed * 0.5))
    ghost3.value.position.y = Math.sin(elapsed * 4) + Math.sin(elapsed * 2.5)
  }
})
</script>

<template>
  <TresPointLight ref="ghost1" :args="['#ff00ff', 3, 3]" cast-shadow />
  <TresPointLight ref="ghost2" :args="['#00ffff', 3, 3]" cast-shadow />
  <TresPointLight ref="ghost3" :args="['#ff7800', 3, 3]" cast-shadow />
</template>
