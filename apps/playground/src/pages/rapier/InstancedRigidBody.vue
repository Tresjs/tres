<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { InstancedRigidBody, Physics, RigidBody } from '@tresjs/rapier'
import { DynamicDrawUsage, Matrix4, MeshNormalMaterial, TorusKnotGeometry } from 'three'
import { shallowRef, watch } from 'vue'
import type { InstancedMesh } from 'three'

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
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[11, 11, 11]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics debug>
        <InstancedRigidBody collider="hull">
          <TresInstancedMesh ref="torusInstancedMesh" :args="[torusKnots, torusKnotsMaterial, 3]" />
        </InstancedRigidBody>

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
