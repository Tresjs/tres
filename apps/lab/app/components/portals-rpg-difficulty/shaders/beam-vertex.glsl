// CustomShaderMaterial vertex stage for the heart-to-chest energy beam, after
// the twistedCylinder() of three.js webgpu_tsl_vfx_tornado. The geometry is a
// unit cylinder (radius 1, height 1, Y axis) that the component aims from the
// DemonHeart (V = 0, bottom) to the Knight's chest (V = 1, top). The cone
// taper comes from two radius uniforms so the Leches sliders change it
// without a geometry rebuild; the component scales the mesh only along Y.
//
// The same shader drives the bright layer and the dark shell. uRadiusOffset
// pushes the shell out a little so its streaks wrap around and cut through
// the bright ones.
uniform float uRadiusHeart;
uniform float uRadiusKnight;
uniform float uRadiusOffset;
uniform float uTurbulence;
uniform float uTurbulenceFreq;
uniform float uTimeScale;
uniform float uTime;

// Unit-circle direction around the axis. An angle varying would interpolate
// across the 2pi wrap; a vector does not.
varying vec2 vRing;
varying float vAlong;

void main() {
  vAlong = uv.y;
  vRing = normalize(position.xz);
  float angle = atan(position.z, position.x);

  float radius = mix(uRadiusHeart, uRadiusKnight, vAlong) + uRadiusOffset;
  // Tornado turbulence: a two-lobed ripple screwing along the beam toward the
  // heart (same direction as the ribbons), scaled by the local radius so the
  // thin end near the heart does not fold over.
  radius += sin((vAlong + uTime * uTimeScale) * uTurbulenceFreq + angle * 2.0) * uTurbulence * radius;

  csm_Position = vec3(position.x * radius, position.y, position.z * radius);
}
