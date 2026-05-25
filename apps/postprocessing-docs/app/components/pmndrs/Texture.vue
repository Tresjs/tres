<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls, useTexture } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, TexturePmndrs, ToneMappingPmndrs } from '@tresjs/post-processing'
import { BlendFunction, ColorChannel, ToneMappingMode } from 'postprocessing'
import { NoToneMapping, RepeatWrapping, SRGBColorSpace } from 'three'
import type { EffectPass, TextureEffect } from 'postprocessing'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'

const uuid = inject<string>('uuid')

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
  toneMappingExposure: 2,
}

const textureEffectRef: Ref<{ pass: EffectPass, effect: TextureEffect } | null> = ref(null)

const { state: texture } = useTexture('https://raw.githubusercontent.com/Tresjs/assets/main/textures/dirt/color.jpg')

watch(texture, (newTexture) => {
  if (newTexture) {
    newTexture.colorSpace = SRGBColorSpace
    newTexture.wrapS = newTexture.wrapT = RepeatWrapping
  }
}, { immediate: true })

const { blendFunction, rotation, opacity } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.MULTIPLY,
  },
  opacity: {
    value: 1,
    min: 0,
    max: 1,
    step: 0.01,
  },
  rotation: {
    value: 0,
    min: 0,
    max: 2 * Math.PI,
    step: 0.001,
  },
  mixColors: {
    label: 'Mix colors (RGB)',
    type: 'button',
    onClick: () => {
      textureEffectRef.value?.effect.setTextureSwizzleRGBA(
        ColorChannel.GREEN,
        ColorChannel.BLUE,
        ColorChannel.RED,
        ColorChannel.ALPHA,
      )
    },
    size: 'md',
  },
  resetColors: {
    label: 'Reset colors (RGB)',
    type: 'button',
    onClick: () => {
      textureEffectRef.value?.effect.setTextureSwizzleRGBA(
        ColorChannel.RED,
        ColorChannel.GREEN,
        ColorChannel.BLUE,
        ColorChannel.ALPHA,
      )
    },
    size: 'md',
  },
}, { uuid })

if (rotation) {
  watch(rotation, (newRotation) => {
    if (texture.value) {
      texture.value.rotation = newRotation
    }
  })
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[5, 7, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <TresMesh :position="[0, .5, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshBasicMaterial color="white" />
    </TresMesh>

    <ContactShadows
      :opacity="1"
      :position-y="-.5"
    />

    <Suspense>
      <Environment background :blur="0.1" preset="dawn" />
    </Suspense>

    <EffectComposerPmndrs>
      <TexturePmndrs
        ref="textureEffectRef"
        :blend-function="Number(blendFunction)"
        :texture="texture"
        :opacity="opacity"
      />
      <ToneMappingPmndrs :mode="ToneMappingMode.AGX" />
    </EffectComposerPmndrs>
  </TresCanvas>
</template>
