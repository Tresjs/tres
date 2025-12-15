varying vec3 vNormal;

void main() {
  // Position
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;
  gl_Position = projectionPosition;

  // Model normal
  vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

  // Varyings
  vNormal = modelNormal.xyz;
}