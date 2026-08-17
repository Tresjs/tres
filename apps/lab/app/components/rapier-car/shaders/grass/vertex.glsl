uniform float uTime;
uniform float uBladeWidth;
uniform float uBladeHeight;
uniform float uBladeHeightRandomness;
uniform float uWindStrength;
uniform float uWindFrequency;
uniform float uWindSpeed;
uniform vec2 uWindDirection;
uniform float uFieldSize;

#ifdef USE_TRAMPLE
uniform sampler2D uTrampleMap;
uniform vec2 uTrampleOrigin;
uniform float uTrampleSize;
#endif

attribute float tipness;
attribute vec2 anchor;
attribute float random;
attribute float yaw;
attribute float heightNoise;
attribute float colorNoise;

varying float vTipness;
varying float vColorNoise;
varying vec2 vUv;

vec2 rotate(vec2 v, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return vec2(v.x * c - v.y * s, v.x * s + v.y * c);
}

void main() {
  // Trample: sample the car's world-aligned trail at this blade's anchor
  float trample = 0.0;
  #ifdef USE_TRAMPLE
  vec2 trampleUv = (anchor - uTrampleOrigin) / uTrampleSize + 0.5;
  trample = texture2D(uTrampleMap, trampleUv).r;
  #endif

  // Dual-frequency height: per-blade randomness x baked patch noise,
  // crushed where trampled (down to 25% height under a full stamp)
  float height = uBladeHeight
    * mix(1.0, random, uBladeHeightRandomness)
    * heightNoise
    * (1.0 - trample * 0.75);

  vec3 local = vec3(position.x * uBladeWidth, position.y * height, 0.0);

  // Random yaw around the blade base
  local.xz = rotate(local.xz, yaw);

  // Wind: traveling wave across the field, bend scales with tipness so the
  // base stays planted and the tip travels furthest (bend, not shear).
  // Pinned-down trampled blades barely sway
  float phase = dot(anchor, uWindDirection) * uWindFrequency + uTime * uWindSpeed;
  float wave = sin(phase) + 0.5 * sin(phase * 2.3 + 1.7);
  vec2 bend = uWindDirection * wave * uWindStrength * tipness * (1.0 - trample);

  vec3 worldPos = vec3(
    local.x + anchor.x + bend.x,
    local.y,
    local.z + anchor.y + bend.y
  );

  // Map the world anchor into [0,1] to sample the ground diffuse (splat) map
  vUv = anchor / uFieldSize + 0.5;

  vTipness = tipness;
  vColorNoise = colorNoise;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPos, 1.0);
}
