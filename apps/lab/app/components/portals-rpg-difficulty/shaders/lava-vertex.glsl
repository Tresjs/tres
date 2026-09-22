// The GLB node is identity with Y-up vertices, so the Blender object coordinate is one basis
// swap away. Sampling the Three position directly would rotate the whole lava pattern.
varying vec3 vBlenderPosition;

void main() {
  vBlenderPosition = vec3(position.x, -position.z, position.y);
}
