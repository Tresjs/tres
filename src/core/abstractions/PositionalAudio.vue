<script setup lang="ts">
import { defineExpose, withDefaults, onBeforeUnmount, onUnmounted, defineProps, shallowRef, watch, toRefs, shallowReactive, onMounted } from 'vue';
import { Box3, AudioLoader, AudioListener, PositionalAudio } from 'three'
import { useTresContext, useLoader } from '@tresjs/core'
import { PositionalAudioHelper } from 'three/examples/jsm/helpers/PositionalAudioHelper'

// TODO: Add & Dynamize : setRolloffFactor 'FLOAT' from https://threejs.org/docs/index.html?q=posi#api/en/audio/PositionalAudio.setRolloffFactor
// TODO: Add & Dynamize : setMaxDistance 'FLOAT' from https://threejs.org/docs/index.html?q=posi#api/en/audio/PositionalAudio.setMaxDistance
// TODO: Add & Dynamize : setDistanceModel 'STRING' from https://threejs.org/docs/index.html?q=posi#api/en/audio/PositionalAudio.setDistanceModel

export interface PositionalAudioProps {
    ready: boolean,
    url: string,
    distance?: number,
    helper?: boolean,
    loop?: boolean,
    autoplay?: boolean,
    innerAngle?: number,
    outerAngle?: number,
    outerGain?: number,
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
});

const { ready, url, distance, helper, loop, autoplay, innerAngle, outerAngle, outerGain } = toRefs(props);

const { camera } = useTresContext()

const positionalAudioRef = shallowRef<PositionalAudio | null>(null);
const positionalAudioHelperRef = shallowRef<PositionalAudioHelper | null>(null);
const buffer = shallowRef<AudioBuffer | null>(null);
const listener = shallowReactive<AudioListener>(new AudioListener());

buffer.value = await useLoader(AudioLoader, url.value)

watch(positionalAudioRef, () => {
    if (!positionalAudioRef?.value) return

    createHelper()
})

watch(helper, () => {
    if (helper.value) {
        createHelper()
    } else {
        disposeHelper()
    }
})

watch([distance, loop, buffer, positionalAudioRef, innerAngle, outerAngle, outerGain, ready, autoplay], () => {
    updatePositionalAudio()
})

onMounted(() => {
    camera?.value.add(listener);
})

onBeforeUnmount(() => {
    disposeAudio()

    if (helper.value) {
        disposeHelper()
    }
})

onUnmounted(() => {
    camera?.value?.remove(listener);
})

const updatePositionalAudio = () => {
    if (!positionalAudioRef.value) return

    positionalAudioRef.value.setBuffer(buffer.value)
    positionalAudioRef.value.setRefDistance(distance.value)
    positionalAudioRef.value.setLoop(loop.value)

    positionalAudioRef.value.setDirectionalCone(innerAngle.value, outerAngle.value, outerGain.value);
    positionalAudioHelperRef.value.update();

    if (autoplay.value && ready.value) playAudio()
    if (!autoplay.value && ready.value) stopAudio()
}

const createHelper = () => {
    const parent = positionalAudioRef.value?.parent
    const boxParent = new Box3().setFromObject(parent);
    const depthParent = (boxParent.max.z - boxParent.min.z) * 2

    positionalAudioHelperRef.value = new PositionalAudioHelper(positionalAudioRef.value, depthParent, 32, 32);
    positionalAudioRef.value.add(positionalAudioHelperRef.value);
}

const disposeHelper = () => {
    positionalAudioHelperRef?.value?.dispose();
    positionalAudioRef?.value?.remove(positionalAudioHelperRef?.value);
}

const playAudio = () => {
    if (!positionalAudioRef.value.isPlaying) positionalAudioRef.value.play()
}

const pauseAudio = () => {
    if (positionalAudioRef.value.isPlaying) positionalAudioRef.value.pause()
}

const stopAudio = () => {
    if (!positionalAudioRef.value) return

    positionalAudioRef.value.stop();
}

const disposeAudio = () => {
    if (!positionalAudioRef?.value) return

    stopAudio()

    const audio = positionalAudioRef.value;

    if (audio.source && (audio.source as any)._connected) {
        audio.disconnect();
    }
}

defineExpose({
    ref: positionalAudioRef,
    play: playAudio,
    stop: stopAudio,
    pause: pauseAudio
})
</script>

<template>
    <TresPositionalAudio ref="positionalAudioRef" :args="[listener]" v-bind="$attrs" />
</template>