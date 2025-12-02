uniform sampler2D uPerlinNoise;
uniform float uTime;

varying vec2 vUv;

void main() {
  // Scale and Animate 
  vec2 smokeUv = vUv;
  smokeUv.x *= 0.5;
  smokeUv.y *= 0.3;

  smokeUv.y -= uTime * 0.03;

  // Smoke
  float smoke = texture(uPerlinNoise, smokeUv).r;

  // Remap
  smoke = smoothstep(0.4, 1.0, smoke);

  // Edge
  smoke *= smoothstep(0.0, 0.1, vUv.x);
  smoke *= smoothstep(1.0, 0.9, vUv.x);

  smoke *= smoothstep(0.0, 0.1, vUv.y);
  smoke *= smoothstep(1.0, 0.4, vUv.y);

  gl_FragColor = vec4(0.6, 0.3, 0.2, smoke);
  #include <tonemapping_fragment>
  #include <color_fragment>
}