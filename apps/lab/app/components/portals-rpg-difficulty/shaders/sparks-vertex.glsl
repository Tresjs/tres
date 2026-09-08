uniform float uTime;
uniform float uPixelHeight;
uniform float uSparkSize;
uniform float uRise;
uniform float uSpread;
uniform float uSwayGain;
uniform float uSwell;
uniform vec3 uAnimator;

// x: wobble frequency, y and z: hash seeds for the per-cycle drift
attribute vec3 aSeed;
// x: birth offset, y: lifetime in seconds
attribute vec2 aLife;
attribute float aSize;

varying float vAge;

float hash21(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

void main() {
  float life = (uTime + aLife.x) / aLife.y;
  float t = fract(life);
  float cycle = floor(life);

  // Re-seeding the drift per cycle keeps 140 points from reading as 140 repeating
  // paths. The hash is keyed on the cycle index, not on time, so a spark holds one
  // path for its whole rise instead of jittering every frame.
  float r1 = hash21(vec2(aSeed.y, cycle));
  float r2 = hash21(vec2(aSeed.z, cycle + 7.3));

  vec3 p = position;

  // The t*t term is the buoyancy of the hot column; the linear term keeps sparks
  // moving the instant they leave the coals instead of crawling off them.
  p.y += uRise * (0.35 * t + 0.65 * t * t) * (0.7 + 0.6 * r1);

  // Amplitude scales with age: tight over the coals, loose near the tip.
  float wobble = aSeed.x * t + aSeed.y * 6.2831;
  p.x += uSpread * t * (sin(wobble) * 0.6 + (r1 - 0.5) * 1.4);
  p.z += uSpread * t * (cos(wobble * 1.13) * 0.6 + (r2 - 0.5) * 1.4);

  // Same sway vector the fire light rides, so sparks can never lean against the
  // flame. uSwayGain converts it to a flame-relative amplitude. Older sparks lean
  // further, having been in the moving air longer.
  p.xz += uAnimator.xz * uSwayGain * t;

  vAge = t;

  vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * viewPosition;

  // uSparkSize is a world diameter, so this stays right across fov, canvas size
  // and DPR changes instead of needing a magic pixel constant per scene.
  // projectionMatrix[1][1] is 1/tan(fovY/2).
  float pixelsPerUnit = projectionMatrix[1][1] * uPixelHeight * 0.5;
  gl_PointSize = aSize * uSparkSize * pixelsPerUnit * (1.0 - 0.55 * t) * (0.85 + 0.3 * uSwell);
  gl_PointSize *= 1.0 / -viewPosition.z;
}
