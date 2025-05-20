<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { type ExposedRigidBody, Physics, RigidBody, SphericalJoint } from '@tresjs/rapier'
import { ACESFilmicToneMapping, Quaternion, SRGBColorSpace } from 'three'
import { onMounted, onUnmounted, shallowRef } from 'vue'
import type { ShallowRef } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const yRotation = shallowRef(0)
const bodyRefs = shallowRef<ShallowRef[]>(
  Array.from({ length: 10 }).map(() => shallowRef<ExposedRigidBody>()),
)
const currentInterval = shallowRef<NodeJS.Timeout | undefined>(undefined)

onMounted(() => {
  currentInterval.value = setInterval(() => {
    const body = bodyRefs.value[0].value?.[0]?.instance
    if (!body) { return }

    yRotation.value = yRotation.value + 1

    body.setNextKinematicRotation(new Quaternion(0, Math.sin(yRotation.value) * 1.5, 0, 1))
  }, 1000)
})

onUnmounted(() =>
  clearInterval(currentInterval.value),
)
</script>

<template>
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[0, 0, 30]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics debug>
        <RigidBody
          v-for="(ref, i) in bodyRefs"
          :key="i"
          :ref="ref"
          :type="i === 0 ? 'kinematic' : 'dynamic'"
          :position="[i * 1.5, 0, 0]"
          collider="ball"
        >
          <TresMesh>
            <TresSphereGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <SphericalJoint
          v-for="(ref, i) in bodyRefs"
          :key="i"
          :bodies="[ref.value?.[0]?.instance, bodyRefs[i - 1]?.value?.[0]?.instance]"
          :params="[
            [-1.1, 0, 0],
            [1.1, 0, 0],
          ]"
        />

        <RigidBody type="fixed">
          <TresMesh :position="[0, -10, 0]">
            <TresPlaneGeometry :args="[40, 40, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
