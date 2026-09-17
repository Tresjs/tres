// Fake volumetric: a short raymarch through the unit cube, accumulating a
// domain-warped fBm run through a two-stop colour ramp. Stands in for Blender's
// Noise Texture (Scale / Detail / Roughness / Lacunarity / Distortion) feeding
// a Color Ramp into a Principled Volume.
//
// The noise field is baked into a tiling 3D texture (see fogNoiseTexture.ts),
// so a step costs two trilinear fetches instead of eight procedural noises.
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

// Density at one point of the box, in local space (-0.5..0.5).
float sampleDensity(vec3 local) {
  vec3 p = local / uNoiseScale
    + vec3(uSeed * 17.0, uTime * uDriftSpeed, uSeed * 3.7);

  // Domain warp, standing in for the Vector Math distortion feeding the Noise Texture.
  vec3 warp = (texture(uNoise, p / uNoisePeriod).gba * 2.0 - 1.0) * uDistortion;
  float n = texture(uNoise, (p + warp) / uNoisePeriod).r;
  float ramped = smoothstep(uRampLow, uRampHigh, n);

  // Soft falloff toward the cube faces so the box bounds do not read as a hard cube.
  vec3 edgeDist = 0.5 - abs(local);
  float edgeFade = smoothstep(0.0, 0.18, min(min(edgeDist.x, edgeDist.y), edgeDist.z));

  return ramped * edgeFade;
}

// Interleaved gradient noise: a per-pixel offset for the first step, so the
// march can use few steps without the sample planes showing as bands.
float jitter(vec2 fragCoord) {
  return fract(52.9829189 * fract(0.06711056 * fragCoord.x + 0.00583715 * fragCoord.y));
}

void main() {
  vec3 rayDir = normalize(vLocalPosition - vCameraLocal);

  // Slab test against the unit cube. The mesh draws its back faces, so the
  // fragment is the exit point and the entry is either the front face or the
  // camera itself when it sits inside the box.
  vec3 invDir = 1.0 / rayDir;
  vec3 t0 = (vec3(-0.5) - vCameraLocal) * invDir;
  vec3 t1 = (vec3(0.5) - vCameraLocal) * invDir;
  vec3 tMin = min(t0, t1);
  vec3 tMax = max(t0, t1);
  float tNear = max(max(max(tMin.x, tMin.y), tMin.z), 0.0);
  float tFar = min(min(tMax.x, tMax.y), tMax.z);
  if (tFar <= tNear) { discard; }

  float dt = (tFar - tNear) / float(STEPS);
  // Step length in world units, so a stretched box is not denser along its long axis.
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
