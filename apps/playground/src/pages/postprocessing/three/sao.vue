<script lang="ts" setup>
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas, useLoop } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposer, Output, SAO } from '@tresjs/post-processing'
import { shallowRef } from 'vue'
import {
  Color,
  InstancedMesh,
  MeshStandardMaterial,
  Object3D,
  SphereGeometry,
} from 'three'

const {
  enabled,
  output,
  saoBias,
  saoIntensity,
  saoScale,
  saoKernelRadius,
  saoMinResolution,
  saoBlur,
  saoBlurRadius,
  saoBlurStdDev,
  saoBlurDepthCutoff,
} = useControls({
  enabled: true,
  output: { value: 0, min: 0, max: 2, step: 1 },
  saoBias: { value: 0.5, min: -1, max: 1, step: 0.01 },
  saoIntensity: { value: 0.18, min: 0, max: 1, step: 0.01 },
  saoScale: { value: 1, min: 0, max: 10, step: 0.1 },
  saoKernelRadius: { value: 100, min: 1, max: 100, step: 1 },
  saoMinResolution: { value: 0, min: 0, max: 1, step: 0.01 },
  saoBlur: true,
  saoBlurRadius: { value: 8, min: 0, max: 200, step: 1 },
  saoBlurStdDev: { value: 4, min: 0.5, max: 150, step: 0.5 },
  saoBlurDepthCutoff: { value: 0.01, min: 0.0, max: 0.1, step: 0.001 },
}, {
  uuid: 'postprocessing-three-sao',
})

// Create 120 random spheres as an InstancedMesh
const geometry = new SphereGeometry(3, 48, 24)
const material = new MeshStandardMaterial({ roughness: 0.5, metalness: 0 })
const spheres = new InstancedMesh(geometry, material, 120)
const dummy = new Object3D()
const color = new Color()

for (let i = 0; i < 120; i++) {
  dummy.position.set(
    Math.random() * 4 - 2,
    Math.random() * 4 - 2,
    Math.random() * 4 - 2,
  )
  dummy.rotation.set(Math.random(), Math.random(), Math.random())
  const scale = Math.random() * 0.2 + 0.05
  dummy.scale.set(scale, scale, scale)
  dummy.updateMatrix()
  spheres.setMatrixAt(i, dummy.matrix)
  color.setHSL(Math.random(), 1.0, 0.3)
  spheres.setColorAt(i, color)
}

const groupRef = shallowRef()

function RotateGroup() {
  const { onBeforeRender } = useLoop()
  onBeforeRender(({ elapsed }) => {
    if (groupRef.value) {
      groupRef.value.rotation.x = elapsed * 0.2
      groupRef.value.rotation.y = elapsed * 0.1
    }
  })
}
</script>

<template>
  <TresLeches uuid="postprocessing-three-sao" />
  <TresCanvas render-mode="always">
    <TresPerspectiveCamera
      :position="[0, 0, 7]"
      :fov="65"
      :near="3"
      :far="10"
    />
    <OrbitControls auto-rotate />

    <TresAmbientLight :color="0xFFFFFF" :intensity="0.2" />
    <TresPointLight :color="0xEFFFEF" :intensity="500" :position="[-10, -10, 10]" />
    <TresPointLight :color="0xFFEFEF" :intensity="500" :position="[-10, 10, 10]" />
    <TresPointLight :color="0xEFEFFF" :intensity="500" :position="[10, -10, 10]" />

    <TresGroup ref="groupRef">
      <primitive :object="spheres" />
    </TresGroup>

    <RotateGroup />

    <EffectComposer>
      <SAO
        :enabled="enabled"
        :output="output"
        :sao-bias="saoBias"
        :sao-intensity="saoIntensity"
        :sao-scale="saoScale"
        :sao-kernel-radius="saoKernelRadius"
        :sao-min-resolution="saoMinResolution"
        :sao-blur="saoBlur"
        :sao-blur-radius="saoBlurRadius"
        :sao-blur-std-dev="saoBlurStdDev"
        :sao-blur-depth-cutoff="saoBlurDepthCutoff"
      />
      <Output />
    </EffectComposer>
  </TresCanvas>
</template>
