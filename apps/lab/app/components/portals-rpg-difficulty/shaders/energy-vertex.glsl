// glTF flips V, so the GLB has V = 1 at the groove; the field equations expect Blender's V = 0 there.
// Three's standard material only exposes vUv when a map is set, hence the varying of our own.
varying vec2 vEnergyUv;

void main() {
  vEnergyUv = vec2(uv.x, 1.0 - uv.y);
}
