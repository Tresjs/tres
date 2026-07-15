precision mediump float;
varying vec4 vFragColor;

void main() {
  gl_FragColor = vec4(vec3(vFragColor), 1.0);
}