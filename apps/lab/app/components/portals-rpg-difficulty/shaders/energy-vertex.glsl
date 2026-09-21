// CustomShaderMaterial vertex stage for the five pentagram energy curtains.
// glTF puts the UV origin at the top-left, so the exporter wrote V as
// 1 - Blender V: in the GLB the groove row carries V = 1 and the top row V = 0.
// The field equations expect Blender's orientation (V = 0 at the groove, the
// dense dark base, V = 1 at the dissolving top), so flip it back here once.
// Three's standard material only exposes `vUv` when a map is set, hence the
// varying of our own.
varying vec2 vEnergyUv;

void main() {
  vEnergyUv = vec2(uv.x, 1.0 - uv.y);
}
