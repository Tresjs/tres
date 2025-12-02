// twist the geometry
vec2 rotate2D(vec2 value, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  mat2 m = mat2(c, -s, s, c);
  return m * value;
}