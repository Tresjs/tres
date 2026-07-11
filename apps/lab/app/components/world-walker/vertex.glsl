attribute vec2 aCorner;
attribute vec2 aUv;
attribute vec3 aTint;
attribute vec4 aData;

uniform float uTime;
uniform float uWindStrength;
uniform float uWindSpeed;
uniform vec2 uWindDir;
uniform vec3 uLightDir;
uniform vec3 uSunColor;
uniform vec3 uAmbientColor;
uniform float uFadeStart;
uniform float uFadeEnd;

varying vec2 vUv;
varying vec2 vNoiseUv;
varying vec3 vLight;
varying float vFade;

void main() {
  // camera right projected onto the ground plane so tufts stay upright when orbiting overhead
  vec3 camRight = normalize(vec3(viewMatrix[0][0], 0.0, viewMatrix[2][0]));
  vec3 up = vec3(0.0, 1.0, 0.0);

  // sum-of-sines wind, pinned at the base by aCorner.y and scaled by per-billboard stiffness
  float wind = sin(uTime * uWindSpeed + dot(position.xz, vec2(0.35, 0.25)) + aData.w)
    + 0.4 * sin(uTime * uWindSpeed * 2.3 + position.x * 0.8)
    + 0.2 * sin(uTime * uWindSpeed * 4.1 + position.z * 1.7);
  float sway = wind * uWindStrength * aData.z * aCorner.y;

  vec3 worldPos = position + camRight * (aCorner.x * aData.x) + up * (aCorner.y * aData.y);
  worldPos.xz += uWindDir * sway;

  // same Lambert term as the terrain, using the interpolated ground normal
  float ndl = max(dot(normalize(normal), uLightDir), 0.0);
  vLight = aTint * (uAmbientColor + uSunColor * ndl) * (1.0 + 0.15 * sway);

  vFade = smoothstep(uFadeStart, uFadeEnd, distance(cameraPosition, position));
  vNoiseUv = position.xz * 0.37;
  vUv = aUv;

  gl_Position = projectionMatrix * viewMatrix * vec4(worldPos, 1.0);
}
