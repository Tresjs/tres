<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { EffectComposerPmndrs, SepiaPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'


const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { intensity, blendFunction } = useControls({
  intensity: { value: 1.0, step: 0.1, max: 5.0 },
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.NORMAL,
  },
})
</script>

<template>
  <div class="aspect-16/9">
    <TresCanvas
      v-bind="gl"
    >
      <TresPerspectiveCamera
        :position="[5, 5, 5]"
        :look-at="[0, 0, 0]"
      />
      <OrbitControls auto-rotate />

      <TresMesh :position="[0, .5, 0]">
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshPhysicalMaterial color="black" :roughness=".25" />
      </TresMesh>

      <ContactShadows
        :opacity="1"
        :position-y="-.5"
      />

      <Suspense>
        <Environment background :blur=".5" preset="snow" />
      </Suspense>

      <Suspense>
        <EffectComposerPmndrs v-bind="glComposer">
          <SepiaPmndrs :intensity="intensity" :blendFunction="Number(blendFunction)" />
        </EffectComposerPmndrs>
      </Suspense>
    </TresCanvas>
  </div>

  <TresLeches :float="false" />
</template>
