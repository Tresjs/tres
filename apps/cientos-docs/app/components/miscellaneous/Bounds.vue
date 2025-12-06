<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Bounds, OrbitControls } from '@tresjs/cientos'
import { shallowRef } from 'vue'

const boundsRef = shallowRef()
const objectRef = shallowRef()

function focusObject() {
  boundsRef.value?.instance.lookAt(objectRef.value)
}
</script>

<template>
  <div class="aspect-video">
    <TresCanvas>
      <TresPerspectiveCamera :position="[0, 2, 5]" />
      <OrbitControls make-default />
      <Bounds ref="boundsRef" clip use-mounted :offset="0.75">
        <TresMesh ref="objectRef" @click="(e) => focusObject()">
          <TresBoxGeometry />
          <TresMeshNormalMaterial />
        </TresMesh>
      </Bounds>
    </TresCanvas>
  </div>
</template>
