<script setup lang="ts">
import { gsap } from 'gsap'
import { Color, RepeatWrapping, NearestFilter, MeshStandardMaterial } from 'three'
import { vertex, fragment } from './shaders'

const gl = {
  alpha: true,
  shadows: false,
}

let ctx, tl

const sphereRef = shallowRef(null)
const backgroundRef = ref(null)
const mainRef = ref(null)
const indexColor = ref(0)
const tlInProgress = ref(false)

const colors = ref([
  [0, 100, 50],
  [60, 100, 50],
  [150, 100, 50],
  [240, 70, 60],
  [0, 0, 80],
])

const params = reactive({
  timeOffset: 0,
  roughness: 0.15,
  speed: 0.05,
  iterations: 48,
  depth: 0.6,
  smoothing: 0.2,
  displacement: 0.1,
  metalness: 0,
})

const heightMap = await useTexture(['/magical-marbles/heightMap.jpeg'])
const displacementMap = await useTexture(['/magical-marbles/displacementMap.jpeg'])
heightMap.minFilter = displacementMap.minFilter = NearestFilter
displacementMap.wrapS = displacementMap.wrapT = RepeatWrapping

const { onLoop } = useRenderLoop()

const { roughness, iterations, depth, smoothing, displacement, metalness, speed } = useControls({
  roughness: {
    value: params.roughness,
    min: 0,
    max: 1,
    step: 0.01,
  },
  metalness: {
    value: params.metalness,
    min: 0,
    max: 1,
    step: 0.01,
  },
  iterations: {
    value: params.iterations,
    min: 1,
    max: 64,
    step: 1,
  },
  depth: {
    value: params.depth,
    min: 0,
    max: 1,
    step: 0.01,
  },
  smoothing: {
    value: params.smoothing,
    min: 0,
    max: 1,
    step: 0.01,
  },
  displacement: {
    value: params.displacement,
    min: 0,
    max: .35,
    step: 0.01,
  },
  speed: {
    value: params.speed,
    min: 0,
    max: .5,
    step: 0.001,
  },
})

const currentColor = computed(() => colors.value[indexColor.value])

const colorFinalB = computed(() => new Color(`hsl(${currentColor.value[0]}, ${currentColor.value[1]}%, ${currentColor.value[2]}%)`))

const backgroundGradient = computed(() => `radial-gradient(hsl(${currentColor.value[0]}, ${currentColor.value[1] * 0.7}%, ${currentColor.value[2]}%), hsl(${currentColor.value[0]},${currentColor.value[1] * 0.4}%, ${currentColor.value[2] * 0.2}%))`)

const uniforms = reactive({
  time: { value: 0 },
  colorA: { value: new Color(0, 0, 0) },
  colorB: { value: new Color(`hsl(${colors.value[0][0]}, ${colors.value[0][1]}%, ${colors.value[0][2]}%)`) },
  heightMap: { value: heightMap },
  displacementMap: { value: displacementMap },
  iterations,
  depth,
  smoothing,
  displacement,
})

