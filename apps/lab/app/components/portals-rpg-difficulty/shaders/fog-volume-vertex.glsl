// The march runs in box local space (unit cube); the camera is brought in once per vertex, not per fragment.
varying vec3 vLocalPosition;
varying vec3 vCameraLocal;

void main() {
  vLocalPosition = position;
  vCameraLocal = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
