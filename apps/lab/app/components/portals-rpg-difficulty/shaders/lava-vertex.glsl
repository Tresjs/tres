// CustomShaderMaterial vertex stage for GEO_Lava_Lake. The GLB node is
// identity and its vertices are already Y-up, so the Blender object
// coordinate the shader graph sampled is one basis swap away from `position`.
// Sampling the Three position directly would rotate the whole lava pattern.
varying vec3 vBlenderPosition;

void main() {
  vBlenderPosition = vec3(position.x, -position.z, position.y);
}
