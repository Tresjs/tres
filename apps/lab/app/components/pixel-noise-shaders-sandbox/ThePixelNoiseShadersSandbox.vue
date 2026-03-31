<script setup lang="ts">
import type { TresPointerEvent } from '@tresjs/core';
import { useLoop, useTresContext } from '@tresjs/core';
import { BloomPmndrs, ChromaticAberrationPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing';

import { BufferAttribute, CanvasTexture, Color, PlaneGeometry, ShaderMaterial, Uniform, Vector2, Vector3 } from 'three';
import { computed, onMounted, watch } from 'vue';
import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';

const { sizes } = useTresContext();


// --- Displacement canvas (cursor trails) ---
const canvas = document.createElement('canvas');
canvas.width = 128;
canvas.height = 128;
const ctx = canvas.getContext('2d')!;
ctx.fillRect(0, 0, canvas.width, canvas.height);

const canvasTexture = new CanvasTexture(canvas);
const canvasCursor = new Vector2(9999, 9999);
const prevCanvasCursor = new Vector2(9999, 9999);

// --- Particle geometry: full plane, uniform grid ---
const aspect = sizes.width.value / sizes.height.value;
const particlesGeometry = new PlaneGeometry(10 * aspect, 10, 128, 128);
particlesGeometry.setIndex(null);
particlesGeometry.deleteAttribute('normal');

const count = particlesGeometry.attributes.position!.count;
const intensities = new Float32Array(count);
const angles = new Float32Array(count);

for (let i = 0; i < count; i++) {
  intensities[i] = Math.random();
  angles[i] = Math.random() * Math.PI * 2;
}

particlesGeometry.setAttribute('aIntensity', new BufferAttribute(intensities, 1));
particlesGeometry.setAttribute('aAngle', new BufferAttribute(angles, 1));

// --- Shader material ---
const particlesMaterial = new ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uResolution: new Uniform(new Vector2(1, 1)),
    uTime: new Uniform(0),
    uDisplacementTexture: new Uniform(canvasTexture),
    uColorPrimary: new Uniform(new Vector3(0.4, 0.267, 1.0)),
    uColorSecondary: new Uniform(new Vector3(0.702, 0.635, 1.0)), // #b3a2ff — avoids pink from CSS var
    uZoom: new Uniform(0.5),
    uSizeContrast: new Uniform(1.0),
    uSpeed: new Uniform(1.0),
    uDisplacementStrength: new Uniform(0.2),
  },
  transparent: true,
  depthWrite: false,
});

// Reactive resolution
const resolution = computed(
  () => new Vector2(sizes.width.value * sizes.pixelRatio.value, sizes.height.value * sizes.pixelRatio.value),
);

watch(
  resolution,
  (res) => {
    particlesMaterial.uniforms.uResolution!.value.copy(res);
  },
  { immediate: true },
);

// Controls

const uuid = inject('uuid')

const { palettePrimary, paletteSecondary } = useControls('🫟 palette', {
  primary: {
    value: '#0091ff',
    type: 'color',
  },
  secondary: {
    value: '#d400ff',
    type: 'color',
  },
}, { uuid })

watch([palettePrimary, paletteSecondary], ([newPalettePrimary, newPaletteSecondary]) => {
  particlesMaterial.uniforms.uColorPrimary!.value = new Color(newPalettePrimary);
  particlesMaterial.uniforms.uColorSecondary!.value = new Color(newPaletteSecondary);
})

const { particlesZoom, particlesContrast, particlesSpeed } = useControls('🎬 particles', {
  zoom: {
    value: 0.5,
    min: 0.1,
    max: 2.0,
    step: 0.01,
  },
  contrast: {
    value: 1.0,
    min: 0.1,
    max: 5.0,
    step: 0.01,
  },
  speed: {
    value: 1.0,
    min: 0.0,
    max: 5.0,
    step: 0.01,
  },
}, { uuid })

watch(particlesZoom, (val) => {
  particlesMaterial.uniforms.uZoom!.value = val;
})

watch(particlesContrast, (val) => {
  particlesMaterial.uniforms.uSizeContrast!.value = val;
})

watch(particlesSpeed, (val) => {
  particlesMaterial.uniforms.uSpeed!.value = val;
})
const { cursorStrength, cursorRadius, cursorRecovery } = useControls('👆 cursor', {
  strength: { value: 0.2, min: 0.0, max: 0.5, step: 0.01 },
  radius: { value: 0.5, min: 0.1, max: 1.0, step: 0.01 },
  recovery: { value: 0.06, min: 0.01, max: 0.3, step: 0.01 },
}, { uuid })

watch(cursorStrength, val => particlesMaterial.uniforms.uDisplacementStrength!.value = val, { immediate: true })

const { postprocessingChromaticAberration, postprocessingBloom } = useControls('👾 postprocessing', {
  chromaticAberration: {
    value: false,
    type: 'boolean',
  },
  bloom: {
    value: false,
    type: 'boolean',
  },
}, { uuid })

const chromaticAberrationOffset = computed(() =>
  postprocessingChromaticAberration.value ? new Vector2(0.001, 0.001) : new Vector2(0, 0),
)

const bloomIntensity = computed(() =>
  postprocessingBloom.value ? 1 : 0,
)


// --- Pointer: capture UV for cursor displacement ---
const onMouseMove = (event: TresPointerEvent) => {
  const uv = event.intersection?.uv;

  if (uv) {
    canvasCursor.set(uv.x * canvas.width, (1 - uv.y) * canvas.height);
  }
};

// --- Render loop ---
const { onBeforeRender } = useLoop();

onBeforeRender(({ elapsed }) => {
  particlesMaterial.uniforms.uTime!.value = elapsed;

  // Fade canvas to black
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = cursorRecovery.value;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Speed-scaled radial glow at cursor
  const dist = canvasCursor.distanceTo(prevCanvasCursor);
  prevCanvasCursor.copy(canvasCursor);
  const speedAlpha = Math.min(dist * 0.1, 1);

  if (speedAlpha > 0) {
    const r = canvas.width * cursorRadius!.value;
    const glow = ctx.createRadialGradient(canvasCursor.x, canvasCursor.y, 0, canvasCursor.x, canvasCursor.y, r);
    glow.addColorStop(0, 'rgba(255,255,255,1)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalCompositeOperation = 'lighten';
    ctx.globalAlpha = speedAlpha;
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(canvasCursor.x, canvasCursor.y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  canvasTexture.needsUpdate = true;
});
</script>

<template>
  <TresPoints :geometry="particlesGeometry" :material="particlesMaterial" />
  <TresMesh :visible="false" @pointermove="onMouseMove">
    <TresPlaneGeometry :args="[15 * aspect, 15]" />
    <TresMeshBasicMaterial />
  </TresMesh>
  <Suspense>
    <EffectComposerPmndrs>
      <ChromaticAberrationPmndrs :offset="chromaticAberrationOffset" radial-modulation />
      <BloomPmndrs :intensity="bloomIntensity" :luminance-threshold="0" :luminance-smoothing="0.3" mipmap-blur />
    </EffectComposerPmndrs>
  </Suspense>
</template>
