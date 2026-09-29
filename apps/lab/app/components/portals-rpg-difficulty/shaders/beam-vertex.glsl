// Beam vertex stage after twistedCylinder() of three.js webgpu_tsl_vfx_tornado. Unit cylinder on Y,
// V = 0 at the heart, V = 1 at the knight's chest. Radius uniforms taper it without a geometry
// rebuild; uRadiusOffset pushes the dark shell out so its streaks cut through the bright ones.
uniform float uRadiusHeart;
uniform float uRadiusKnight;
uniform float uRadiusOffset;
uniform float uTurbulence;
uniform float uTurbulenceFreq;
uniform float uTimeScale;
uniform float uTime;

// A vector varying interpolates across the 2pi wrap; an angle would not.
varying vec2 vRing;
varying float vAlong;

void main() {
  vAlong = uv.y;
  vRing = normalize(position.xz);
  float angle = atan(position.z, position.x);

  float radius = mix(uRadiusHeart, uRadiusKnight, vAlong) + uRadiusOffset;
  // Scaled by the local radius so the thin end near the heart does not fold over.
  radius += sin((vAlong + uTime * uTimeScale) * uTurbulenceFreq + angle * 2.0) * uTurbulence * radius;

  csm_Position = vec3(position.x * radius, position.y, position.z * radius);
}
