<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import type { Group, Material } from 'three'
import { BoxGeometry, Color, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
import { onUnmounted, ref } from 'vue'

const toggleMax = 400
const numObjectsMax = 2000
const startTimeMS = ref(0)
const width = 900
const height = 600
const toggleCount = ref(0)
const showTres = ref(false)
const showVueThree = ref(false)
const msg = ref('Click Start Test to begin.')
const r = ref(null)

let intervalId: ReturnType<typeof setInterval>
const testVueThree = (() => {
  let renderer: WebGLRenderer | null = null
  let scene: Scene | null = null
  let camera: PerspectiveCamera | null = null
  let frameCount = 0
  function testVueThree() {
    if (toggleCount.value < toggleMax) {
      if (r.value) {
        if (renderer) {
          if (frameCount < 2) {
            frameCount++
            renderer.render(scene!, camera!)
          }
          else {
            camera?.removeFromParent()
            scene!.children.forEach((m) => { ((m as Mesh).material as Material).dispose(); (m as Mesh).geometry.dispose() })
            renderer.dispose()
            frameCount = 0
            camera = null
            scene = null
            renderer = null
            showVueThree.value = false
            toggleCount.value++
          }
        }
        else {
          renderer = new WebGLRenderer({ canvas: r.value })
          renderer.setSize(width, height)
          renderer.setClearColor(new Color('#EEE'))
          scene = new Scene()
          camera = new PerspectiveCamera()
          camera.position.x = 10
          camera.position.y = 10
          camera.lookAt(new Vector3(0, 0, 0))
          for (let i = 0; i < numObjectsMax; i++) {
            scene.add(new Mesh(new BoxGeometry(), new MeshBasicMaterial()))
          }
          scene.add(camera)
          renderer.render(scene, camera)
        }
      }
      else if (!showVueThree.value) {
        showVueThree.value = true
      }
    }
    else {
      const elapsedSec = (Date.now() - startTimeMS.value) / 1000
      msg.value = `Plain Vue/THREE test completed in ${elapsedSec} seconds.`
      clearInterval(intervalId)
    }
  }
  return testVueThree
})()
const testTres = (() => {
  let frameCount = 0
  return () => {
    if (toggleCount.value < toggleMax) {
      if (r.value && frameCount < 2) {
        // NOTE: Wait until Tres has actually rendered before
        // removing the canvas.
        ((r.value as Group).children[0] as Mesh).onAfterRender = () => { frameCount++ }
      }
      else {
        if (frameCount < 1) {
          showTres.value = true
        }
        else {
          toggleCount.value++
          showTres.value = false
          frameCount = 0
        }
      }
    }
    else {
      const elapsedSec = (Date.now() - startTimeMS.value) / 1000
      msg.value = `Tres test completed in ${elapsedSec} seconds.`
      clearInterval(intervalId)
    }
  }
})()
const isStarted = ref(false)
const startTestTres = () => {
  isStarted.value = true
  startTimeMS.value = Date.now()
  // NOTE: Using `setInterval`; it typically will keep
  // running in situations were `requestAnimationFrame` will pause.
  intervalId = setInterval(testTres, 1000 / 60)
  msg.value = 'Test is running...'
}
const startTestVueThree = () => {
  isStarted.value = true
  startTimeMS.value = Date.now()
  // NOTE: Using `setInterval`; it typically will keep
  // running in situations were `requestAnimationFrame` will pause.
  intervalId = setInterval(testVueThree, 1000 / 60)
  msg.value = 'Test is running...'
}
onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <OverlayInfo>
    <h1>Memory test: Canvases with objects – Tres vs Plain Vue/THREE</h1>
    <p><span style="color: red">IMPORTANT</span> Epileptic warning: the tests run on this page cause the screen to flash rapidly.</p>
    <h2>Setup</h2>
    <p>This test will create and remove {{ toggleMax }} canvas instances with {{ numObjectsMax }} objects/materials/geometries each.</p>
    <h2>Note</h2>
    <ul>
      <li>These tests are intended to help spot memory leaks.</li>
      <li>Faster/slower test duration does not indicate a problem.</li>
    </ul>
    <h2>Status</h2>
    <p>{{ msg }}</p>
    <p>Number of canvases created: {{ toggleCount }} / {{ toggleMax }}</p>
    <button
      v-if="!isStarted"
      style="padding: 8px 16px; margin-top: 10px;"
      @click="startTestTres"
    >
      Start Tres test
    </button>

    <button
      v-if="!isStarted"
      style="padding: 8px 16px; margin-top: 10px;"
      @click="startTestVueThree"
    >
      Start plain Vue/THREE test
    </button>
  </OverlayInfo>
  <div v-if="showTres" :style="{ width: `${width}px`, height: `${height}px` }">
    <TresCanvas clear-color="#EEE">
      <TresGroup ref="r">
        <TresMesh v-for="_, i of Array.from({ length: numObjectsMax })" :key="i">
          <TresMeshBasicMaterial />
          <TresBoxGeometry />
        </TresMesh>
      </TresGroup>
    </TresCanvas>
  </div>
  <div v-if="showVueThree">
    <canvas ref="r" clear-color="black"></canvas>
  </div>
</template>
