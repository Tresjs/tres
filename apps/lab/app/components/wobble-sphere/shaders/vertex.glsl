uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

#include ./includes/simplexNoise4d.glsl

float getWobble(vec3 position) {
  return simplexNoise4d(vec4(position, 0.0));
}

vec3 orthogonal(vec3 v) {
  return normalize(abs(v.x) > abs(v.z) ?
    vec3(-v.y, v.x, 0.0) :
    vec3(0.0, -v.z, v.y));
}

void main() {
  vec3 tangent = orthogonal(normal);
  vec3 biTangent = cross(normal, tangent.xyz);

  // Neighboring vertices
  float shift = 0.01;
  vec3 positionA = csm_Position + tangent.xyz * shift;
  vec3 positionB = csm_Position + biTangent.xyz * shift;

  // Wobble
  float wobble = getWobble(csm_Position);
  csm_Position += wobble * normal;
  positionA += getWobble(positionA) * normal;
  positionB += getWobble(positionB) * normal;

  // Compute normals
  vec3 toA = normalize(positionA - csm_Position);
  vec3 toB = normalize(positionB - csm_Position);
  csm_Normal = cross(toA, toB);
}