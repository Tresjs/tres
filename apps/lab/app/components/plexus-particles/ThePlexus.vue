<script setup lang="ts">
import { Plane, Raycaster, Vector2, Vector3 } from 'three'
import { PostProcessing } from 'three/webgpu'
import type { Renderer } from 'three/webgpu'
import { pass } from 'three/tsl'
import { bloom } from 'three/addons/tsl/display/BloomNode.js'
import { useLoop, useTresContext } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { createPlexus } from './tsl/plexus'
import * as U from './tsl/uniforms'

const { scene, camera, renderer } = useTresContext()
const { onBeforeRender, render } = useLoop()

const plexus = createPlexus()

const {
  timeScale: cTimeScale,
  spawnRate: cSpawnRate,
  size: cSize,
  lifetime: cLifetime,
  linksWidth: cLinksWidth,
  colorVariance: cColorVariance,
  colorRotationSpeed: cColorRotation,
  turbFriction: cTurbFriction,
  turbFrequency: cTurbFrequency,
  turbAmplitude: cTurbAmplitude,
  turbOctaves: cTurbOctaves,
  turbLacunarity: cTurbLacunarity,
  turbGain: cTurbGain,
  bloomStrength: cBloomStrength,
  bloomThreshold: cBloomThreshold,
  bloomRadius: cBloomRadius,
} = useControls({
  timeScale: { label: 'Time scale', value: 1.0, min: 0.0, max: 4.0, step: 0.01 },
  spawnRate: { label: 'Spawn rate', value: 5, min: 1, max: 100, step: 1 },
  size: { label: 'Size', value: 1.0, min: 0.01, max: 3.0, step: 0.01 },
  lifetime: { label: 'Lifetime', value: 0.5, min: 0.01, max: 2.0, step: 0.01 },
  linksWidth: { label: 'Links width', value: 0.005, min: 0.001, max: 0.1, step: 0.001 },
  colorVariance: { label: 'Color variance', value: 2.0, min: 0.0, max: 10.0, step: 0.01 },
  colorRotationSpeed: { label: 'Color rotation', value: 1.0, min: 0.0, max: 5.0, step: 0.01 },
  turbFriction: { label: 'Turb friction', value: 0.01, min: 0.0, max: 0.3, step: 0.01 },
  turbFrequency: { label: 'Turb frequency', value: 0.5, min: 0.0, max: 1.0, step: 0.01 },
  turbAmplitude: { label: 'Turb amplitude', value: 0.5, min: 0.0, max: 10.0, step: 0.01 },
  turbOctaves: { label: 'Turb octaves', value: 2, min: 1, max: 9, step: 1 },
  turbLacunarity: { label: 'Turb lacunarity', value: 2.0, min: 1.0, max: 5.0, step: 0.01 },
  turbGain: { label: 'Turb gain', value: 0.5, min: 0.0, max: 1.0, step: 0.01 },
  bloomStrength: { label: 'Bloom strength', value: 0.75, min: 0.0, max: 10.0, step: 0.01 },
  bloomThreshold: { label: 'Bloom threshold', value: 0.5, min: 0.0, max: 2.0, step: 0.01 },
  bloomRadius: { label: 'Bloom radius', value: 0.1, min: 0.0, max: 1.0, step: 0.01 },
}, { uuid: 'plexus-particles' })

// Holds the bloom node so Task 4's controls can tweak strength/threshold/radius.
const bloomPass = shallowRef<ReturnType<typeof bloom> | null>(null)

const screenPointer = new Vector2()
const scenePointer = new Vector3()
const raycastPlane = new Plane(new Vector3(0, 0, 1), 0)
const raycaster = new Raycaster()

function onPointerMove(e: PointerEvent) {
  const el = renderer.instance?.domElement
  if (!el) { return }
  const rect = el.getBoundingClientRect()
  screenPointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
  screenPointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
}

onMounted(() => window.addEventListener('pointermove', onPointerMove))
onBeforeUnmount(() => window.removeEventListener('pointermove', onPointerMove))

let initialized = false
onBeforeRender(({ delta }) => {
  const r = renderer.instance
  const cam = camera.activeCamera.value
  if (!r || !cam) { return }

  // One-time pipeline + buffer init. Deferred to the first frame where both the
  // renderer and camera exist (renderer.onReady can fire before the camera is
  // set) and the meshes are mounted, so the scene pass captures them and bloom
  // always initializes.
  if (!initialized) {
    const scenePass = pass(scene.value, cam)
    const scenePassColor = scenePass.getTextureNode('output')
    const bp = bloom(scenePassColor, 0.75, 0.1, 0.5)
    bloomPass.value = bp

    const post = new PostProcessing(r as Renderer)
    post.outputNode = scenePassColor.add(bp)

    // Replace the default renderer.render with the post-processed render.
    // WebGPURenderer.render()/PostProcessing.render() schedule synchronously.
    render((notifySuccess) => {
      post.render()
      notifySuccess()
    })

    r.compute(plexus.initCompute)
    initialized = true
  }

  U.timeScale.value = cTimeScale!.value as number
  U.nbToSpawn.value = cSpawnRate!.value as number
  U.particleSize.value = cSize!.value as number
  U.particleLifetime.value = cLifetime!.value as number
  U.linksWidth.value = cLinksWidth!.value as number
  U.colorVariance.value = cColorVariance!.value as number
  U.colorRotationSpeed.value = cColorRotation!.value as number
  U.turbFriction.value = cTurbFriction!.value as number
  U.turbFrequency.value = cTurbFrequency!.value as number
  U.turbAmplitude.value = cTurbAmplitude!.value as number
  U.turbOctaves.value = cTurbOctaves!.value as number
  U.turbLacunarity.value = cTurbLacunarity!.value as number
  U.turbGain.value = cTurbGain!.value as number

  if (bloomPass.value) {
    bloomPass.value.strength.value = cBloomStrength!.value as number
    bloomPass.value.threshold.value = cBloomThreshold!.value as number
    bloomPass.value.radius.value = cBloomRadius!.value as number
  }

  r.compute(plexus.updateParticles)
  r.compute(plexus.spawnParticles)
  U.spawnIndex.value = (U.spawnIndex.value + U.nbToSpawn.value) % U.NB_PARTICLES

  // Raycast plane faces the (auto-rotating) camera, then project the pointer onto it.
  raycastPlane.normal.set(0, 0, 1).applyEuler(cam.rotation)
  raycaster.setFromCamera(screenPointer, cam)
  raycaster.ray.intersectPlane(raycastPlane, scenePointer)

  U.previousSpawnPosition.value.copy(U.spawnPosition.value)
  U.spawnPosition.value.lerp(scenePointer, 0.1)

  U.colorOffset.value += delta * U.colorRotationSpeed.value * U.timeScale.value
})
</script>

<template>
  <primitive :object="plexus.particleMesh" />
  <primitive :object="plexus.linksMesh" />
</template>
