<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { AdditiveBlending } from 'three'

/* import { OrbitControls, GLTFModel } from '@tresjs/cientos' */

const gl = reactive({
  clearColor: 'black',
  shadows: true,
  alpha: false,
})

const shader = {
  transparent: true,
  blending: AdditiveBlending,
  depthWrite: false,

  vertexShader: `
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uTime;
  attribute float aScale;

  void main()
  {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2;
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPosition = projectionMatrix * viewPosition;

      gl_Position = projectionPosition;
      gl_PointSize = aScale * uSize * uPixelRatio;
      gl_PointSize *= (1.0 / - viewPosition.z);
  }
  `,
  fragmentShader: `
  void main()
    {
      float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
      float strength = 0.05 / distanceToCenter - 0.1;

      gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
    }
  `,
  uniforms: {
    uSize: { value: 100 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uTime: { value: 0 },
  },
}

const firefliesCount = 3000
const positionArray = new Float32Array(firefliesCount * 3)
const scaleArray = new Float32Array(firefliesCount)

for (let i = 0; i < firefliesCount; i++) {
  positionArray[i * 3 + 0] = Math.random() * 4
  positionArray[i * 3 + 1] = Math.random() * 4
  positionArray[i * 3 + 2] = Math.random() * 4
  scaleArray[i] = Math.random()
}

function onLoop({ elapsed }: { elapsed: number }) {
  shader.uniforms.uTime.value = elapsed
}
</script>

<template>
  <TresCanvas
    v-bind="gl"
    window-size
    @loop="onLoop"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :fov="45"
      :near="0.1"
      :far="1000"
      :look-at="[-8, 3, -3]"
    />
    <OrbitControls />
    <TresAmbientLight :intensity="0.5" />
    <TresPoints>
      <TresBufferGeometry
        :position="[positionArray, 3]"
        :a-scale="[scaleArray, 1]"
      />
      <TresShaderMaterial v-bind="shader" />
    </TresPoints>
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="1"
      cast-shadow
    />
  </TresCanvas>
</template>
