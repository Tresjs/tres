uniform float uTime;
uniform float uPixelHeight;
uniform float uNoteSize;
uniform float uRise;
uniform float uTurns;
uniform vec2 uRadius;
uniform float uRadiusJitter;
uniform float uTurbulence;
uniform float uTrail;

// x: phase, y: orbit direction (±1), z: radius offset in -1..1
attribute vec3 aSeed;
// x: birth offset, y: lifetime in seconds
attribute vec2 aLife;
// x and y: turbulence frequencies
attribute vec2 aTurb;
// x: 0 = head, 1 = tail; y: brightness falloff; z: 1 when the ghost still carries the glyph
attribute vec3 aTrail;
attribute float aGlyph;
attribute float aSize;

varying float vAge;
varying float vFall;
varying float vGlyph;
varying float vGlyphWeight;

void main() {
  float life = (uTime + aLife.x) / aLife.y;
  // The trail is in seconds; dividing by the lifetime turns it into a life fraction like t.
  float t = fract(life) - aTrail.x * uTrail / aLife.y;

  float y = uRise * (1.3 * t - 0.3 * t * t);
  float angle = aSeed.x + aSeed.y * uTurns * 6.2831 * t;
  float r = mix(uRadius.x, uRadius.y, t)
    * (1.0 + aSeed.z * uRadiusJitter)
    * (1.0 + 0.12 * sin(t * 6.2831 + aSeed.x));

  vec3 p = position + vec3(cos(angle) * r, y, sin(angle) * r);

  p.x += uTurbulence * t * sin(t * aTurb.x * 3.1416 + aSeed.x);
  p.z += uTurbulence * t * cos(t * aTurb.y * 3.1416 + aSeed.x * 1.7);

  vAge = t;
  vGlyph = aGlyph;
  vGlyphWeight = aTrail.z;
  // A ghost not yet born this cycle would poke out below the lute.
  vFall = t < 0.0 ? 0.0 : aTrail.y;

  vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * viewPosition;

  float swell = 0.7 + 0.5 * sin(3.1416 * min(1.0, t * 1.15));
  float taper = mix(1.0, 0.55 + 0.45 * aTrail.y, step(0.001, aTrail.x));

  // uNoteSize is a world diameter; projectionMatrix[1][1] is 1/tan(fovY/2).
  float pixelsPerUnit = projectionMatrix[1][1] * uPixelHeight * 0.5;
  gl_PointSize = aSize * uNoteSize * swell * taper * pixelsPerUnit / -viewPosition.z;
}
