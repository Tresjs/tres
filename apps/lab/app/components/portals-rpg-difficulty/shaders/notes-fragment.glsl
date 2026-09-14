uniform sampler2D uAtlas;
uniform float uAtlasCells;
uniform float uFadeStart;
uniform float uGlow;
uniform float uOpacity;
uniform vec3 uColorYoung;
uniform vec3 uColorMid;
uniform vec3 uColorOld;

varying float vAge;
varying float vFall;
varying float vGlyph;
varying float vGlyphWeight;

void main() {
  // gl_PointCoord has y down, the canvas texture has y up.
  vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
  vec2 atlasUv = vec2((vGlyph + uv.x) / uAtlasCells, uv.y);
  float glyph = texture2D(uAtlas, atlasUv).a * vGlyphWeight;

  // The halo has to finish inside 0.5, the corner of the sprite, or it shows a
  // square silhouette. Far ghosts are halo only, which is what makes the trail a smear.
  float halo = smoothstep(0.5, 0.05, length(gl_PointCoord - 0.5)) * 0.35 * uGlow;

  vec3 color = mix(uColorYoung, uColorMid, smoothstep(0.0, 0.4, vAge));
  color = mix(color, uColorOld, smoothstep(0.4, 0.95, vAge));

  // The birth ramp hides the pop-in at the flame tip, where every cycle restarts.
  float fade = smoothstep(0.0, 0.08, vAge) * (1.0 - smoothstep(uFadeStart, 1.0, vAge)) * vFall;

  gl_FragColor = vec4(color, (glyph + halo) * fade * uOpacity);
}
