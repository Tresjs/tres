<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'

const props = defineProps<{
  paneContainer: HTMLElement | undefined
}>()

const meshRef = ref()
const pane = ref<Pane>()

const controls = ref({
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  scale: 1,
  color: '#ff6b6b',
  wireframe: false,
  material: 'basic',
})

onMounted(() => {
  if (!props.paneContainer) {
    return
  }

  pane.value = new Pane({
    title: 'TresJS Controls',
    expanded: true,
    container: props.paneContainer,
  })

  // Position controls
  const positionFolder = pane.value.addFolder({ title: 'Position' })
  positionFolder.addBinding(controls.value, 'positionX', { min: -3, max: 3, step: 0.1 })
  positionFolder.addBinding(controls.value, 'positionY', { min: -3, max: 3, step: 0.1 })
  positionFolder.addBinding(controls.value, 'positionZ', { min: -3, max: 3, step: 0.1 })

  // Rotation controls
  const rotationFolder = pane.value.addFolder({ title: 'Rotation' })
  rotationFolder.addBinding(controls.value, 'rotationX', { min: -Math.PI, max: Math.PI, step: 0.01 })
  rotationFolder.addBinding(controls.value, 'rotationY', { min: -Math.PI, max: Math.PI, step: 0.01 })
  rotationFolder.addBinding(controls.value, 'rotationZ', { min: -Math.PI, max: Math.PI, step: 0.01 })

  // Material controls
  const materialFolder = pane.value.addFolder({ title: 'Material' })
  materialFolder.addBinding(controls.value, 'scale', { min: 0.1, max: 3, step: 0.1 })
  materialFolder.addBinding(controls.value, 'color')
  materialFolder.addBinding(controls.value, 'wireframe')
  materialFolder.addBinding(controls.value, 'material', {
    options: {
      Basic: 'basic',
      Normal: 'normal',
      Standard: 'standard',
    },
  })

  // Reset button
  pane.value.addButton({ title: 'Reset All' }).on('click', () => {
    controls.value.positionX = 0
    controls.value.positionY = 0
    controls.value.positionZ = 0
    controls.value.rotationX = 0
    controls.value.rotationY = 0
    controls.value.rotationZ = 0
    controls.value.scale = 1
    controls.value.color = '#ff6b6b'
    controls.value.wireframe = false
    controls.value.material = 'basic'
  })
})

onUnmounted(() => {
  pane.value?.dispose()
})
</script>

<template>
  <OrbitControls />

  <TresMesh
    ref="meshRef"
    :position="[controls.positionX, controls.positionY, controls.positionZ]"
    :rotation="[controls.rotationX, controls.rotationY, controls.rotationZ]"
    :scale="controls.scale"
  >
    <TresBoxGeometry />
    <TresMeshBasicMaterial
      v-if="controls.material === 'basic'"
      :color="controls.color"
      :wireframe="controls.wireframe"
    />
    <TresMeshNormalMaterial
      v-else-if="controls.material === 'normal'"
      :wireframe="controls.wireframe"
    />
    <TresMeshStandardMaterial
      v-else-if="controls.material === 'standard'"
      :color="controls.color"
      :wireframe="controls.wireframe"
    />
  </TresMesh>

  <TresGridHelper :args="[10, 10]" />
  <TresAmbientLight :intensity="0.5" />
  <TresDirectionalLight :position="[0, 0, 5]" :intensity="0.5" />
</template>
