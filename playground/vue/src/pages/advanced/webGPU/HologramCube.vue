<script setup lang="ts">
import {
  add,
  cameraProjectionMatrix,
  cameraViewMatrix,
  color,
  Fn,
  hash,
  mix,
  normalView,
  positionWorld,
  sin,
  timerGlobal,
  uniform,
  varying,
  vec3,
  vec4,
} from 'three/tsl'
import {
  AdditiveBlending,
  BoxGeometry,
  DoubleSide,
  Mesh,
  MeshBasicNodeMaterial,
} from 'three/webgpu'

/**
 * Material
 */
const material = new MeshBasicNodeMaterial({
  transparent: true,
  side: DoubleSide,
  depthWrite: false,
  blending: AdditiveBlending,
})

const model = new Mesh(new BoxGeometry(1, 1, 1), material)
// Position
const glitchStrength = varying(0)

material.vertexNode = Fn(() => {
  const glitchTime = timerGlobal().sub(positionWorld.y.mul(0.5))

  glitchStrength.assign(
    add(sin(glitchTime), sin(glitchTime.mul(3.45)), sin(glitchTime.mul(8.76)))
      .div(3)
      .smoothstep(0.3, 1),
  )

  const glitch = vec3(
    hash(positionWorld.xz.abs().mul(9999)).sub(0.5),
    0,
    hash(positionWorld.yx.abs().mul(9999)).sub(0.5),
  )

  positionWorld.xyz.addAssign(glitch.mul(glitchStrength.mul(0.5)))

  return cameraProjectionMatrix.mul(cameraViewMatrix).mul(positionWorld)
})()

// Color
const colorInside = uniform(color('#ff6088'))
const colorOutside = uniform(color('#4d55ff'))

material.colorNode = Fn(() => {
  const stripes = positionWorld.y.sub(timerGlobal(0.02)).mul(20).mod(1).pow(3)

  const fresnel = normalView
    .dot(vec3(0, 0, 1))
    .abs()
    .oneMinus()
  const falloff = fresnel.smoothstep(0.8, 0.2)
  const alpha = stripes.mul(fresnel).add(fresnel.mul(1.25)).mul(falloff)
  const finalColor = mix(colorInside, colorOutside, fresnel.add(glitchStrength.mul(0.6)))

  return vec4(finalColor, alpha)
})()
</script>

<template>
  <primitive :object="model" />
</template>
