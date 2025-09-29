<script setup lang="ts">
import { useTres } from '@tresjs/core'
import type { TresRenderer } from '@tresjs/core'
import type { Camera, Scene } from 'three'
import { ShaderChunk, WebGLRenderer } from 'three'
import { onUnmounted, watch } from 'vue'

// NOTE: Sources
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_shadowmap_pcss.html
// https://github.com/pmndrs/drei/blob/master/src/core/softShadows.tsx

interface SoftShadowsProps {
  /** Size of the light source (the larger the softer the light), default: 25 */
  size?: number
  /** Number of samples (more samples less noise but more expensive), default: 10 */
  samples?: number
  /** Depth focus, use it to shift the focal point (where the shadow is the sharpest), default: 0 (the beginning) */
  focus?: number
}

const props = withDefaults(defineProps<SoftShadowsProps>(), {
  size: 25,
  samples: 10,
  focus: 0,
})

const PCSSGetShadow = `
return PCSS( shadowMap, shadowCoord );
`
const getPcss = ({ focus = 0, size = 25, samples = 10 }: SoftShadowsProps = {}) => `
#define PENUMBRA_FILTER_SIZE float(${size})
#define RGB_NOISE_FUNCTION(uv) (randRGB(uv))
vec3 randRGB(vec2 uv) {
  return vec3(
    fract(sin(dot(uv, vec2(12.75613, 38.12123))) * 13234.76575),
    fract(sin(dot(uv, vec2(19.45531, 58.46547))) * 43678.23431),
    fract(sin(dot(uv, vec2(23.67817, 78.23121))) * 93567.23423)
  );
}

vec3 lowPassRandRGB(vec2 uv) {
  // 3x3 convolution (average)
  // can be implemented as separable with an extra buffer for a total of 6 samples instead of 9
  vec3 result = vec3(0);
  result += RGB_NOISE_FUNCTION(uv + vec2(-1.0, -1.0));
  result += RGB_NOISE_FUNCTION(uv + vec2(-1.0,  0.0));
  result += RGB_NOISE_FUNCTION(uv + vec2(-1.0, +1.0));
  result += RGB_NOISE_FUNCTION(uv + vec2( 0.0, -1.0));
  result += RGB_NOISE_FUNCTION(uv + vec2( 0.0,  0.0));
  result += RGB_NOISE_FUNCTION(uv + vec2( 0.0, +1.0));
  result += RGB_NOISE_FUNCTION(uv + vec2(+1.0, -1.0));
  result += RGB_NOISE_FUNCTION(uv + vec2(+1.0,  0.0));
  result += RGB_NOISE_FUNCTION(uv + vec2(+1.0, +1.0));
  result *= 0.111111111; // 1.0 / 9.0
  return result;
}
vec3 highPassRandRGB(vec2 uv) {
  // by subtracting the low-pass signal from the original signal, we're being left with the high-pass signal
  // hp(x) = x - lp(x)
  return RGB_NOISE_FUNCTION(uv) - lowPassRandRGB(uv) + 0.5;
}


vec2 vogelDiskSample(int sampleIndex, int sampleCount, float angle) {
  const float goldenAngle = 2.399963f; // radians
  float r = sqrt(float(sampleIndex) + 0.5f) / sqrt(float(sampleCount));
  float theta = float(sampleIndex) * goldenAngle + angle;
  float sine = sin(theta);
  float cosine = cos(theta);
  return vec2(cosine, sine) * r;
}
float penumbraSize( const in float zReceiver, const in float zBlocker ) { // Parallel plane estimation
  return (zReceiver - zBlocker) / zBlocker;
}
float findBlocker(sampler2D shadowMap, vec2 uv, float compare, float angle) {
  float texelSize = 1.0 / float(textureSize(shadowMap, 0).x);
  float blockerDepthSum = float(${focus});
  float blockers = 0.0;

  int j = 0;
  vec2 offset = vec2(0.);
  float depth = 0.;

  #pragma unroll_loop_start
  for(int i = 0; i < ${samples}; i ++) {
    offset = (vogelDiskSample(j, ${samples}, angle) * texelSize) * 2.0 * PENUMBRA_FILTER_SIZE;
    depth = unpackRGBAToDepth( texture2D( shadowMap, uv + offset));
    if (depth < compare) {
      blockerDepthSum += depth;
      blockers++;
    }
    j++;
  }
  #pragma unroll_loop_end

  if (blockers > 0.0) {
    return blockerDepthSum / blockers;
  }
  return -1.0;
}

        
float vogelFilter(sampler2D shadowMap, vec2 uv, float zReceiver, float filterRadius, float angle) {
  float texelSize = 1.0 / float(textureSize(shadowMap, 0).x);
  float shadow = 0.0f;
  int j = 0;
  vec2 vogelSample = vec2(0.0);
  vec2 offset = vec2(0.0);
  #pragma unroll_loop_start
  for (int i = 0; i < ${samples}; i++) {
    vogelSample = vogelDiskSample(j, ${samples}, angle) * texelSize;
    offset = vogelSample * (1.0 + filterRadius * float(${size}));
    shadow += step( zReceiver, unpackRGBAToDepth( texture2D( shadowMap, uv + offset ) ) );
    j++;
  }
  #pragma unroll_loop_end
  return shadow * 1.0 / ${samples}.0;
}

float PCSS (sampler2D shadowMap, vec4 coords) {
  vec2 uv = coords.xy;
  float zReceiver = coords.z; // Assumed to be eye-space z in this code
  float angle = highPassRandRGB(gl_FragCoord.xy).r * PI2;
  float avgBlockerDepth = findBlocker(shadowMap, uv, zReceiver, angle);
  if (avgBlockerDepth == -1.0) {
    return 1.0;
  }
  float penumbraRatio = penumbraSize(zReceiver, avgBlockerDepth);
  return vogelFilter(shadowMap, uv, zReceiver, 1.25 * penumbraRatio, angle);
}`

const originalShadowsFragment = ShaderChunk.shadowmap_pars_fragment
const { renderer, scene, camera } = useTres()

function injectSoftShadowsFragment(renderer: TresRenderer, props: SoftShadowsProps) {
  // overwrite shadowmap code

  let shader = originalShadowsFragment

  shader = shader.replace(
    '#ifdef USE_SHADOWMAP',
    `#ifdef USE_SHADOWMAP
    ${getPcss(props)}`,
  )

  shader = shader.replace(
    '#if defined( SHADOWMAP_TYPE_PCF )',
    `${PCSSGetShadow} 
    #if defined( SHADOWMAP_TYPE_PCF )`,
  )

  ShaderChunk.shadowmap_pars_fragment = shader

  // renderer
  renderer.shadowMap.enabled = true
}

function reset(renderer: TresRenderer, scene: Scene, camera: Camera) {
  if (renderer instanceof WebGLRenderer) {
    scene.traverse((object) => {
      if ('material' in object && object.material) {
        renderer.properties.remove(object.material)
        if (typeof object.material === 'object' && 'dispose' in object.material && typeof object.material.dispose === 'function') { object.material.dispose?.() }
      }
    })
    if (renderer.info.programs) {
      renderer.info.programs.length = 0
    }
  }
  renderer.compile(scene, camera)
}

onUnmounted(() => {
  if (camera.value) {
    ShaderChunk.shadowmap_pars_fragment = originalShadowsFragment
    reset(renderer, scene.value, camera.value)
  }
})

watch(props, () => {
  if (camera.value) {
    injectSoftShadowsFragment(renderer, props)
    reset(renderer, scene.value, camera.value)
  }
}, { immediate: true })
</script>

<template>
  <TresGroup />
</template>
