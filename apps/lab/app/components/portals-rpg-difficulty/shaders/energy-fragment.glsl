// Pentagram curtains, CSM fragment over MeshStandardMaterial: lit diffuse plus emission with
// straight (not premultiplied) alpha. Requires blender-noise.glsl and avernus-fields.glsl before it.
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
  // The sample moves down the UV so the wisps rise; the masks read the untouched UV so the
  // base and tops stay put. The curtain is flat, so the noise Z axis is free for churn.
  vec3 drift = vec3(0.0, -uTime * uDriftSpeed, uTime * uChurnSpeed);
  vec3 q = vec3(vEnergyUv, 0.0) * vec3(8.5, 1.6, 1.0) * uWispScale + drift;
  float noiseFac = blenderNoise3Fac(q * 2.4, 3.1, 0.65, 0.9);
  // The snapshot slope is 8; a higher contrast hardens the wisp edge toward the beam's ribbons.
  float threshold = 0.43 * vEnergyUv.y + 0.29;
  float density = clamp(uContrast * (noiseFac - threshold), 0.0, 1.0);

  // Offset harmonic so the surge never reads as a metronome.
  float phase = uTime * uPulseSpeed * 6.28318 - vEnergyUv.y * 3.0;
  float pulse = 0.5 + 0.35 * sin(phase) + 0.15 * sin(phase * 2.3 + 1.7);
  float rimMod = 1.0 + uPulseAmount * 1.5 * (pulse - 0.5);

  // uEdge = 1 is the snapshot's linear 0.78 * density.
  float alpha = 0.78 * smoothstep(0.0, uEdge, density) * energyTopFade(vEnergyUv.y) * energyEndFade(vEnergyUv.x)
    * uOpacity;
  if (alpha < uAlphaCutoff) { discard; }

  // density 0 is the crimson rim, 1 the dark core; uCoreDark < 1 keeps more of the wisp on the rim stops.
  float shade = clamp(density * uCoreDark, 0.0, 1.0);
  vec3 color = energyPalette(shade, uPalette0, uPalette1, uPalette2, uPalette3);

  csm_DiffuseColor = vec4(color, alpha);
  csm_Emissive = color * (5.0 * energyRim(shade)) * uRimGain * rimMod;
  csm_Roughness = 0.9;
}
