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

const int OCTAVES = 3;

float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

float valueNoise(vec3 p) {
  vec3 cell = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);

  float n000 = hash13(cell + vec3(0.0, 0.0, 0.0));
  float n100 = hash13(cell + vec3(1.0, 0.0, 0.0));
  float n010 = hash13(cell + vec3(0.0, 1.0, 0.0));
  float n110 = hash13(cell + vec3(1.0, 1.0, 0.0));
  float n001 = hash13(cell + vec3(0.0, 0.0, 1.0));
  float n101 = hash13(cell + vec3(1.0, 0.0, 1.0));
  float n011 = hash13(cell + vec3(0.0, 1.0, 1.0));
  float n111 = hash13(cell + vec3(1.0, 1.0, 1.0));

  return mix(
    mix(mix(n000, n100, u.x), mix(n010, n110, u.x), u.y),
    mix(mix(n001, n101, u.x), mix(n011, n111, u.x), u.y),
    u.z
  );
}

float turbulence(vec3 p) {
  float sum = 0.0;
  float amp = 1.0;
  float total = 0.0;

  for (int i = 0; i < OCTAVES; i++) {
    sum += valueNoise(p) * amp;
    total += amp;
    amp *= 0.5;
    p *= 2.0;
  }

  return sum / total;
}

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
