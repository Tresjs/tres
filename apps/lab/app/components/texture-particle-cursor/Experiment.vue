<script setup lang="ts">
import type { Mesh, Texture} from 'three';
import { Vector2, Uniform, ShaderMaterial, PlaneGeometry, DoubleSide, CanvasTexture, Float32BufferAttribute, BufferAttribute, AdditiveBlending } from 'three';
import { useDevicePixelRatio,  } from '@vueuse/core';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import type { TresPointerEvent } from '@tresjs/core';

const { state: texture, isLoading } = useTexture('/textures/rockhopper.png')

// const texture = textureLoader.load('/textures/rockhopper.png')
const { sizes } = useTres()
const { pixelRatio } = useDevicePixelRatio()

// Displayment of the particles
const displacement = {
  canvas: null as HTMLCanvasElement | null,
  context: null as CanvasRenderingContext2D | null,
  glowImage: null as HTMLImageElement | null,
  interactivePlane: null as Mesh | null,
  screenCursor: null as Vector2 | null,
  canvasCursor: null as Vector2 | null,
  canvasPreviousCursor: null as Vector2 | null,
  texture: null as Texture | null,
}

const canRender = computed(() => !isLoading.value && sizes.width.value > 0 && sizes.height.value > 0)

// 2D Canvas

displacement.canvas = document.createElement('canvas')
displacement.canvas.width = 128
displacement.canvas.height = 128
displacement.canvas.style.position = 'fixed'
displacement.canvas.style.top = '0'
displacement.canvas.style.left = '0'
displacement.canvas.style.width = '256px'
displacement.canvas.style.height = '256px'
displacement.canvas.style.zIndex = '10'

document.body.appendChild(displacement.canvas)

const { showDebug } = useControls({
  showDebug: true
}, {
  uuid: 'texture-particle-cursor-experiment',
})

watch(showDebug!, (newShowDebug) => {
  displacement.canvas!.style.opacity = newShowDebug ? '1' : '0'
})

// Context

displacement.context = displacement.canvas.getContext('2d') as CanvasRenderingContext2D
displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height)

// Glow
displacement.glowImage = new Image()
displacement.glowImage.src = '/textures/glow.png'

const displacementMesh = shallowRef<Mesh>()
watch(displacementMesh, (newMesh) => {
  if (newMesh) {
    displacement.interactivePlane = newMesh
  }
})

displacement.screenCursor = new Vector2(9999, 9999)
displacement.canvasCursor = new Vector2(9999, 9999)
displacement.canvasPreviousCursor = new Vector2(9999, 9999)

const onMouseMove = (event: TresPointerEvent) => {
  // Normalize the cursor position to the clip space

  const { nativeEvent, intersection } = event
  const x = (nativeEvent.clientX / sizes.width.value) * 2 - 1
  const y = -(nativeEvent.clientY / sizes.height.value) * 2 + 1
  displacement.screenCursor!.set(x, y)

  const uv = intersection?.uv
  if (uv && displacement.canvas) {
    displacement.canvasCursor!.set(uv.x * displacement.canvas.width, (1 - uv.y) * displacement.canvas.height)
  }
}

displacement.texture = new CanvasTexture(displacement.canvas)

/** Particles */
const particlesGeometry = new PlaneGeometry(10,10,128,128)
// Performance tweak
particlesGeometry.setIndex(null)
particlesGeometry.deleteAttribute('normal')

const intensitiesArray = new Float32Array(particlesGeometry.attributes.position!.count!)
const anglesArray = new Float32Array(particlesGeometry.attributes.position!.count!)

for (let i = 0; i < particlesGeometry.attributes.position!.count!; i++) {
  intensitiesArray[i] = Math.random()
  anglesArray[i] = Math.random() * Math.PI * 2
}

particlesGeometry.setAttribute('aIntensity', new BufferAttribute(intensitiesArray, 1))
particlesGeometry.setAttribute('aAngle', new BufferAttribute(anglesArray, 1))
const particlesMaterial = new ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uResolution: new Uniform(new Vector2(1, 1)),
    uTime: new Uniform(0),
    uPictureTexture: new Uniform(texture),
    uDisplacementTexture: new Uniform(displacement.texture),
  },
})

watch(texture, (newTexture) => {
  if (newTexture) {
    newTexture.needsUpdate = true
    particlesMaterial.uniforms.uPictureTexture!.value = newTexture
  }
})


watch(sizes.height, () => {
  if (sizes.width.value > 0 && sizes.height.value > 0) {
    particlesMaterial.uniforms.uResolution!.value = new Vector2(sizes.width.value * pixelRatio.value, sizes.height.value * pixelRatio.value)
  }
}, { immediate: true })



// Tick

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  particlesMaterial.uniforms.uTime!.value = elapsed 

  if (displacement.canvas && displacement.context && displacement.glowImage) {
    displacement.context.globalCompositeOperation = 'source-over'
    displacement.context.globalAlpha = 0.02
    displacement.context.fillStyle = 'rgba(0, 0, 0, 0.5)'
    displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height)

    // Speed Alpha
    const cursorDistance = displacement.canvasCursor!.distanceTo(displacement.canvasPreviousCursor!)
    displacement.canvasPreviousCursor!.copy(displacement.canvasCursor!)
    const speedAlpha = Math.min(cursorDistance * 0.1, 1)

    const glowSize = displacement.canvas.width * 0.25
    displacement.context.globalCompositeOperation = 'lighten'
    displacement.context.globalAlpha = speedAlpha
    displacement.context.drawImage(
      displacement.glowImage,
      displacement.canvasCursor!.x - glowSize * 0.5,
      displacement.canvasCursor!.y - glowSize * 0.5,
      glowSize, glowSize,
    )
  }
  displacement.texture!.needsUpdate = true
})

</script>
<template>
  <TresPoints v-if="canRender" :geometry="particlesGeometry" :material="particlesMaterial" />
  <TresMesh ref="displacementMesh" :visible="false" @pointermove="onMouseMove">
    <TresPlaneGeometry :args="[10, 10]" />
    <TresMeshBasicMaterial :color="'red'" wireframe :side="DoubleSide" />
  </TresMesh>
</template>