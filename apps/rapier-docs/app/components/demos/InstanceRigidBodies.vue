<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
import { Physics, InstancedRigidBody } from "@tresjs/rapier";
import { useControls } from "@tresjs/leches";
import LittleBoxForDemos from "./LittleBoxForDemos.vue";
import { SphereGeometry, MeshStandardMaterial, DynamicDrawUsage, Matrix4 } from "three";

const { debug } = useControls(
  {
    debug: false,
  },
  { uuid: inject(`uuid`) }
);

const instanceRef = shallowRef()
const sphereKnots = new SphereGeometry(0.25, 32, 32)
const sphereKnotsMaterial = new MeshStandardMaterial({
  color: '#5672cd',
})

watch(instanceRef, (mesh) => {
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
    <TresPerspectiveCamera :position="[15, 15, 15]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics :debug="debug">
        <InstancedRigidBody collider="ball" :args="[0.25]" :restitution="0.5">
          <TresInstancedMesh ref="instanceRef" :args="[sphereKnots, sphereKnotsMaterial, 750]" />
        </InstancedRigidBody>
        <LittleBoxForDemos />
      </Physics>
    </Suspense>
    <TresDirectionalLight :position="[1, 2, 3]" />
    <TresAmbientLight :intensity="0.5" />
  </TresCanvas>
</template>
