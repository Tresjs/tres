precision highp float;

varying vec3 vColor;
varying float vMask;

void main() {
  vec2 pc = gl_PointCoord;  // [0, 1] range

  // Hard square clip using Chebyshev distance
  vec2 centered = abs(pc - 0.5);
  float squareDist = max(centered.x, centered.y);
  if (squareDist >= 0.5) discard;

  // Inner radial glow: bright center fading to edges
  float dist = length(pc - 0.5) * 2.0;
  float glow = 1.0 - smoothstep(0.0, 1.0, dist);
  float alpha = mix(0.5, 1.0, glow) * vMask;

  gl_FragColor = vec4(vColor, alpha);
}
