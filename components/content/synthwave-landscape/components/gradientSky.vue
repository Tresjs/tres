<script lang="ts" setup>
import { Mesh, BackSide, SphereGeometry, ShaderMaterial, Color } from 'three'

interface SkyProps {
  colorSky: string
  colorGround: string
  size: number
  offset: number
  scale: number
}

const props = defineProps<SkyProps>()

const SIZE = props.size

const vertexShader = `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`
const fragmentShader = `
  uniform vec3 topColor;
  uniform vec3 bottomColor;
  uniform float offset;
  uniform float scale;
  varying vec3 vWorldPosition;
  void main() {
    float h = clamp(normalize(vWorldPosition).y * scale + offset, 0.0, 1.0);
    gl_FragColor = vec4( mix( bottomColor, topColor, h), 1.0 );
  }`
const uniforms = {
  topColor: { value: new Color(props.colorSky) },
  bottomColor: { value: new Color(props.colorGround) },
  offset: { value: props.offset },
  scale: { value: props.scale },
}
const skyGeo = new SphereGeometry(SIZE, 32, 15)
const skyMat = new ShaderMaterial({
  uniforms,
  vertexShader,
  fragmentShader,
  side: BackSide,
})

const sky = new Mesh(skyGeo, skyMat)
</script>

<template>
  <primitive :object="sky" />
</template>
