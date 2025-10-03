<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useTexture } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping, RepeatWrapping, SRGBColorSpace } from 'three'
import { BlendFunction, ColorChannel, ToneMappingMode } from 'postprocessing'
import { computed, ref, watch } from 'vue'
import { EffectComposerPmndrs, TexturePmndrs, ToneMappingPmndrs } from '@tresjs/post-processing'
import type { Ref } from 'vue'
import type { EffectPass, TextureEffect } from 'postprocessing'


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
  repeat: computed(() => texture.value?.repeat),
  offset: computed(() => texture.value?.offset),
  center: computed(() => texture.value?.center),
  rotation: {
    value: texture.value?.rotation || 0,
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
})

watch(rotation, () => {
  if (texture.value) {
    texture.value.rotation = rotation.value
  }
})
</script>

<template>
  <div class="aspect-16/9">
    <TresCanvas
      v-bind="gl"
    >
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

      <Suspense>
        <EffectComposerPmndrs>
          <TexturePmndrs
            ref="textureEffectRef"
            :blendFunction="Number(blendFunction)"
            :texture="texture"
            :opacity="opacity"
          />
          <ToneMappingPmndrs :mode="ToneMappingMode.AGX" />
        </EffectComposerPmndrs>
      </Suspense>
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
