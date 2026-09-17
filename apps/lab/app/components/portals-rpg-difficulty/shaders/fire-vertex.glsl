uniform float uHeightMin;
uniform float uHeightRange;
uniform vec3 uAnimator;
uniform float uMarbleSize;
uniform float uMarbleTurbulence;
uniform float uMarbleVeins;
uniform float uDisplaceStrength;
uniform float uDisplaceMid;
uniform float uBaseMask;

varying float vHeight;
varying vec3 vNormalView;
varying vec3 vViewDir;

// hash13 / valueNoise / turbulence come from noise.glsl, prepended in Fireplace.vue.

float marble(vec3 p) {
  float veins = uMarbleVeins * (p.x + p.y + p.z);
  return 0.5 + 0.5 * sin(veins + uMarbleTurbulence * turbulence(p / uMarbleSize));
}

vec3 displace(vec3 pos, vec3 nor, float mask) {
  float amount = (marble(pos - uAnimator) - uDisplaceMid) * uDisplaceStrength;
  return pos + nor * amount * mask;
}

void main() {
  vec3 nor = normalize(normal);
  float mask = smoothstep(0.0, max(uBaseMask, 1e-4), (position.y - uHeightMin) / uHeightRange);

  vec3 axis = abs(nor.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 tangent = normalize(cross(axis, nor));
  vec3 bitangent = cross(nor, tangent);

  vec3 displaced = displace(position, nor, mask);

  float eps = 0.02 * uHeightRange;
  vec3 dTangent = displace(position + tangent * eps, nor, mask) - displaced;
  vec3 dBitangent = displace(position + bitangent * eps, nor, mask) - displaced;
  vec3 displacedNormal = normalize(cross(dTangent, dBitangent));

  vHeight = (displaced.y - uHeightMin) / uHeightRange;

  vec4 viewPosition = modelViewMatrix * vec4(displaced, 1.0);
  vNormalView = normalize(normalMatrix * displacedNormal);
  vViewDir = normalize(-viewPosition.xyz);

  gl_Position = projectionMatrix * viewPosition;
}
