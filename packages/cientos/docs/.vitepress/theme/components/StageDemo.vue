<script setup lang="ts">
import { OrbitControls, Stage } from '@tresjs/cientos'
import { type LoaderProto, TresCanvas, useLoader } from '@tresjs/core'
import type { Mesh, Object3D } from 'three'
import { type GLTF, GLTFLoader } from 'three-stdlib'

const scene = await useLoader(GLTFLoader as LoaderProto<GLTF>, 'https://raw.githubusercontent.com/Tresjs/assets/215208b4a54736965d525ab9c47d82dbfe4b2a02/models/gltf/suzanne/suzanne.glb') as unknown as { nodes: { Suzanne: Object3D } }
const suzanne = scene.nodes.Suzanne as Mesh
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[0, 5, 15]" />
    <OrbitControls make-default />
    <Stage
      :adjust-camera="0.05"
      :shadows="{ type: 'contact', color: '#012' }"
      :align="{ top: true, disableX: true }"
      :rotation-y="0.5"
    >
      <Suspense>
        <primitive
          :object="suzanne"
          :rotation="[5.6548, Math.PI, 0]"
          :position="[0, 0.90, 1]"
        >
          <TresMeshStandardMaterial color="#fbb03b" :metalness="1" :roughness="0" />
        </primitive>
      </Suspense>

      <TresMesh
        :position="[-1.75, 0.25, 1.25]"
        :scale="0.5"
      >
        <TresBoxGeometry />
        <TresMeshStandardMaterial color="#4f4f4f" />
      </TresMesh>

      <TresMesh :position="[-1.65, 1, -1.5]">
        <TresSphereGeometry />
        <TresMeshStandardMaterial color="#82dbc5" />
      </TresMesh>
    </Stage>
  </TresCanvas>
</template>
