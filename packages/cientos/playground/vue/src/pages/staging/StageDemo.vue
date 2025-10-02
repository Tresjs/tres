<script setup lang="ts">
import { Grid, OrbitControls, Stage } from '@tresjs/cientos'
import type { LoaderProto } from '@tresjs/core'
import { TresCanvas, useLoader } from '@tresjs/core'
import type { Object3D } from 'three'
import { Mesh, MeshStandardMaterial, NoToneMapping, SRGBColorSpace } from 'three'
import type { GLTF } from 'three-stdlib'
import { GLTFLoader } from 'three-stdlib'

const controlsOptions = {
  lighting: ['rembrandt', 'portrait', 'upfront', 'soft', null, undefined, true, false, { main: [1, 1, 1], fill: [0, -1, 0] }],
  intensity: [0.5, 0, 1, 2, 1000],
  shadows: [
    'contact',
    { type: 'contact', offset: 0.2 },
    'accumulative',
    { type: 'accumulative', alphaTest: 1 },
    { type: 'accumulative', alphaTest: 0.5, ambient: 0 },
    { type: 'accumulative', alphaTest: 0.5, ambient: 1 },
    null,
    undefined,
    true,
    false,
  ],
  adjustCamera: [true, false, 0, 0.5, 1, 2, 5],
  environment: ['city', { preset: 'city', blur: 1 }, 'umbrellas', { preset: 'night' }, null, undefined],
  align: [
    { top: true },
    undefined,
    { top: true, disableX: true },
    { bottom: true, disableZ: true },
  ],
  enabled: [true, false],
  test_torusKnotEnabled: [false, true],
  test_giantTorusKnotEnabled: [false, true],
} as const

const controls = Object.entries(controlsOptions).reduce((acc, [k, v]) => { acc[k] = { options: v, selected: shallowRef(v[0]) }; return acc }, {})

const gl = {
  clearColor: '#82DBC5',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
  shadows: true,
}

const scene = await useLoader(GLTFLoader as LoaderProto<GLTF>, 'https://raw.githubusercontent.com/Tresjs/assets/215208b4a54736965d525ab9c47d82dbfe4b2a02/models/gltf/suzanne/suzanne.glb') as unknown as { nodes: { Suzanne: Object3D } }

const nodes = scene.nodes

nodes.Suzanne.traverse((obj) => {
  if (obj instanceof Mesh) {
    obj.material = new MeshStandardMaterial({ color: '#fbb03b', metalness: 1, roughness: 0 })
  }
})

const onChange = (e: Event) => {
  const id = e.target!.id
  const i = e.target!.selectedIndex
  controls[id].selected.value = controls[id].options[i]
}
</script>

<template>
  <OverlayInfo>
    <h1>Stage</h1>
    <h2>Props</h2>
    <template
      v-for="[title, { options }] of Object.entries(controls)"
      :key="title"
    >
      <h3>{{ title }}</h3>
      <select :id="title" :name="title" @change="onChange">
        <option
          v-for="option, i of options"
          :key="i"
          :value="option"
        >
          <template v-if="option === null">null</template>
          <template v-else-if="option === undefined">undefined</template>
          <template v-else>{{ option }}</template>
        </option>
      </select>
      <br />
    </template>
  </OverlayInfo>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 5, 15]" />
    <OrbitControls make-default />
    <Stage
      v-if="controls.enabled.selected.value"
      :adjust-camera="controls.adjustCamera.selected.value"
      :align="controls.align.selected.value"
      :lighting="controls.lighting.selected.value"
      :shadows="controls.shadows.selected.value"
      :environment="controls.environment.selected.value"
      :intensity="controls.intensity.selected.value"
    >
      <TresGroup>
        <Suspense>
          <primitive
            :object="nodes.Suzanne"
            :rotation="[5.6548, Math.PI, 0]"
            :position="[0, 0.90, 1]"
            cast-shadow
          />
        </Suspense>

        <TresMesh cast-shadow :position="[1.5, 0.5, -1.5]">
          <TresBoxGeometry />
          <TresMeshStandardMaterial color="#82dbc5" />
        </TresMesh>

        <TresMesh cast-shadow :position="[-1.5, 1, -1.5]">
          <TresSphereGeometry />
          <TresMeshStandardMaterial color="#4f4f4f" />
        </TresMesh>

        <TresMesh
          v-if="controls.test_torusKnotEnabled.selected.value"
          :position="[3, 2, 1]"
          cast-shadow
        >
          <TresTorusKnotGeometry />
          <TresMeshNormalMaterial />
        </TresMesh>

        <TresMesh
          v-if="controls.test_giantTorusKnotEnabled.selected.value"
          :scale="10"
          :position="[0, 0, -20]"
        >
          <TresTorusKnotGeometry />
          <TresMeshNormalMaterial />
        </TresMesh>
      </TresGroup>
    </Stage>
    <Grid :position-y="0.01" :scale="10" :section-size="0.1" section-color="#4f4f6f" :cell-size="0.025" infinite-grid :fade-distance="8" :fade-from="0" />
    <TresAmbientLight :intensity="0.5" />
  </TresCanvas>
</template>
