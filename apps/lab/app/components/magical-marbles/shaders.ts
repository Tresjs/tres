export const vertex = /* glsl */ `
  varying vec3 v_pos;
  varying vec3 v_dir;

    void main() {
        v_pos = position;
        v_dir = position - cameraPosition; // Points from camera to vertex
    }
`

export const fragment = /* glsl */ `
#define FLIP vec2(1., -1.)

uniform vec3 colorA;
uniform vec3 colorB;
uniform sampler2D heightMap;
uniform sampler2D displacementMap;
uniform int iterations;
uniform float depth;
uniform float smoothing;
uniform float displacement;
uniform float uTime;
uniform float uDisplacementSpeed;

varying vec3 v_pos;
varying vec3 v_dir;

vec2 getUv(vec3 p) {
  vec3 n = normalize(p);
  float u = atan(n.z, n.x) / (2.0 * 3.141592653589793238) + 0.5;
  float v = asin(n.y) / 3.141592653589793238 + 0.5;
  return vec2(u, v);
}

vec3 displacePoint(vec3 p, float strength) {
  vec2 uv = getUv(p);
  vec2 scroll = vec2(((uTime + 1.0) * (uDisplacementSpeed * 0.5)), 0.0);

  vec3 displaceA = texture(displacementMap, uv + scroll).rgb - 0.5;
  vec3 displaceB = texture(displacementMap, uv * FLIP - scroll).rgb - 0.5;

  return p + strength * uDisplacementSpeed * (displaceA + displaceB);
}

vec3 marchMarble(vec3 rayOrigin, vec3 rayDir) {
  float invIterations = 1.0 / float(iterations);
  vec3 deltaRay = rayDir * invIterations * depth * uDisplacementSpeed;
  vec3 p = rayOrigin;
  float totalVolume = 0.0;

  for (int i = 0; i < 256; ++i) {
    if (i >= iterations) break;

    vec3 displaced = displacePoint(p, displacement);
    vec2 uv = getUv(displaced);
    float heightMapVal = texture(heightMap, uv).r;

    float height = length(p);
    float cutoff = 1.0 - float(i) * invIterations;
    float slice = smoothstep(cutoff, cutoff + smoothing, heightMapVal);

    totalVolume += slice * invIterations;
    p += deltaRay;
  }

  return mix(colorA, colorB, totalVolume);
}

void main() {
  vec3 rayDir = normalize(v_dir);
  vec3 rayOrigin = v_pos;

  vec3 rgb = marchMarble(rayOrigin, rayDir);
  csm_DiffuseColor = vec4(rgb, 1.0);
}
`
