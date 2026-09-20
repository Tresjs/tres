// per-instance: one plant each. `position` is the shared unit quad
// (x = -0.5/0.5 across, y = 0 at the root and 1 at the tip)
attribute vec3 iRoot;
attribute vec3 iNormal;
attribute vec3 iTint;
attribute vec4 iData;   // width, height, stiffness, wind phase
attribute vec4 iUvRect; // atlas bounds: u0, u1, v0, v1 (u swapped when the plant is flipped)

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
  vec2 corner = position.xy;

  // camera right projected onto the ground plane so tufts stay upright when orbiting overhead
  vec3 camRight = normalize(vec3(viewMatrix[0][0], 0.0, viewMatrix[2][0]));
  vec3 up = vec3(0.0, 1.0, 0.0);

  // sum-of-sines wind, pinned at the base by corner.y and scaled by per-plant stiffness
  float wind = sin(uTime * uWindSpeed + dot(iRoot.xz, vec2(0.35, 0.25)) + iData.w)
    + 0.4 * sin(uTime * uWindSpeed * 2.3 + iRoot.x * 0.8)
    + 0.2 * sin(uTime * uWindSpeed * 4.1 + iRoot.z * 1.7);
  float sway = wind * uWindStrength * iData.z * corner.y;

  vec3 worldPos = iRoot + camRight * (corner.x * iData.x) + up * (corner.y * iData.y);
  worldPos.xz += uWindDir * sway;

  // same Lambert term as the terrain, using the ground normal under the plant
  float ndl = max(dot(normalize(iNormal), uLightDir), 0.0);
  vLight = iTint * (uAmbientColor + uSunColor * ndl) * (1.0 + 0.15 * sway);

  vFade = smoothstep(uFadeStart, uFadeEnd, distance(cameraPosition, iRoot));
  vNoiseUv = iRoot.xz * 0.37;
  vUv = vec2(
    corner.x < 0.0 ? iUvRect.x : iUvRect.y,
    mix(iUvRect.z, iUvRect.w, corner.y)
  );

  gl_Position = projectionMatrix * viewMatrix * vec4(worldPos, 1.0);
}
