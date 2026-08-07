<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { InstancedRigidBody, Physics } from '@tresjs/rapier'
import { useControls } from '@tresjs/leches'
import LittleBoxForDemos from './LittleBoxForDemos.vue'
import { DynamicDrawUsage, Matrix4, MeshStandardMaterial, SphereGeometry } from 'three'

const instanceRef = shallowRef()
const instancedRigidBodyRef = shallowRef()
const sphereKnots = new SphereGeometry(0.25, 32, 32)
const sphereKnotsMaterial = new MeshStandardMaterial({
  color: '#5672cd',
})

const scatterInstances = (mesh: any) => {
  for (let i = 0; i < mesh.count; i++) {
    const x = (Math.random() - 0.5) * 5
    const y = (Math.random() * 2) + 5
    const z = (Math.random() - 0.5) * 5

    mesh.setMatrixAt(i, new Matrix4().makeTranslation(x, y, z))
  }
  mesh.instanceMatrix.needsUpdate = true
}

const controlDefaults = {
  debug: false,
}

const controls = useControls(
  {
    resetBtn: {
      label: 'Reset',
      type: 'button',
      onClick: () => {
        resetControls(controls, controlDefaults)

        const contexts = instancedRigidBodyRef.value?.contexts
        if (!contexts?.length) { return }

        for (const context of contexts) {
          resetRigidBody(context.rigidBody, {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() * 2) + 5,
            z: (Math.random() - 0.5) * 5,
          })
        }
      },
    },
    debug: controlDefaults.debug,
  },
  { uuid: inject(`uuid`) },
)

const { debug } = controls

watch(instanceRef, (mesh) => {
  mesh?.instanceMatrix.setUsage(DynamicDrawUsage)

  if (mesh) {
    scatterInstances(mesh)
  }
})
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[15, 15, 15]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics :debug="debug">
        <InstancedRigidBody ref="instancedRigidBodyRef" collider="ball" :args="[0.25]" :restitution="0.5">
          <TresInstancedMesh ref="instanceRef" :args="[sphereKnots, sphereKnotsMaterial, 750]" />
        </InstancedRigidBody>
        <LittleBoxForDemos />
      </Physics>
    </Suspense>
    <TresDirectionalLight :position="[1, 2, 3]" />
    <TresAmbientLight :intensity="0.5" />
  </TresCanvas>
</template>
