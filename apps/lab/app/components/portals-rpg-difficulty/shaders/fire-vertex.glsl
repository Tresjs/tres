uniform float uHeightMin;
uniform float uHeightRange;

varying float vHeight;
varying vec3 vNormalView;
varying vec3 vViewDir;

void main() {
  vHeight = (position.y - uHeightMin) / uHeightRange;
  vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
  vNormalView = normalize(normalMatrix * normal);
  vViewDir = normalize(-viewPosition.xyz);
  
  gl_Position = projectionMatrix * viewPosition;
}