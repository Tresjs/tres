<script setup lang="ts">
import { extend, useLoader } from '@tresjs/core'
import { useTexture } from '@tresjs/cientos'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { useControls } from '@tresjs/leches'

const uuid = 'core-misc-text3d'

const props = defineProps<{
  text: string
}>()

const text3DRef = shallowRef()

extend({ TextGeometry })

const fontPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json'

const { state: font } = useLoader(FontLoader, fontPath)

const { state: matcapTexture } = useTexture('https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png')

const { size, height, curveSegments, bevelEnabled, bevelThickness, bevelSize, bevelOffset, bevelSegments, needUpdates, center } = useControls({
  needUpdates: true,
  center: true,
  size: {
    value: 0.5,
    min: 0.1,
    max: 1,
    step: 0.1,
  },
  height: {
    value: 0.2,
    min: 0.1,
    max: 1,
    step: 0.1,
  },
  curveSegments: {
    value: 5,
    min: 1,
    max: 10,
    step: 1,
  },
  bevelEnabled: true,
  bevelThickness: {
    value: 0.02,
    min: 0,
    max: 0.1,
    step: 0.01,
  },
  bevelSize: {
    value: 0.02,
    min: 0,
    max: 0.1,
    step: 0.01,
  },
  bevelOffset: {
    value: 0,
    min: -0.1,
    max: 0.1,
    step: 0.01,
  },
  bevelSegments: {
    value: 4,
    min: 1,
    max: 10,
    step: 1,
  },
}, { uuid })

const textOptions = computed(() => ({
  font: toValue(font),
  size: toValue(size),
  height: toValue(height),
  curveSegments: toValue(curveSegments),
  bevelEnabled: toValue(bevelEnabled),
  bevelThickness: toValue(bevelThickness),
  bevelSize: toValue(bevelSize),
  bevelOffset: toValue(bevelOffset),
  bevelSegments: toValue(bevelSegments),
}))

watchEffect(() => {
  if (props.text && needUpdates.value && text3DRef.value) {
    text3DRef.value.geometry.dispose()
    text3DRef.value.geometry = new TextGeometry(props.text, textOptions.value)
    if (center.value) {
      text3DRef.value.geometry.center()
    }
  }
})
</script>

<template>
  <TresMesh v-if="font" ref="text3DRef">
    <TresTextGeometry
      :args="[props.text, textOptions]"
      center
    />
    <TresMeshNormalMaterial :matcap="matcapTexture" />
  </TresMesh>
</template>
