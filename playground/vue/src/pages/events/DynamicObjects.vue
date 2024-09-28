<script setup lang="ts">
import { OrbitControls, Sphere } from '@tresjs/cientos'
import { type ThreeEvent, TresCanvas } from '@tresjs/core'
import { Mesh, MeshBasicMaterial, MeshNormalMaterial, TorusGeometry } from 'three'

const sphereCount = ref(1)

const hoverMaterial = new MeshBasicMaterial({ color: 'white' })
const sphereMaterial = new MeshNormalMaterial()

const grow = (event: ThreeEvent<any>) => {
  event.currentTarget.material = hoverMaterial
}

const shrink = (event: ThreeEvent<any>) => {
  event.currentTarget.material = sphereMaterial
}

const torus = new Mesh(new TorusGeometry(0.2, 0.1), new MeshBasicMaterial({ color: 'red' }))
const primitiveAOrB = ref('a')
const msgs = ref<string[]>([])
const isTestFinished = computed(() => msgs.value.length >= 2)
const isTestPassed = computed(() => !msgs.value.some(msg => msg.startsWith('❌')))
const primitiveAClick = () => {
  if (primitiveAOrB.value === 'b') {
    msgs.value.push('❌ old primitive event handler was called')
  }
  if (!isTestFinished.value) {
    msgs.value.push('✅ primitiveA event handler was called')
    primitiveAOrB.value = 'b'
  }
}
const primitiveBPointerUp = () => {
  if (primitiveAOrB.value === 'a') {
    msgs.value.push('❌ old primitive event handler was called')
  }
  if (!isTestFinished.value) {
    msgs.value.push('✅ primitiveB event handler was called')
    primitiveAOrB.value = 'a'
  }
}
</script>

<template>
  <OverlayInfo>
    <h1>Dynamic objects with events</h1>
    <h2>Setup</h2>
    <p>The torus is a <code>primitive :object</code>. Attaching the <code>:object</code> to a different <code>primitive</code> should not fire event handlers attached by the old primitive.</p>

    <h2>Test</h2>
    <p v-if="!isTestFinished"><strong>👉 Click on the red torus</strong></p>
    <p v-else-if="isTestPassed">✅ Pass</p>
    <p v-else>❌Fail</p>
    <ul>
      <li v-for="msg, i of msgs" :key="i" :style="{ color: (n - i) % 4 === 0 ? 'gray' : 'black' }">{{ msg }}</li>
    </ul>

    <h2>Test</h2>
    <p>This test adds/removes objects with events to the scene in a <code>v-for</code>. When the pointer is over the object, it should be white. When the pointer is not over the object, it should have a "normal" material.</p>
    <button @click="sphereCount++">Add a sphere</button>
    <button @click="() => sphereCount = Math.max(0, sphereCount - 1)">Remove a sphere</button>
  </OverlayInfo>
  <TresCanvas clear-color="gray">
    <OrbitControls />
    <TresPerspectiveCamera :position="[7, 7, 7]" :look-at="[0, 0, 0]" />
    <TresAmbientLight :args="['white', 0.5]" />
    <Sphere
      v-for="_, index in Array.from({ length: sphereCount })"
      :key="index"
      :scale="0.1"
      :position="[Math.cos(index * 0.5) * (1 + index * 0.1), 0, Math.sin(index * 0.5) * (1 + index * 0.1)]"
      :material="sphereMaterial"
      @click="console.log('click', index)"
      @pointerenter="grow"
      @pointerleave="shrink"
    />
    <primitive v-if="primitiveAOrB === 'a' && !isTestFinished" :object="torus" @click="primitiveAClick" />
    <primitive v-if="primitiveAOrB === 'b' && !isTestFinished" :position-y="0.5" :object="torus" @pointerup="primitiveBPointerUp" />
  </TresCanvas>
</template>
