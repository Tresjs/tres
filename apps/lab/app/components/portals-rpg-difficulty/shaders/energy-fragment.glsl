// CustomShaderMaterial fragment stage for the five pentagram energy curtains
// over MeshStandardMaterial. Blender mixes a transparent BSDF with the lit
// emissive surface by the opacity; here that is a lit diffuse plus emission
// written with straight alpha and normal blending. RGB is not premultiplied.
//
// Requires blender-noise.glsl and avernus-fields.glsl before it. Contrast,
// edge and core darkness are additions over the snapshot to bring the wisps
// closer to the hard-edged crimson ribbons of the beam (beam-fragment.glsl)
// while keeping their rising, fire-like motion.
uniform float uOpacity;
uniform float uRimGain;
uniform float uWispScale;
uniform float uContrast;
uniform float uEdge;
uniform float uCoreDark;
uniform float uAlphaCutoff;
uniform float uDriftSpeed;
uniform float uChurnSpeed;
uniform float uPulseSpeed;
uniform float uPulseAmount;
uniform float uTime;
uniform vec3 uPalette0;
uniform vec3 uPalette1;
uniform vec3 uPalette2;
uniform vec3 uPalette3;

varying vec2 vEnergyUv;

void main() {
  // Upward drift: move the sample down the UV domain so the wisps rise. The
  // masks read the untouched UV, so the groove base and the dissolving tops
  // never move. The curtain is flat (UV z = 0), so the noise Z axis is free:
  // churning along it makes the wisps flicker instead of only scrolling.
  vec3 drift = vec3(0.0, -uTime * uDriftSpeed, uTime * uChurnSpeed);
  // Vertical_Wisp_Stretch -> Turbulent_Energy
  vec3 q = vec3(vEnergyUv, 0.0) * vec3(8.5, 1.6, 1.0) * uWispScale + drift;
  float noiseFac = blenderNoise3Fac(q * 2.4, 3.1, 0.65, 0.9);
  // Dissolve_With_Height, Wisp_Density, Soft_Wisp_Edges. The snapshot slope
  // is 8; a higher contrast hardens the wisp edge toward the beam's ribbons.
  float threshold = 0.43 * vEnergyUv.y + 0.29;
  float density = clamp(uContrast * (noiseFac - threshold), 0.0, 1.0);

  // Surge that climbs the curtain: a slow wave along V with a faster, offset
  // harmonic so it never reads as a metronome. 0..1, centred on 0.5.
  float phase = uTime * uPulseSpeed * 6.28318 - vEnergyUv.y * 3.0;
  float pulse = 0.5 + 0.35 * sin(phase) + 0.15 * sin(phase * 2.3 + 1.7);
  // The pulse only drives the rim: it brightens on the crest and dims on the
  // trough around its control value. Opacity stays steady.
  float rimMod = 1.0 + uPulseAmount * 1.5 * (pulse - 0.5);

  // Wisps_Height_Fade, Wisps_End_Fade, Energy_Opacity. uEdge = 1 is the
  // snapshot's linear 0.78 * density; smaller values cut the wisp harder.
  float alpha = 0.78 * smoothstep(0.0, uEdge, density) * energyTopFade(vEnergyUv.y) * energyEndFade(vEnergyUv.x)
    * uOpacity;
  if (alpha < uAlphaCutoff) { discard; }

  // Palette lookup: density 0 is the crimson rim, 1 the dark core. uCoreDark
  // below 1 keeps more of the wisp on the crimson stops, like the beam.
  float shade = clamp(density * uCoreDark, 0.0, 1.0);
  vec3 color = energyPalette(shade, uPalette0, uPalette1, uPalette2, uPalette3);

  csm_DiffuseColor = vec4(color, alpha);
  csm_Emissive = color * (5.0 * energyRim(shade)) * uRimGain * rimMod;
  csm_Roughness = 0.9;
}
