<script setup lang="ts">
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import type { SphereGeometry } from 'three';
import { Uniform, Vector2, AdditiveBlending, Float32BufferAttribute, BufferAttribute, Color } from 'three';
import { useDevicePixelRatio } from '@vueuse/core';
import gsap from 'gsap';

const { pixelRatio } = useDevicePixelRatio()
const uniforms = {
  uTime: new Uniform(0),
  uResolution: new Uniform(new Vector2(1 * pixelRatio.value, 1 * pixelRatio.value)),
  uSize: new Uniform(50.0),
  uProgress: new Uniform(0.0),
  uColorA: new Uniform(new Color('#ffffff')),
  uColorB: new Uniform(new Color('#ffffff')),
}

const { progress, colorA, colorB } = useControls({
  colorA: {
    value: '#0091ff',
    type: 'color',
  },
  colorB: {
    value: '#d400ff',
    type: 'color',
  },
  progress: {
    value: 0.0,
    min: 0.0,
    max: 1.0,
    step: 0.01,
  },
  morph: {
    type: 'button',
    label: 'Morph',
    size: 'block',
    icon: 'i-carbon-play',
    onClick: () => {
      if (uniforms.uProgress.value === 0.0) {
        gsap.to(uniforms.uProgress, {
          value: 1.0,
          duration: 1.0,
          ease: 'power2.inOut',
          onComplete: () => {
            progress.value = 1.0
          }
        })
      } else {
        gsap.to(uniforms.uProgress, {
          value: 0.0,
          duration: 1.0,
          ease: 'power2.inOut',
          onComplete: () => {
            progress.value = 0.0
          }
        })
      }
    },
  }
}, { uuid: 'particles-morphing-experiment' })

watch([colorA, colorB], ([newColorA, newColorB]) => {
  uniforms.uColorA.value = new Color(newColorA)
  uniforms.uColorB.value = new Color(newColorB)
}, { immediate: true })

watch(progress, (newProgress) => {
  if (newProgress) {
    uniforms.uProgress.value = newProgress
  }
})

const geometryRef = ref<SphereGeometry | null>(null)

watch(geometryRef, (newGeometry) => {
  if (newGeometry) {
    newGeometry.setIndex(null)
  }
})

// State

const particles = reactive<{
  positions: Float32BufferAttribute[],
  sizes: BufferAttribute[],
  maxCount: number,
}>({
  positions: [],
  maxCount: 0,
})

// Load models

const { nodes: blenderCubeNodes } = useGLTF(
  '/models/blender-cube-simplified.glb',
  {
    draco: true,
  }
)
const blenderCube = computed(() => blenderCubeNodes.value?.BlenderCube)

const { nodes: pumpkinsaurNodes } = useGLTF(
  '/models/pumpkinsaur-simplified.glb',
  {
    draco: true,
  }
)
const pumpkinsaur = computed(() => pumpkinsaurNodes.value?.Pumpkinsaur)

watch(() => [blenderCube.value, pumpkinsaur.value], ([blenderCube, pumpkinsaur]) => {
  if (blenderCube && pumpkinsaur) {
    const positions: BufferAttribute[] = [
      blenderCube.geometry.attributes.position as never,
      pumpkinsaur.geometry.attributes.position as never,
    ]
    particles.maxCount = Math.max(blenderCube.geometry.attributes.position.count, pumpkinsaur.geometry.attributes.position.count)

    //Random sizes
    const sizesArray = new Float32Array(particles.maxCount)
    for (let i = 0; i < particles.maxCount; i++) {
      sizesArray[i] = Math.random()
    }
    particles.sizes = new BufferAttribute(sizesArray, 1)

    // We harmonize the positions by the max count
    for (const position of positions) {
      const originalArray = position.array
      const newArray = new Float32Array(particles.maxCount * 3)
      for (let i = 0; i < particles.maxCount; i++) {
        const i3 = i * 3

        if (i3 < originalArray.length) {
          newArray[i3] = originalArray[i3] as number
          newArray[i3 + 1] = originalArray[i3 + 1] as number
          newArray[i3 + 2] = originalArray[i3 + 2] as number
        } else {
          const randomIndex = Math.floor(position.count * Math.random()) * 3
          newArray[i3 + 0] = position.array[randomIndex + 0] as number
          newArray[i3 + 1] = position.array[randomIndex + 1] as number
          newArray[i3 + 2] = position.array[randomIndex + 2] as number
        }
      }
      particles.positions.push(new Float32BufferAttribute(newArray, 3))
    }
  }
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  uniforms.uTime.value = elapsed
})

</script>
<template>
  <TresPoints ref="modelParticlesPointsRef">
    <TresBufferGeometry v-if="particles.positions.length > 0" :position="[particles.positions[0].array, 3]"
      :a-position-target="[particles.positions[1].array, 3]" :a-size="[particles.sizes.array, 1]" />
    <TresShaderMaterial :vertex-shader="vertexShader" :fragment-shader="fragmentShader" :uniforms="uniforms"
      :transparent="true" :blending="AdditiveBlending" :depth-write="false" />
  </TresPoints>

</template>