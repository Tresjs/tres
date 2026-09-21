// CustomShaderMaterial fragment stage for the heart-to-chest energy beam over
// MeshStandardMaterial. The streak structure comes from the emissive/dark
// cylinders of three.js webgpu_tsl_vfx_tornado: two stretched, skewed noise
// fields multiplied and cut with a hard step, so the beam reads as ribbons
// wrapped in black ribbons rather than as smoke. The shading of the ribbons
// is the pentagram curtains' MAT_Pentagram_Dark_Energy: the streak mask plays
// the wisp density, so a ribbon has a bright crimson rim and a dark core, lit
// diffuse plus emission with straight alpha, from avernus-fields.glsl.
//
// Requires blender-noise.glsl and avernus-fields.glsl before it. The
// reference reads a tiling perlin texture in UV space; here the noise is
// sampled on the seamless ring vector (cos, sin) so no seam shows on the tube,
// and the reference's skew (u += v) becomes a rotation of the ring by the
// distance along the beam.
uniform float uOpacity;
uniform float uDarkOpacity;
uniform float uRimGain;
uniform float uCoreDark;
uniform float uEdge;
uniform float uSkew;
uniform float uStreakScale;
uniform float uTimeScale;
uniform float uTime;
// Seed offset so the dark shell reads a different field than the bright layer.
uniform float uSeed;
// 1 for the dark shell: black, harder edge, longer fade in at the heart.
uniform float uDark;
uniform vec3 uPalette0;
uniform vec3 uPalette1;
uniform vec3 uPalette2;
uniform vec3 uPalette3;

varying vec2 vRing;
varying float vAlong;

const float TAU = 6.28318530718;

vec2 rotate(vec2 v, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec2(v.x * c - v.y * s, v.x * s + v.y * c);
}

// One tornado noise layer. In the reference: uv + (t * uSpeed, -t), skewed by
// uSkew on x, scaled by `scale`, then texture.r remapped 0.45..0.7. Here x is
// the ring angle in turns, so the skew and the scroll rotate the ring, and
// scale.x is the number of noise periods around the circumference.
float streak(float uSpeed, vec2 scale, float seed) {
  // Negated so positive speed scrolls the ribbons toward V = 0, the heart.
  float t = -uTime * uTimeScale;
  float turns = t * uSpeed + uSkew * (vAlong - t);
  vec2 r = rotate(vRing, turns * TAU) * (scale.x / TAU);
  float along = (vAlong - t) * scale.y;
  float n = blenderNoise3Fac(vec3(r, along + seed) * uStreakScale, 0.0, 0.5, 0.0);
  return clamp((n - 0.45) / 0.25, 0.0, 1.0);
}

void main() {
  float noise1 = streak(1.0, vec2(2.0, 0.25), uSeed);
  float noise2 = streak(0.5, vec2(5.0, 1.0), uSeed + 37.1);

  // Reference fades: 0.1 (bright) / 0.2 (dark) in at the base, 0.4 out at the top.
  float fadeIn = smoothstep(0.0, mix(0.1, 0.2, uDark), vAlong);
  float fadeOut = smoothstep(0.0, 0.4, 1.0 - vAlong);
  float effect = noise1 * noise2 * min(fadeIn, fadeOut);

  float alpha = smoothstep(0.0, mix(uEdge, 0.01, uDark), effect) * mix(uOpacity, uDarkOpacity, uDark);
  // Depth writes stay on so the two layers occlude each other; empty
  // fragments must not write depth over the scene behind the beam.
  if (alpha < 0.01) { discard; }

  // Curtain shading: density 0 is the bright crimson rim, 1 the dark core, so
  // the ribbon edge (effect ~ 0) glows and its middle goes dark. uCoreDark
  // sets how fast the ribbon darkens away from its edge.
  float density = clamp(effect * uCoreDark, 0.0, 1.0);
  vec3 color = energyPalette(density, uPalette0, uPalette1, uPalette2, uPalette3);
  vec3 emission = color * (5.0 * energyRim(density)) * uRimGain;

  csm_DiffuseColor = vec4(mix(color, vec3(0.0), uDark), alpha);
  csm_Emissive = emission * (1.0 - uDark);
  csm_Roughness = 0.9;
}
