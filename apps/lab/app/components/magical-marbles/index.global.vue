<script setup lang="ts">
import { gsap } from 'gsap'
import { EffectComposerPmndrs, ToneMappingPmndrs } from '@tresjs/post-processing'
import { ToneMappingMode } from 'postprocessing'
import { ContactShadows } from '@tresjs/cientos'


const gl = {
  alpha: true,
  shadows: false,
  clearAlpha: 0,
}

let ctx: gsap.Context

const marbleRef = shallowRef(null)
const backgroundRef = ref(null)
const mainRef = ref(null)
const indexColor = ref(0)

const marbleParams = reactive({
  roughness: 0.15,
  metalness: 0,
  iterations: 48,
  depth: 0.6,
  smoothing: 0.2,
  displacement: 0.1,
  speed: 0.05,
})

const { roughness, iterations, depth, smoothing, displacement, metalness, speed } = useControls({
  roughness: {
    value: marbleParams.roughness,
    min: 0,
    max: 1,
    step: 0.01,
  },
  metalness: {
    value: marbleParams.metalness,
    min: 0,
    max: 1,
    step: 0.01,
  },
  iterations: {
    value: marbleParams.iterations,
    min: 1,
    max: 64,
    step: 1,
  },
  depth: {
    value: marbleParams.depth,
    min: 0,
    max: 1,
    step: 0.01,
  },
  smoothing: {
    value: marbleParams.smoothing,
    min: 0,
    max: 1,
    step: 0.01,
  },
  displacement: {
    value: marbleParams.displacement,
    min: 0,
    max: 0.35,
    step: 0.01,
  },
  speed: {
    value: marbleParams.speed,
    min: 0,
    max: 0.5,
    step: 0.001,
  },
})

const { toneMappingMode, toneMappingExposure } = useControls('toneMapping', {
  mode: {
    options: Object.keys(ToneMappingMode).map(key => ({
      text: key,
      value: ToneMappingMode[key as keyof typeof ToneMappingMode],
    })),
    value: ToneMappingMode.NEUTRAL,
  },
  exposure: {
    value: 1,
    min: 0,
    max: 10,
    step: 0.1,
  },
})

watchEffect(() => {
  marbleParams.roughness = roughness.value
  marbleParams.iterations = iterations.value
  marbleParams.depth = depth.value
  marbleParams.smoothing = smoothing.value
  marbleParams.displacement = displacement.value
  marbleParams.metalness = metalness.value
  marbleParams.speed = speed.value
})

const colors: [number, number, number][] = [
  [0, 100, 50],
  [60, 100, 50],
  [150, 100, 50],
  [240, 70, 60],
  [0, 0, 80],
]

const currentColor = computed(() => colors[indexColor.value])

const backgroundGradient = computed(() => `radial-gradient(hsl(${currentColor.value[0]}, ${currentColor.value[1] * 0.7}%, ${currentColor.value[2]}%), hsl(${currentColor.value[0]},${currentColor.value[1] * 0.4}%, ${currentColor.value[2] * 0.2}%))`)

onMounted(() => {
  ctx = gsap.context(() => { }, mainRef.value)

  animateColorTransition(true)
})

onUnmounted(() => {
  ctx?.revert()
})

const handleSphereClick = () => {
  indexColor.value = (indexColor.value + 1) % colors.length

  animateColorTransition()
}

const animateColorTransition = (immediate = false) => {
  if (immediate) {
    ctx.add(() => {
      gsap.set(backgroundRef.value, {
        background: `${backgroundGradient.value}`,
      })
    })
  }
  else {
    ctx.add(() => {
      marbleRef.value?.animateSphereColor()

      gsap.to(backgroundRef.value, {
        background: `${backgroundGradient.value}`,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    })
  }
}

const contactShadowColor = computed(() => {
  const [h, s, l] = currentColor.value
  return `hsl(${h}, ${s}%, ${Math.max(0, l - 30)}%)`
})
</script>

<template>
  <TresLeches />

  <div ref="mainRef" class="magical-marbles">
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
  </div>

  <TresCanvas window-size v-bind="gl" :toneMappingExposure="toneMappingExposure">
    <TresPerspectiveCamera :position="[0, 0, 3.5]" :fov="45" :near=".1" :far="1000" />

    <OrbitControls auto-rotate :enable-rotate="false" :enable-pan="false" make-default />

    <MagicalMarblesMarble ref="marbleRef" :colors="colors" :params="marbleParams" :indexColor="indexColor"
      @sphere-click="handleSphereClick" />

    <ContactShadows :position-y="-1.1" :color="contactShadowColor" :blur="0.85" :scale="5" :opacity="0.35" />
    <Suspense>
      <Environment preset="urban" :environmentIntensity="0.85" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs :multisampling="4">
        <ToneMappingPmndrs :mode="toneMappingMode" />
      </EffectComposerPmndrs>
    </Suspense>
    <TheScreenshot />
  </TresCanvas>
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

.magical-marbles__infos {
  margin-top: auto;
  position: absolute;
  bottom: 40px;
  left: 60px;
  z-index: 5;
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
  z-index: 4;
  /* pointer-events: none !important; */
}
</style>
