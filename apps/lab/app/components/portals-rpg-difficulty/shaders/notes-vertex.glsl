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
// x: how far behind the head this ghost trails (0 = head, 1 = tail),
// y: brightness falloff for that spot, z: 1 when the ghost still carries the glyph
attribute vec3 aTrail;
attribute float aGlyph;
attribute float aSize;

varying float vAge;
varying float vFall;
varying float vGlyph;
varying float vGlyphWeight;

void main() {
  float life = (uTime + aLife.x) / aLife.y;
  // The trail is set in seconds so it reads the same for short and long-lived
  // notes; dividing by the lifetime turns it into life fraction like t.
  float t = fract(life) - aTrail.x * uTrail / aLife.y;

  // Ease-out climb: fast off the lute, slowing near the top like an updraft losing heat.
  float y = uRise * (1.3 * t - 0.3 * t * t);
  float angle = aSeed.x + aSeed.y * uTurns * 6.2831 * t;
  // Cone that opens with height, times a per-note offset, plus a slow breathe so no
  // two notes share a radius for long.
  float r = mix(uRadius.x, uRadius.y, t)
    * (1.0 + aSeed.z * uRadiusJitter)
    * (1.0 + 0.12 * sin(t * 6.2831 + aSeed.x));

  vec3 p = position + vec3(cos(angle) * r, y, sin(angle) * r);

  // Two incommensurate sines, amplitude growing with age like the sparks' wobble.
  p.x += uTurbulence * t * sin(t * aTurb.x * 3.1416 + aSeed.x);
  p.z += uTurbulence * t * cos(t * aTurb.y * 3.1416 + aSeed.x * 1.7);

  vAge = t;
  vGlyph = aGlyph;
  vGlyphWeight = aTrail.z;
  // A ghost older than its head has not been born this cycle: kill it rather than
  // let it poke out below the lute.
  vFall = t < 0.0 ? 0.0 : aTrail.y;

  vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * viewPosition;

  // Notes swell in the middle of the rise and shrink as they thin out.
  float swell = 0.7 + 0.5 * sin(3.1416 * min(1.0, t * 1.15));
  // Ghosts shrink toward the tail so the trail tapers.
  float taper = mix(1.0, 0.55 + 0.45 * aTrail.y, step(0.001, aTrail.x));

  // uNoteSize is a world diameter; projectionMatrix[1][1] is 1/tan(fovY/2).
  float pixelsPerUnit = projectionMatrix[1][1] * uPixelHeight * 0.5;
  gl_PointSize = aSize * uNoteSize * swell * taper * pixelsPerUnit / -viewPosition.z;
}
