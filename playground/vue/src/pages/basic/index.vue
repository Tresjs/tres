<script setup lang="ts">
import type { ThreeEvent } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { BasicShadowMap, BoxGeometry, CylinderGeometry, Euler, MathUtils, MeshToonMaterial, NoToneMapping, SphereGeometry, SRGBColorSpace, Vector3 } from 'three'
import { reactive, ref } from 'vue'

const lerp = MathUtils.lerp
const clamp = MathUtils.clamp

const state = reactive({
  clearColor: '#1e1f22',
  shadows: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
})

const COUNT = 2000

const brownian = (stepSize: number, xMin: number, xMax: number, yMin: number, yMax: number, zMin: number, zMax: number) => {
  let x = 0; let y = 0; let z = 0
  const r = () => (Math.random() - 0.5) * 2 * stepSize
  const isInBounds = () => xMin < x && x < xMax && yMin < y && y < yMax && zMin < z && z < zMax
  const reset = () => {
    x = lerp(xMin, xMax, Math.random())
    y = lerp(yMin, yMax, Math.random())
    z = lerp(zMin, zMax, Math.random())
  }
  reset()
  return () => {
    x += r()
    y += r()
    z += r()
    if (!isInBounds()) { reset() }
    return [x, y, z]
  }
}

const getPosition = brownian(2, -60, 60, -40, 40, -30, 0)
const getRotation = brownian(1, -20, 20, -10, 10, -20, 0)
const cubePositions = Array.from({ length: COUNT }).map(() => new Vector3(...getPosition()))
const cubeRotations = Array.from({ length: COUNT }).map(() => new Euler(...getRotation()))

const canvasRef = ref()

const pyramidRef = shallowRef({ position: new Vector3(), scale: new Vector3(1, 1, 1) })
const boxRef = shallowRef({ position: new Vector3(), scale: new Vector3(1, 1, 1) })
const sphereRef = shallowRef({ position: new Vector3(), scale: new Vector3(1, 1, 1) })

const sphereExists = ref(true)

const whiteMaterial = new MeshToonMaterial({ color: '#f8f8f8' })
const orangeMaterial = new MeshToonMaterial({ color: '#eeac35' })
const blueMaterial = new MeshToonMaterial({ color: '#7fdac6' })
const grayMaterial = new MeshToonMaterial({ color: '#1e1f22' })
const hoverMaterial = new MeshToonMaterial({ color: '#ffff00' })

const sphereGeometry = new SphereGeometry()
const cubeGeometry = new BoxGeometry()
const pyramidGeometry = new CylinderGeometry(0, 0.6, 1)

function onPointerEnter(ev: ThreeEvent<PointerEvent>) {
  if (ev.eventObject.material !== hoverMaterial) {
    ev.eventObject.userData.material = ev.eventObject.material
  }
  ev.eventObject.material = hoverMaterial
}

function onPointerLeave(ev: ThreeEvent<PointerEvent>) {
  ev.eventObject.material = ev.eventObject.userData.material ?? grayMaterial
}

const { onLoop } = useRenderLoop()
const PI = Math.PI
onLoop(({ elapsed }) => {
  elapsed = elapsed * 3 + 7
  pyramidRef.value.position.y = Math.tan(clamp((1 + elapsed) % 9, 0, PI))
  boxRef.value.position.y = Math.tan(clamp((0.5 + elapsed) % 9, 0, PI))
  sphereRef.value.position.y = Math.tan(clamp(elapsed % 9, 0, PI))

  const scale0 = Math.abs(Math.cos(clamp((1 + elapsed) % 9, 0, PI)))
  const scale1 = Math.abs(Math.cos(clamp((0.5 + elapsed) % 9, 0, PI)))
  const scale2 = Math.abs(Math.cos(clamp(elapsed % 9, 0, PI)))
  pyramidRef.value.scale.set(scale0, scale0, scale0)
  boxRef.value.scale.set(scale1, scale1, scale1)
  sphereRef.value.scale.set(scale2, scale2, scale2)

  // NOTE: Update events without needing the mouse to move
  canvasRef.value?.context?.eventManager?.forceUpdate()
})
</script>

<template>
  <OverlayInfo>
    <h1>Basic</h1>
    <p>This is a basic scene with basic elements.</p>
    <h2>Setup</h2>
    <p>The scene includes:</p>
    <ul>
      <li>Objects updated in <code>useLoop</code></li>
      <li>Objects with <code>pointer{enter,leave}</code></li>
      <li>Objects created using <code>v-for</code></li>
      <li>Basic geometries, materials</li>
      <li>Grouping/parenting</li>
      <li><code>OrbitControls</code></li>
    </ul>
    <h2>Preview</h2>
    <img src="data:image/png;base64,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" />
  </OverlayInfo>
  <TresCanvas
    v-if="sphereExists"
    ref="canvasRef"
    v-bind="state"
  >
    <TresPerspectiveCamera
      :position="[0, 0, 22]"
      :fov="45"
      :near="0.1"
      :far="1000"
      :look-at="[0, 5, 0]"
    />
    <OrbitControls />
    <TresAmbientLight :intensity="0.5" />

    <TresGroup>
      <TresMesh
        ref="pyramidRef"
        :material="blueMaterial"
        :position="[-1.5, 0, 0]"
        @pointer-enter="onPointerEnter"
        @pointer-leave="onPointerLeave"
      >
        <TresCylinderGeometry :args="[0, 0.60, 1]" />
      </TresMesh>
      <TresMesh
        ref="boxRef"
        cast-shadow
        :material="whiteMaterial"
        @pointer-enter="onPointerEnter"
        @pointer-leave="onPointerLeave"
      >
        <TresBoxGeometry />
      </TresMesh>

      <TresMesh
        ref="sphereRef"
        :visible="sphereExists"
        :position="[1.5, 0, 0]"
        cast-shadow
        :material="orangeMaterial"
        @pointer-enter="onPointerEnter"
        @pointer-out="onPointerLeave"
      >
        <TresSphereGeometry :args="[0.5, 32, 32]" />
      </TresMesh>
    </TresGroup>

    <TresGroup :position="[0, 0, -30]">
      <TresMesh
        v-for="position, i of cubePositions"
        :key="i"
        :geometry="[sphereGeometry, cubeGeometry, pyramidGeometry][i % 3]"
        :material="grayMaterial"
        :position="position"
        :rotation="cubeRotations[i]"
        @pointer-enter="onPointerEnter"
        @pointer-leave="onPointerLeave"
      />
    </TresGroup>

    <TresDirectionalLight
      :position="[0, 8, 4]"
      :intensity="0.7"
      cast-shadow
    />
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="1"
      cast-shadow
    />
  </TresCanvas>
</template>
