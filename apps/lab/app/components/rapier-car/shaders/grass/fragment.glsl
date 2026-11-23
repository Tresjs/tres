uniform sampler2D uDiffuse;
uniform float uShadowIntensity;
uniform vec3 uTint;

varying float vTipness;
varying float vColorNoise;
varying vec2 vUv;

void main() {
  // Base color comes from the ground splat map, sampled at the blade anchor
  vec3 base = texture2D(uDiffuse, vUv).rgb;

  // Subtle per-blade variation so neighbours sampling the same texel differ
  base *= mix(0.85, 1.15, vColorNoise);

  // Darkening the base fakes ambient occlusion: dense grass is darker at the soil
  float ao = (1.0 - vTipness) * uShadowIntensity;
  // Unlit material: the tint stands in for scene lighting (e.g. night)
  vec3 color = mix(base, base * 0.35, ao) * uTint;

  gl_FragColor = vec4(color, 1.0);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
