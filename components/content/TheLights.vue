<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Color, Vector3 } from 'three'

const gl = {
  clearColor: '#030303',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const venomSnake = shallowRef<TresObject>()
const directionalLightRef = shallowRef<TresObject>()
const ambientLightRef = shallowRef<TresObject>()
const directionalLightHelperRef = shallowRef<TresObject>()

watchEffect(async () => {
  if (venomSnake.value) {
    const model = venomSnake.value.value
    if (!model) return
    model.scale.set(0.02, 0.02, 0.02)
    model.position.set(0, 4, 0)
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }
})

watch(directionalLightRef, (light) => {
  light.shadow.bias = -0.005
})

const pbrTexture = await useTexture({
  map: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
  displacementMap:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
  roughnessMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Roughness.jpg',
  normalMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_NormalGL.jpg',
  ambientOcclusion:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_AmbientOcclusion.jpg',
})

// Controls

const { enable: ambientEnabled, intensity: ambientIntensity, color: ambientColor } = useControls('AmbienLight', {
  enable: true,
  intensity: {
    value: 0.25,
    min: 0,
    max: 10,
    step: 0.1,
  },
  color: '#ffffff',
})

const { 
  enable: directionalEnabled,
  intensity:
  directionalIntensity,
  color:
  directionalColor,
  position: directionalPosition, 
} = useControls(
  'DirectionalLight',
  {
    enable: true,
    intensity: {
      value: 0.5,
      min: 0,
      max: 10,
      step: 0.1,
    },
    color: '#ffffff',
    position: new Vector3(-8, 7, 2),
  },
)

// TODO: add more lights when https://github.com/Tresjs/leches/pull/57 is merged

watch([directionalColor.value, directionalLightHelperRef, directionalPosition.value], ([color, helper, position]) => {
  if (helper) {
    helper.update()
  }
})

const { hasFinishLoading, progress } = await useProgress()
</script>

<template>
  <TresLeches />
  <Transition
    name="fade-overlay"
    enter-active-class="opacity-1 transition-opacity duration-200"
    leave-active-class="opacity-0 transition-opacity duration-200"
  >
    <div
      v-show="!hasFinishLoading"
      class="absolute bg-grey-600 t-0 l-0 w-full h-full z-20 flex justify-center items-center text-black font-mono"
    >
      <div class="w-200px">
        Loading... {{ progress }} %
      </div>
    </div>
  </Transition>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[11, 11, 11]"
      :fov="45"
      :aspect="1"
      :near="0.1"
      :far="1000"
    />
    <OrbitControls />
    <TresGridHelper />
    <Suspense>
      <GLTFModel
        ref="venomSnake"
        path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/venom-snake-sculpt/scene.gltf"
        draco
      />
    </Suspense>

    <Plane
      :args="[10, 10, 500, 500]"
      receive-shadow
    >
      <TresMeshStandardMaterial
        v-bind="pbrTexture"
        :displacement-scale="0.6"
      />
    </Plane>
    <TresAmbientLight
      ref="ambientLightRef"
      :visible="ambientEnabled.value"
      :color="ambientColor.value"
      :intensity="ambientIntensity.value"
    />
    <TresDirectionalLight
      ref="directionalLightRef"
      :position-x="directionalPosition.value.x"
      :position-y="directionalPosition.value.y"
      :position-z="directionalPosition.value.z"
      :visible="directionalEnabled.value"
      :color="directionalColor.value"
      :intensity="directionalIntensity.value"
      cast-shadow
    />
    <TresDirectionalLightHelper
      v-if="directionalLightRef"
      ref="directionalLightHelperRef"
      :args="[directionalLightRef, 5]"
      :visible="directionalEnabled.value"
      :color="directionalColor.value"
    />
  </TresCanvas>
</template>
