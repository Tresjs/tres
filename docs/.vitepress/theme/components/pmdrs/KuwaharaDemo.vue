<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls, useGLTF } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, KuwaharaPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'
import { NoToneMapping } from 'three'
import { reactive, watch } from 'vue'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#3386E0',
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { state: scenePlantJar } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/kuwahara-effect/plant-jar/plant-jar.glb', { draco: true })
const { state: sceneWatermelon } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/kuwahara-effect/watermelon/watermelon_fruit.glb', { draco: true })

const effectProps = reactive({
  blendFunction: BlendFunction.NORMAL,
})

const { enabled, radius, sectorCount } = useControls({
  enabled: true,
  radius: { value: 10, min: 1, max: 15, step: 1 },
  sectorCount: { value: 4, min: 1, max: 8, step: 1 },
})

watch(enabled, () => {
  effectProps.blendFunction = enabled.value ? BlendFunction.NORMAL : BlendFunction.SKIP
})
</script>

<template>
  <div class="aspect-16/9">
    <TresCanvas
      v-bind="gl"
    >
      <TresPerspectiveCamera
        :position="[0, 6.5, 15]"
      />

      <OrbitControls />

      <TresAmbientLight :intensity="1" />

      <TresDirectionalLight />

      <primitive
        v-if="scenePlantJar"
        :position-x="-3"
        :position-y="-3.5"
        :scale="5"
        :object="scenePlantJar.scene"
      />
      <primitive
        v-if="sceneWatermelon"
        :position-x="4"
        :scale="20"
        :object="sceneWatermelon.scene"
      />

      <ContactShadows
        :opacity=".25"
        :position-y="-3.85"
        :scale="20"
        :blur=".65"
      />

      <ContactShadows
        :opacity=".5"
        :position-y="-3.85"
        :scale="20"
        :blur=".65"
      />

      <Suspense>
        <Environment :blur="0.2" preset="snow" />
      </Suspense>

      <Suspense>
        <EffectComposerPmndrs v-bind="glComposer">
          <KuwaharaPmndrs :blendFunction="Number(effectProps.blendFunction)" :radius="radius" :sectorCount="sectorCount" />
        </EffectComposerPmndrs>
      </Suspense>
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
