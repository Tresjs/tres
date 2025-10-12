<script setup lang="ts">
import { gsap } from 'gsap'
import { Color, RepeatWrapping, NearestFilter, MeshStandardMaterial } from 'three'
import { useTexture, CustomShaderMaterial } from '@tresjs/cientos'
import { useLoop, useTres } from '@tresjs/core'
import { vertex, fragment } from './shaders'

const ctx = gsap.context(() => { })

const props = defineProps({
  colors: {
    type: Array as PropType<[number, number, number][]>,
    required: true,
  },
  params: {
    type: Object as PropType<{
      roughness?: number,
      metalness?: number,
      iterations?: number,
      depth?: number,
      smoothing?: number,
      displacement?: number,
      speed?: number,
    }>,
    default: () => ({}),
  },
  indexColor: {
    type: Number,
    required: true,
  },
})

const { colors, params, indexColor } = toRefs(props)

const emit = defineEmits(['sphere-click'])

const sphereRef = shallowRef(null)
const elapsedStart = ref(0)
const onPointerHovered = ref(false)

const { onRender } = useLoop()

const { renderer } = useTres()

const currentColor = computed(() => colors.value[indexColor.value])

const colorFinalB = computed(() => new Color(`hsl(${currentColor.value[0]}, ${currentColor.value[1]}%, ${currentColor.value[2]}%)`))

const animateSphereColor = async () => {
  await nextTick()

  ctx.add(() => {
    tl = gsap.timeline({})
      .addLabel('sphereAnimation')
      .to(uniforms.colorB.value, {
        r: colorFinalB.value.r,
        g: colorFinalB.value.g,
        b: colorFinalB.value.b,
        duration: 1.2,
        ease: 'power2.out',
      }, 'sphereAnimation')
      .to(uniforms.uDisplacementSpeed, {
        overwrite: 'auto',
        ease: 'power2.out',
        keyframes: [
          { value: 1.175, duration: 0.3 },
          { value: 1, duration: 0.65, overwrite: 'auto' },
        ],
      }, 'sphereAnimation')
  })
}

const { state: heightMapTexture } = useTexture('/magical-marbles/heightMap.jpeg')
const { state: displacementMapTexture } = useTexture('/magical-marbles/displacementMap.jpeg')

const uniforms = reactive({
  uTime: { value: 1 },
  uDisplacementSpeed: { value: 1 },
  colorA: { value: new Color(0, 0, 0) },
  colorB: { value: new Color(`hsl(${colors.value[indexColor.value][0]}, ${colors.value[indexColor.value][1]}%, ${colors.value[indexColor.value][2]}%)`) },
  heightMap: { value: heightMapTexture.value },
  displacementMap: { value: displacementMapTexture.value },
  iterations: { value: params.value.iterations },
  depth: { value: params.value.depth },
  smoothing: { value: params.value.smoothing },
  displacement: { value: params.value.displacement },
})

const uniformKeys = ['iterations', 'depth', 'smoothing', 'displacement'] as const

uniformKeys.forEach((key) => {
  watch(
    () => params.value[key],
    (val) => {
      uniforms[key].value = val
    },
    { immediate: true }
  )
})

watch([heightMapTexture, displacementMapTexture], () => {
  heightMapTexture.value.wrapS = heightMapTexture.value.wrapT = RepeatWrapping
  displacementMapTexture.value.wrapS = displacementMapTexture.value.wrapT = RepeatWrapping

  heightMapTexture.value.minFilter = displacementMapTexture.value.minFilter = NearestFilter

  uniforms.heightMap.value = heightMapTexture.value
  uniforms.displacementMap.value = displacementMapTexture.value
})

function animateScale(targetScale: number) {
  if (!sphereRef.value || !sphereRef.value.instance) return

  gsap.to(sphereRef.value.instance.scale, {
    x: targetScale,
    y: targetScale,
    z: targetScale,
    duration: 1,
    ease: 'elastic.out(1, 0.4)',
    overwrite: 'auto'
  })
}

const onSpherePointerDown = () => {
  animateScale(0.925)
}

const onSpherePointerUp = () => {
  animateScale(1)
  emit('sphere-click')
}

const onSpherePointerEnter = () => {
  onPointerHovered.value = true
  renderer.domElement.style.cursor = 'pointer'
  animateScale(0.965)
}

const onSpherePointerLeave = () => {
  onPointerHovered.value = false
  renderer.domElement.style.cursor = 'initial'
  animateScale(1)
}

onUnmounted(() => {
  ctx?.revert()
})

onRender(({ elapsed }) => {
  if (!elapsedStart.value) {
    elapsedStart.value = elapsed
  }

  uniforms.uTime.value = ((elapsed - elapsedStart.value) * (params.value.speed ?? 1))
})

defineExpose({
  animateSphereColor
})
</script>

<template>
  <Sphere ref="sphereRef" :args="[1, 64, 32]" @pointerdown="onSpherePointerDown" @pointerup="onSpherePointerUp"
    @pointerenter="onSpherePointerEnter" @pointerleave="onSpherePointerLeave">
    <CustomShaderMaterial :roughness="params.roughness" :metalness="params.metalness"
      :base-material="MeshStandardMaterial" :vertex-shader="vertex" :fragment-shader="fragment" :uniforms="uniforms"
      silent />
  </Sphere>
</template>
