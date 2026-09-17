// Shared 3D value noise. Imported with ?raw and prepended to the shader string
// in JS, so this file has no uniforms, no main and no includes of its own.
// marble.ts is the CPU twin of these functions; an edit here is an edit there.

const int OCTAVES = 3;

float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

float valueNoise(vec3 p) {
  vec3 cell = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);

  float n000 = hash13(cell + vec3(0.0, 0.0, 0.0));
  float n100 = hash13(cell + vec3(1.0, 0.0, 0.0));
  float n010 = hash13(cell + vec3(0.0, 1.0, 0.0));
  float n110 = hash13(cell + vec3(1.0, 1.0, 0.0));
  float n001 = hash13(cell + vec3(0.0, 0.0, 1.0));
  float n101 = hash13(cell + vec3(1.0, 0.0, 1.0));
  float n011 = hash13(cell + vec3(0.0, 1.0, 1.0));
  float n111 = hash13(cell + vec3(1.0, 1.0, 1.0));

  return mix(
    mix(mix(n000, n100, u.x), mix(n010, n110, u.x), u.y),
    mix(mix(n001, n101, u.x), mix(n011, n111, u.x), u.y),
    u.z
  );
}

float turbulence(vec3 p) {
  float sum = 0.0;
  float amp = 1.0;
  float total = 0.0;

  for (int i = 0; i < OCTAVES; i++) {
    sum += valueNoise(p) * amp;
    total += amp;
    amp *= 0.5;
    p *= 2.0;
  }

  return sum / total;
}
