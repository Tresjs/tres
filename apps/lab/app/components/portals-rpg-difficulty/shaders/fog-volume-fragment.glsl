// Raymarch through the unit cube, standing in for Blender's Noise Texture -> Color Ramp -> Principled
// Volume. The noise is baked into a tiling 3D texture (fogNoiseTexture.ts): two fetches per step, not eight noises.
precision highp sampler3D;

uniform sampler3D uNoise;
uniform float uNoisePeriod;
uniform vec3 uColor;
uniform vec3 uScale;
uniform float uSeed;
uniform float uNoiseScale;
uniform float uDistortion;
uniform float uRampLow;
uniform float uRampHigh;
uniform float uDensity;
uniform float uDriftSpeed;
uniform float uTime;

varying vec3 vLocalPosition;
varying vec3 vCameraLocal;

// STEPS comes in through material.defines: GLSL loops need a constant bound.
#ifndef STEPS
#define STEPS 10
#endif

float sampleDensity(vec3 local) {
  vec3 p = local / uNoiseScale
    + vec3(uSeed * 17.0, uTime * uDriftSpeed, uSeed * 3.7);

  vec3 warp = (texture(uNoise, p / uNoisePeriod).gba * 2.0 - 1.0) * uDistortion;
  float n = texture(uNoise, (p + warp) / uNoisePeriod).r;
  float ramped = smoothstep(uRampLow, uRampHigh, n);

  // Fade toward the faces so the bounds do not read as a hard cube.
  vec3 edgeDist = 0.5 - abs(local);
  float edgeFade = smoothstep(0.0, 0.18, min(min(edgeDist.x, edgeDist.y), edgeDist.z));

  return ramped * edgeFade;
}

// Interleaved gradient noise offsets the first step so few steps do not band.
float jitter(vec2 fragCoord) {
  return fract(52.9829189 * fract(0.06711056 * fragCoord.x + 0.00583715 * fragCoord.y));
}

void main() {
  vec3 rayDir = normalize(vLocalPosition - vCameraLocal);

  // The mesh draws back faces, so the fragment is the exit point; entry is the front face
  // or the camera itself when it sits inside the box.
  vec3 invDir = 1.0 / rayDir;
  vec3 t0 = (vec3(-0.5) - vCameraLocal) * invDir;
  vec3 t1 = (vec3(0.5) - vCameraLocal) * invDir;
  vec3 tMin = min(t0, t1);
  vec3 tMax = max(t0, t1);
  float tNear = max(max(max(tMin.x, tMin.y), tMin.z), 0.0);
  float tFar = min(min(tMax.x, tMax.y), tMax.z);
  if (tFar <= tNear) { discard; }

  float dt = (tFar - tNear) / float(STEPS);
  // World-space step so a stretched box is not denser along its long axis.
  float stepWorld = length(rayDir * uScale) * dt;
  float offset = jitter(gl_FragCoord.xy);

  // Beer-Lambert: uDensity is the extinction per world unit at full noise.
  float transmittance = 1.0;
  for (int i = 0; i < STEPS; i++) {
    float t = tNear + (float(i) + offset) * dt;
    float d = sampleDensity(vCameraLocal + rayDir * t);
    transmittance *= exp(-d * uDensity * stepWorld);
    if (transmittance < 0.02) { break; }
  }

  gl_FragColor = vec4(uColor, 1.0 - transmittance);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
