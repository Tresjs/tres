<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { CuboidCollider, Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, MeshNormalMaterial, SRGBColorSpace } from 'three'
import { onMounted, shallowRef } from 'vue'
import type { Mesh } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const bodyContextRef = shallowRef()
const ballRef = shallowRef<Mesh>()

const onIntersection1Enter = () => {
  if (ballRef.value?.material instanceof MeshNormalMaterial) {
    ballRef.value.material.visible = false
  }
}

const onIntersection2Enter = () => {
  if (ballRef.value?.material instanceof MeshNormalMaterial) {
    ballRef.value.material.colorWrite = false
  }
}

const onIntersection3Enter = () => {
  if (ballRef.value?.material instanceof MeshNormalMaterial) {
    ballRef.value.material.wireframe = true
  }
}

const onIntersectionExit = () => {
  if (ballRef.value?.material instanceof MeshNormalMaterial) {
    ballRef.value.material.visible = true
    ballRef.value.material.colorWrite = true
    ballRef.value.material.wireframe = false
  }
}

const resetBall = () => {
  bodyContextRef.value?.instance?.setAngvel({ x: -2, y: 0, z: 0 }, true)
  bodyContextRef.value?.instance?.setLinvel({ x: 0, y: 0, z: -8 }, true)
  bodyContextRef.value?.instance?.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true)
  bodyContextRef.value?.instance?.setTranslation({ x: 0, y: 0, z: 0 }, true)
}

onMounted(() => {
  setTimeout(() => {
    resetBall()

    setInterval(() => {
      resetBall()
    }, 3000)
  }, 100)
})
</script>

<template>
  <TresCanvas v-bind="gl" >
    <TresPerspectiveCamera :position="[-30, 8, -10]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics debug>
        <RigidBody ref="bodyContextRef" collider="ball">
          <TresMesh ref="ballRef" :position="[0, 8, 8]" name="ball">
            <TresSphereGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody
          type="fixed"
          activeCollision
          sensor
          @intersection-enter="onIntersection2Enter"
          @intersection-exit="onIntersectionExit"
        >
          <TresMesh :position="[0, 5, 0]">
            <TresBoxGeometry :args="[10, 10, 0.5]" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>

          <CuboidCollider
            :args="[10, 3, 0.5]"
            :position="[0, 3, 3]"
            activeCollision
            sensor
            @intersection-enter="onIntersection1Enter"
            @intersection-exit="onIntersectionExit"
          />

          <CuboidCollider
            :args="[10, 3, 0.5]"
            :position="[0, 3, -3]"
            activeCollision
            sensor
            @intersection-enter="onIntersection3Enter"
            @intersection-exit="onIntersectionExit"
          />
        </RigidBody>

        <RigidBody type="fixed" name="fixedFloor" :restitution="0.2">
          <TresMesh :position="[0, 0, 0]">
            <TresPlaneGeometry :args="[20, 20, 1]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
