uniform sampler2D uAtlas;
uniform sampler2D uNoiseTex;
uniform float uAlphaCut;

varying vec2 vUv;
varying vec2 vNoiseUv;
varying vec3 vLight;
varying float vFade;

void main() {
  vec4 tex = texture2D(uAtlas, vUv);
  float noise = texture2D(uNoiseTex, vNoiseUv).r;

  // screen-door dissolve: alpha test only, noise-gated coverage shrinks with distance
  if (tex.a * (1.0 - vFade * (0.5 + noise)) < uAlphaCut) discard;

  gl_FragColor = vec4(tex.rgb * vLight, 1.0);
}
