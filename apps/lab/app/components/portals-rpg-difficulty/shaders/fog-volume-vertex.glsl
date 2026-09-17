// The march runs in the box's local space so the unit cube (-0.5..0.5) is the
// volume bounds and the noise rides with the box. The camera is brought into
// that space here, once per vertex, instead of once per fragment.
varying vec3 vLocalPosition;
varying vec3 vCameraLocal;

void main() {
  vLocalPosition = position;
  vCameraLocal = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
