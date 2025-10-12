<script setup lang="ts">
import { Html, useGLTF } from '@tresjs/cientos'
import { Color, MeshStandardMaterial } from 'three'

const emit = defineEmits(['view-clicked'])
const { nodes } = useGLTF('/models/iphone/iphonex.glb', { draco: true })
const model = computed(() => nodes.value.iphonex)
const back = computed(() => nodes.value.iphonexback)

watch(model, (value) => {
  console.log(value)
})

const screen = computed(() => nodes.value.SCREEN)
const bottomTab = computed(() => nodes.value.BottomTab)

watch(screen, (value) => {
  if (value) {
    value.position.set(0, 0, 0.01)
    value.material.transparent = true
    value.material.opacity = 0.5
  }
})

watch(bottomTab, (value) => {
  if (value) {
    value.material = new MeshStandardMaterial({
      color: new Color('#000000'),
      emissive: new Color('#000000'),
    })
  }
})

const closeUp = ref(false)
function onViewClose() {
  closeUp.value = true
  emit('view-clicked')
}
</script>

<template>
  <Levioso :speed="closeUp ? 0 : 1" :rotation-factor="closeUp ? 0 : 1">
    <TresGroup v-if="model && back" ref="" :position="[0, 1, 0]">
      <primitive :object="model">
        <Html v-if="!closeUp" :distance-factor="1.39" transform :scale="2" :position="[1, 0, 0.2]" :occlude="[back]">
        <!-- <button
          class="p-6 flex items-center rounded-full text-4xl  hover:bg-dark hover:text-white transition-colors duration-200 ease-in-out"
          @click="onViewClose">
          <i class="i-carbon-view" />
        </button> -->
        <UButton size="xl" color="neutral" variant="soft" class="rounded-full" icon="i-carbon-view"
          @click="onViewClose" />

        </Html>
        <Html transform wrapper-class="webpage" :distance-factor="1.39" center :occlude="[back]"
          :position="[0.17, -0.25, 0.05]">
        <iframe class="rounded-xl overflow-hidden w-[430px] h-[852px] bg-white dark:bg-dark"
          src="https://next--tresjs-web.netlify.app/" frameborder="0" />

        </Html>
      </primitive>
      <primitive :object="back" />
    </TresGroup>
  </Levioso>
</template>