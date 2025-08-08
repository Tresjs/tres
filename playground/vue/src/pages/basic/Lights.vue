<script setup lang="ts">
import type { TresObject } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas, useRenderLoop, vLightHelper } from '@tresjs/core'
import { BasicShadowMap, MeshStandardMaterial, NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: 'black',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const planeRef: Ref<TresObject | null> = ref(null)

const whiteMaterial = new MeshStandardMaterial({ color: '#f8f8f8' })
const orangeMaterial = new MeshStandardMaterial({ color: '#eeac35' })
const blueMaterial = new MeshStandardMaterial({ color: '#7fdac6' })

const z = ref(0)
useRenderLoop().onLoop(({ elapsed }) => {
  z.value = Math.sin(elapsed)
})

const previewSrc = 'data:image/png;base64,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'
</script>

<template>
  <OverlayInfo>
    <h1>Lights</h1>
    <h2>Setup</h2>
    <p>In this scene, there are:</p>
    <ul>
      <li>3 meshes</li>
      <li>3 lights</li>
      <li>a ground plane</li>
    </ul>

    <p>Lights are, left to right:</p>
    <ul>
      <li>PointLight</li>
      <li>SpotLight</li>
      <li>DirectionalLight</li>
    </ul>
    <p>All lights have helpers.</p>

    <h2>Preview</h2>
    <img :src="previewSrc" />

    <h2>Notes</h2>
    <p>At the time of this writing: SpotLight's helper is difficult to see and very large.</p>
  </OverlayInfo>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 3, 15]" />
    <OrbitControls />

    <TresGroup :position-y="2" :position-z="z">
      <TresPointLight
        v-light-helper
        :position="[-2, 0, 0]"
        :intensity="400"
        color="blue"
        cast-shadow
      />

      <TresSpotLight
        v-light-helper
        :look-at="[0, 0, 0]"
        :intensity="400"
        color="#FF0000"
      />

      <TresDirectionalLight
        v-light-helper
        :position="[2, 0, 0]"
        :intensity="3.14"
        color="green"
        cast-shadow
      />
    </TresGroup>

    <TresGroup :position-y="1">
      <TresMesh
        :material="blueMaterial"
        cast-shadow
        receive-shadow
        :position="[-1.5, 0, 0]"
      >
        <TresCylinderGeometry :args="[0, 0.60, 1]" />
      </TresMesh>
      <TresMesh
        cast-shadow
        receive-shadow
        :material="whiteMaterial"
      >
        <TresBoxGeometry />
      </TresMesh>

      <TresMesh
        :position="[1.5, 0, 0]"
        cast-shadow
        receive-shadow
        :material="orangeMaterial"
      >
        <TresSphereGeometry :args="[0.5, 32, 32]" />
      </TresMesh>
    </TresGroup>

    <TresMesh
      ref="planeRef"
      :rotation="[-Math.PI / 2, 0, 0]"
      receive-shadow
    >
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshStandardMaterial color="black" />
    </TresMesh>
  </TresCanvas>
</template>
