<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { InstanceRigidBody, Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, DynamicDrawUsage, Matrix4, MeshNormalMaterial, SRGBColorSpace, TorusKnotGeometry } from 'three'
import { shallowRef, watch } from 'vue'
import type { InstancedMesh } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const instanceRBRef = shallowRef<InstancedMesh>()

watch(instanceRBRef, (IRB) => {
  // eslint-disable-next-line no-console
  console.log('jaime ~ IRB:', IRB)
})

const torusInstancedMesh = shallowRef<InstancedMesh>()

const torusKnots = new TorusKnotGeometry()
const torusKnotsMaterial = new MeshNormalMaterial()

watch(torusInstancedMesh, (mesh) => {
  mesh?.instanceMatrix.setUsage(DynamicDrawUsage)

  if (mesh) {
    for (let i = 0; i < mesh.count; i++) {
      const x = (Math.random() - 0.5) * 5
      const y = ((Math.random()) * 2) + 5
      const z = (Math.random() - 0.5) * 5

      mesh.setMatrixAt(
        i,
        new Matrix4().makeTranslation(x, y, z),
      )
    }
    mesh.instanceMatrix.needsUpdate = true
  }
})
</script>

<template>
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[11, 11, 11]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics debug>
        <InstanceRigidBody ref="instanceRBRef" collider="hull">
          <TresInstancedMesh ref="torusInstancedMesh" :args="[torusKnots, torusKnotsMaterial, 3]" />
        </InstanceRigidBody>

        <RigidBody>
          <TresMesh :position="[0, 8, 0]">
            <TresTorusGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>

          <TresMesh :position="[0, 5, 0]">
            <TresBoxGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody v-for="ball in [1, 2, 3, 4, 5, 6, 7] " :key="ball" collider="ball">
          <TresMesh :position="[Math.random() * 2, Math.random() * 2 + 8, Math.random() * 2]">
            <TresSphereGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed">
          <TresMesh :position="[0, 0, 0]">
            <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
