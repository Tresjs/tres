<script setup lang="ts">
import type { ShaderToyMuseumState } from './const'

const uuid = 'shadertoy-museum-experiment'

useControls('fpsgraph', {
  uuid,
})

const state: ShaderToyMuseumState = reactive({
  title: 'Shadertoy Museum Lab',
  author: 'andretchen0',
  description: 'Inspired by Cineshader, ShaderToy.com shaders applied to meshes using TresJS.',
  i: -1,
  shaderToyTargets: [],
  next: () => {
    state.i++
    if (state.i >= state.shaderToyTargets.length) {
      state.i = 0
    }
  },
})


useControls({
  next: {
    type: 'button',
    label: 'Next',
    onClick: () => {
      state.next()
    }
  }
}, {
  uuid,
})

provide('state', state)


watch(state.shaderToyTargets, (newShaderToyTargets) => {
  if (newShaderToyTargets.length > 0) {
    // state.next()
  }
}, { immediate: true })

const shaderToyTarget = computed(() => state.shaderToyTargets[state.i])

watch(shaderToyTarget, (newShaderToyTarget) => {
  if (newShaderToyTarget) {
    state.title = newShaderToyTarget.title
    state.author = newShaderToyTarget.author
    state.description = newShaderToyTarget.description
    state.href = newShaderToyTarget.href
  }
}, { immediate: true })

onMounted(
  () => {
    setTimeout(() => {
      state.next()
    }, 3000)
  }
)
</script>

<template>
  <!--   <ClientOnly>
    <TresLeches :uuid="uuid" />
  </ClientOnly> -->
  <TresCanvas :clear-color="'#000000'" :antialias="false">
    <!-- TODO: Add experiment scene objects -->
    <ShadertoyMuseumExperiment />
    <TheScreenshot />
  </TresCanvas>
  <ShadertoyMuseumTextUi />
</template>