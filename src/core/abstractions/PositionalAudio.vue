<script setup lang="ts">
import { useLoader, useTresContext } from '@tresjs/core'
import { AudioListener, AudioLoader, Box3 } from 'three'
import { PositionalAudioHelper } from 'three-stdlib'
import { onBeforeUnmount, onMounted, shallowReactive, shallowRef, toRefs, watch } from 'vue'
import type { LoaderProto } from '@tresjs/core'
import type { Material, Object3D, PositionalAudio } from 'three'

// TODO: Add & Dynamize : setRolloffFactor 'FLOAT' from https://threejs.org/docs/index.html?q=posi#api/en/audio/PositionalAudio.setRolloffFactor
// TODO: Add & Dynamize : setMaxDistance 'FLOAT' from https://threejs.org/docs/index.html?q=posi#api/en/audio/PositionalAudio.setMaxDistance
// TODO: Add & Dynamize : setDistanceModel 'STRING' from https://threejs.org/docs/index.html?q=posi#api/en/audio/PositionalAudio.setDistanceModel

export interface PositionalAudioProps {
  ready: boolean
  url: string
  distance?: number
  helper?: boolean
  loop?: boolean
  autoplay?: boolean
  innerAngle?: number
  outerAngle?: number
  outerGain?: number
}

const props = withDefaults(defineProps<PositionalAudioProps>(), {
  ready: false,
  helper: false,
  distance: 2,
  loop: false,
  autoplay: false,
  innerAngle: 360,
  outerAngle: 360,
  outerGain: 0,
})

const emit = defineEmits(['isPlaying'])

const { ready, url, distance, helper, loop, autoplay, innerAngle, outerAngle, outerGain } = toRefs(props)

const { camera } = useTresContext()

const positionalAudioRef = shallowRef<PositionalAudio | null>(null)
const positionalAudioHelperRef = shallowRef<PositionalAudioHelper | null>(null)
const buffer = shallowRef<AudioBuffer | null>(null)
const listener = shallowReactive<AudioListener>(new AudioListener())

const playAudio = () => {
  if (positionalAudioRef?.value?.isPlaying) { return }

  positionalAudioRef?.value?.play()
  emit('isPlaying', positionalAudioRef?.value?.isPlaying)
}

const pauseAudio = () => {
  if (!positionalAudioRef?.value?.isPlaying) { return }

  positionalAudioRef.value.pause()
  emit('isPlaying', positionalAudioRef?.value?.isPlaying)
}

const stopAudio = () => {
  if (!positionalAudioRef.value) { return }

  positionalAudioRef.value.stop()
  emit('isPlaying', positionalAudioRef?.value?.isPlaying)
}

const disposeAudio = () => {
  if (!positionalAudioRef?.value) { return }

  stopAudio()

  const audio = positionalAudioRef.value

  if (audio.source) {
    audio.disconnect()
  }
}

const disposeHelper = () => {
  if (!positionalAudioRef?.value || !positionalAudioHelperRef?.value) { return }

  positionalAudioHelperRef?.value?.dispose()
  positionalAudioRef?.value?.remove(positionalAudioHelperRef?.value)
}

const updatePositionalAudio = () => {
  if (!positionalAudioRef.value) { return }

  positionalAudioRef.value.setBuffer(buffer.value as AudioBuffer)
  positionalAudioRef.value.setRefDistance(distance.value)
  positionalAudioRef.value.setLoop(loop.value)
  positionalAudioRef.value.setDirectionalCone(innerAngle.value, outerAngle.value, outerGain.value)

  positionalAudioHelperRef?.value?.update()

  // Small hack to solve the visibility problem of material[0] inside the positionalAudioHelperRef function update()
  // https://github.com/mrdoob/three.js/blob/ef80ac74e6716a50104a57d8add6c8a950bff8d7/examples/jsm/helpers/PositionalAudioHelper.js#L94C49-L94C57
  if (positionalAudioHelperRef?.value) {
    const material = (positionalAudioHelperRef.value.material as Material[])[0]
    const materialVisible = material.visible

    if (!materialVisible && outerAngle.value !== innerAngle.value) {
      material.visible = true
    }
  }
}

const createHelper = () => {
  updatePositionalAudio()

  const parent = positionalAudioRef.value?.parent
  const boxParent = new Box3().setFromObject(parent as Object3D)
  const depthParent = (boxParent.max.z - boxParent.min.z) * 2

  positionalAudioHelperRef.value = new PositionalAudioHelper(positionalAudioRef.value as PositionalAudio, depthParent, 32, 16)
  positionalAudioRef?.value?.add(positionalAudioHelperRef.value)
  positionalAudioHelperRef.value.update()
}

const dispose = () => {
  camera?.value?.remove(listener)

  disposeAudio()
  disposeHelper()
}

defineExpose({
  instance: positionalAudioRef,
  play: playAudio,
  stop: stopAudio,
  pause: pauseAudio,
  dispose,
})

buffer.value = await useLoader<AudioBuffer | AudioBuffer[]>(AudioLoader as LoaderProto<AudioBuffer | AudioBuffer[]>, url.value) as AudioBuffer

watch(positionalAudioRef, () => {
  if (!positionalAudioRef?.value) { return }

  if (helper.value) { createHelper() }
  if (ready.value && autoplay) { playAudio() }
})

watch(helper, () => {
  if (helper.value) {
    createHelper()
  }
  else {
    disposeHelper()
  }
})

watch(ready, () => {
  if (ready.value) { updatePositionalAudio() }

  if (autoplay.value && ready.value) { playAudio() }
  if (!autoplay.value && ready.value) { stopAudio() }
})

watch([distance, loop, buffer, innerAngle, outerAngle, outerGain, autoplay], () => {
  updatePositionalAudio()
})

onMounted(() => {
  camera?.value?.add(listener)
})

onBeforeUnmount(() => {
  dispose()
})
</script>

<template>
  <TresPositionalAudio
    ref="positionalAudioRef"
    :args="[listener]"
    v-bind="$attrs"
  />
</template>
