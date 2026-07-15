uniform vec2 iResolution;
uniform float iTime;
varying vec4 vFragColor;

void main() {
  gl_Position = vec4(1., 1., 0., 1.);
  vFragColor = vec4(1., 1., 0., 1.);
}