// Injected into MeshStandardMaterial via onBeforeCompile, after <common> and
// after noise.glsl. Pushes each vertex along its normal by a drifting noise
// field so the orb surface churns, and rebuilds the normal from the displaced
// neighbourhood so the lit side moves with the bumps.

uniform float uOrbTime;
// Radius fraction the surface can move in or out.
uniform float uOrbAmplitude;
// Noise cells per unit of orb space. Set from the radius in Mage.vue so the
// blobs stay the same size relative to the orb whatever the model scale.
uniform float uOrbFrequency;
uniform float uOrbSpeed;
// Finite-difference step, a fraction of the radius.
uniform float uOrbEps;

// Signed displacement in radius fractions, read by the fragment patch. The
// glow material has a black base, so without this the churn would only show
// at the silhouette.
varying float vOrbAmount;

float orbAmount(vec3 pos) {
  vec3 p = pos * uOrbFrequency + vec3(0.0, uOrbTime * uOrbSpeed, uOrbTime * uOrbSpeed * 0.37);
  return turbulence(p) - 0.5;
}

vec3 orbDisplace(vec3 pos, vec3 nor) {
  return pos + nor * orbAmount(pos) * uOrbAmplitude;
}

// Position and normal after displacement. Called from <beginnormal_vertex>
// so the results are ready for the <begin_vertex> that follows it.
void orbWarp(out vec3 displaced, out vec3 displacedNormal) {
  vec3 nor = normalize(normal);
  vec3 axis = abs(nor.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 tangent = normalize(cross(axis, nor));
  vec3 bitangent = cross(nor, tangent);

  vOrbAmount = orbAmount(position);
  displaced = position + nor * vOrbAmount * uOrbAmplitude;
  vec3 dTangent = orbDisplace(position + tangent * uOrbEps, nor) - displaced;
  vec3 dBitangent = orbDisplace(position + bitangent * uOrbEps, nor) - displaced;
  displacedNormal = normalize(cross(dTangent, dBitangent));
}
