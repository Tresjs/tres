<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { Perf, TresLeches, useControls } from '@tresjs/leches'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import AsyncComponent from './AsyncComponent.vue'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { show } = useControls({
  show: true,
})

const ctx = ref(null)

watchEffect(() => {
  if (!ctx.value) {
    return
  }
  // eslint-disable-next-line no-console
  console.log('ctx', ctx.value)
})

useControls({
  button: {
    label: 'Render dispose',
    type: 'button',
    onClick() {
      ctx?.value?.dispose()
    },
  },
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl" ref="ctx">
    <Perf />
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Suspense>
      <AsyncComponent v-if="show" />
    </Suspense>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
  <OverlayInfo>
    <h1>Suspense</h1>
    <p>
      Because the model in this page is loaded asynchronously behind the scenes
      with <code>useGLTF</code>, it must be wrapped in a Suspense component.
    </p>
  </OverlayInfo>
</template>
