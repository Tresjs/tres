<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import AsyncComponent from './AsyncComponent.vue'
import '@tresjs/leches/styles'

const ctx = ref(null)

const { show } = useControls({
  show: true,
  button: {
    label: 'Render dispose',
    type: 'button',
    onClick() {
      ctx?.value?.renderer?.instance?.value?.dispose()
    },
  },
})

watchEffect(() => {
  if (!ctx.value) {
    return
  }
  // eslint-disable-next-line no-console
  console.log('ctx', ctx.value)
})
</script>

<template>
  <TresLeches />
  <TresCanvas ref="ctx" clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[7, 7, 7]" />
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
