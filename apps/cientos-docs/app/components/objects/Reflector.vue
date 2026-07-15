<script setup lang="ts">
import {
  MeshWobbleMaterial,
  OrbitControls,
  Reflector,
  Stars,
} from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { ref, shallowRef, watch } from 'vue'

const uuid = inject(`uuid`)

const { color, clipBias, textureSize, useCustomShader } = useControls({
  color: '#f7f7f7',
  clipBias: { value: 0, min: 0, max: 0.01, step: 0.0001 },
  textureSize: { value: 512, options: [256, 512, 1024] },
  useCustomShader: false,
}, { uuid })

const customShader = {
  uniforms: {
    color: { value: null },
    tDiffuse: { value: null },
    textureMatrix: { value: null },
    time: { value: 0 },
  },
  vertexShader: /* glsl */`
    uniform mat4 textureMatrix;
    varying vec4 vUv;
    varying vec2 vPos;
    void main() {
      vUv = textureMatrix * vec4(position, 1.0);
      vPos = position.xy;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: /* glsl */`
    uniform vec3 color;
    uniform sampler2D tDiffuse;
    uniform float time;
    varying vec4 vUv;
    varying vec2 vPos;
    float blendOverlay(float base, float blend) {
      return(base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend)));
    }
    vec3 blendOverlay(vec3 base, vec3 blend) {
      return vec3(blendOverlay(base.r, blend.r), blendOverlay(base.g, blend.g), blendOverlay(base.b, blend.b));
    }
    void main() {
      float dist = length(vPos);
      float wave = sin(dist * 6.0 - time * 4.0) * 0.02;
      vec2 dir = dist > 0.001 ? normalize(vPos) : vec2(0.0);
      vec4 distortedUv = vUv + vec4(dir * wave, 0.0, 0.0);
      vec4 base = texture2DProj(tDiffuse, distortedUv);
      gl_FragColor = vec4(blendOverlay(base.rgb, color), 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
}

const shaderPicked = ref<object | undefined>(undefined)
const reflectorKey = ref(0)
const reflectorRef = shallowRef()

watch([clipBias, textureSize, useCustomShader], ([, , customShaderEnabled]) => {
  shaderPicked.value = customShaderEnabled ? customShader : undefined
  reflectorKey.value++
})

const onLoop = ({ elapsed }: { elapsed: number }) => {
  const uniforms = reflectorRef.value?.instance?.material?.uniforms
  if (uniforms?.time) {
    uniforms.time.value = elapsed
  }
}
</script>

<template>
  <TresCanvas clear-color="#111" @loop="onLoop">
    <TresPerspectiveCamera :position="[3, 2, 6]" />
    <Stars />
    <TresMesh>
      <TresTorusGeometry />
      <MeshWobbleMaterial color="orange" :speed="1" :factor="2" />
    </TresMesh>
    <Reflector
      ref="reflectorRef"
      :key="reflectorKey"
      :rotation="[-Math.PI * 0.5, 0, 0]"
      :position="[0, -2, 0]"
      :color="color"
      :clip-bias="clipBias"
      :texture-width="textureSize"
      :texture-height="textureSize"
      :shader="shaderPicked"
    >
      <TresCircleGeometry :args="[10, 32]" />
    </Reflector>
    <TresAmbientLight :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
