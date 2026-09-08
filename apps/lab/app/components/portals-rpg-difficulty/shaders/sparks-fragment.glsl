uniform vec3 uColorHot;
uniform vec3 uColorMid;
uniform vec3 uColorCool;
uniform float uSwell;

varying float vAge;

void main() {
  // The falloff has to finish inside 0.5, the corner of the point sprite, or the
  // ember shows a square silhouette.
  float shape = smoothstep(0.5, 0.12, length(gl_PointCoord - 0.5));

  vec3 color = mix(uColorHot, uColorMid, smoothstep(0.0, 0.35, vAge));
  color = mix(color, uColorCool, smoothstep(0.35, 0.85, vAge));

  // Full brightness while the spark is still inside the flame, then a long fade,
  // so it cools out rather than blinking off. The birth ramp hides the pop-in at
  // the seed point, where every cycle restarts.
  float fade = (1.0 - smoothstep(0.55, 1.0, vAge)) * smoothstep(0.0, 0.06, vAge);

  gl_FragColor = vec4(color, shape * fade * (0.8 + 0.4 * uSwell));
}
