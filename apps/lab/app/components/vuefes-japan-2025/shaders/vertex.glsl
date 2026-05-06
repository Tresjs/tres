// Suminagashi (Japanese ink-marbling) shader.
// Original by the Vue Fes Japan 2025 team — https://vuefes.jp/2025/en
// Extracted from their Three.js r178 bundle (main visual canvas).

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