onMounted(() => {
  if (!mainRef.value) return
  
  ctx = gsap.context(() => { }, mainRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})

watch(sphereRef, (value) => {
  updateBackground(true)
})

const onPointerClick = () => {
  if (tlInProgress.value) return

  indexColor.value = (indexColor.value + 1) % colors.value.length

  updateBackground()
}

const updateBackground = (immediate = false) => {
  if (immediate) {
    ctx.add(() => {
      gsap.set(backgroundRef.value, {
        background: `${backgroundGradient.value}`,
      })
    })
  }
  else {
    ctx.add(() => {
      if(!sphereRef.value) return

      tl = gsap.timeline({
        onStart: () => {
          tlInProgress.value = true
        },
        onComplete: () => {
          tlInProgress.value = false
        },
      })
        .addLabel('sphereAnimation')
        .to(backgroundRef.value, {
          background: `${backgroundGradient.value}`,
          duration: .75,
          ease: 'power1.out',
        }, 'sphereAnimation+=.15')
        .to(uniforms.colorB.value, {
          r: colorFinalB.value.r,
          g: colorFinalB.value.g,
          b: colorFinalB.value.b,
          duration: .75,
          ease: 'power1.out',
        }, 'sphereAnimation+=.15')
        .to(sphereRef.value.instance.scale, {
          x: .95,
          y: .95,
          z: .95,
          duration: 0.35,
          ease: 'power1.inOut',
        }, 'sphereAnimation+=.15')
        .to(sphereRef.value.instance.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        }, 'sphereAnimation+=85%')
        .to(params, {
          timeOffset: ((1 + indexColor.value) * 0.0035),
          duration: 0.65,
          ease: 'power1.inOut',
        }, 'sphereAnimation')
        .to(params, {
          timeOffset: 0,
          duration: 0.35,
          ease: 'power1.out',
        }, 'sphereAnimation+=.5')
    })
  }
}

onLoop(({ delta }) => {
  uniforms.time.value += params.timeOffset + delta * speed.value.value
})
</script>

<template>
  <div ref="mainRef" class="magical-marbles">
    <NuxtLink class="magical-marbles__logo" to="/">
      <img src="/lab.svg" alt="TresJS Logo">
    </NuxtLink>

    <button class="magical-marbles__cta" @click.stop="onPointerClick">
      shuffle colors
    </button>

    <div class="magical-marbles__infos">
      <NuxtLink to="/">
        See more experiments and examples
      </NuxtLink>
      <p>
        Magical Marbles inspired by the
        <a target="_blank" href="https://tympanus.net/codrops/2021/08/02/magical-marbles-in-three-js/">
          Codrops tutorial
        </a>
      </p>
    </div>

    <div ref="backgroundRef" class="magical-marbles__bg" />

    <TresLeches />

    <TresCanvas window-size v-bind="gl">
      <TresPerspectiveCamera :position="[0, 0, 4.5]" :fov="45" :near=".1" :far="1000" />
      <OrbitControls auto-rotate make-default />

      <Suspense>
        <Environment preset="hangar" />
      </Suspense>

      <Sphere ref="sphereRef" :args="[1, 64, 32]">
        <CustomShaderMaterial :roughness="roughness.value" :metalness="metalness.value"
          :base-material="MeshStandardMaterial" :vertex-shader="vertex" :fragment-shader="fragment" :uniforms="uniforms"
          silent />
      </Sphere>
    </TresCanvas>
  </div>
</template>

<style scoped>
.magical-marbles {
  width: 100%;
  height: 100%;
}

.magical-marbles__bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background-color: #d8bcac;
  pointer-events: none;
}

.magical-marbles__logo {
  align-self: flex-start;
  position: absolute;
  top: 40px;
  left: 60px;
  width: 5%;
  z-index: 3;
}

.magical-marbles__infos {
  margin-top: auto;
  position: absolute;
  bottom: 40px;
  left: 60px;
  z-index: 3;
}

.magical-marbles__cta {
  z-index: 3;
  background: white;
  position: absolute;
  bottom: 40px;
  right: 60px;
  padding: 10px 20px;
  color: black;
  border-radius: 5px;
  transition: transform .3s cubic-bezier(0.33, 1, 0.68, 1);
  will-change: transform;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 0.85vw;
  transform: scale(1)
}

.magical-marbles__cta:hover {
  transform: scale(1.05)
}

.magical-marbles p,
.magical-marbles a {
  font-family: "Segoe UI", Helvetica, Arial, sans-serif;
}

.magical-marbles__infos p {
  color: #FFF;
}

.magical-marbles__infos a {
  pointer-events: auto;
  color: #ad836d;
  transition: color 0.25s;
}

.magical-marbles__infos a:hover {
  color: #79573e;
}

canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  /* pointer-events: none !important; */

}
</style>