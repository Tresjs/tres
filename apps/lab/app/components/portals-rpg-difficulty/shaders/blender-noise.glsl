// Port of Blender's material noise GLSL. Source: blender/blender v5.2.1, source/blender/gpu/shaders/
// common/gpu_shader_common_hash.glsl and material/gpu_shader_material_{noise,fractal_noise,tex_noise,
// voronoi,tex_voronoi,fractal_voronoi}.glsl. Imported with ?raw, so no uniforms and no main.
// The uint hashes (Jenkins lookup3, PCG) and the wrapping integer math are load-bearing: a float
// hash moves every cell and the reference render stops matching.

#define BL_FLT_MAX 3.402823466e+38
// Blender clamps Detail to 15; a constant bound keeps the loop WebGL2-safe.
#define BL_MAX_OCTAVES 16

uint blRot(uint x, uint k) {
  return (x << k) | (x >> (32u - k));
}

void blHashMix(inout uint a, inout uint b, inout uint c) {
  a -= c; a ^= blRot(c, 4u);  c += b;
  b -= a; b ^= blRot(a, 6u);  a += c;
  c -= b; c ^= blRot(b, 8u);  b += a;
  a -= c; a ^= blRot(c, 16u); c += b;
  b -= a; b ^= blRot(a, 19u); a += c;
  c -= b; c ^= blRot(b, 4u);  b += a;
}

void blHashFinal(inout uint a, inout uint b, inout uint c) {
  c ^= b; c -= blRot(b, 14u);
  a ^= c; a -= blRot(c, 11u);
  b ^= a; b -= blRot(a, 25u);
  c ^= b; c -= blRot(b, 16u);
  a ^= c; a -= blRot(c, 4u);
  b ^= a; b -= blRot(a, 14u);
  c ^= b; c -= blRot(b, 24u);
}

uint blHashUint2(uint kx, uint ky) {
  uint a, b, c;
  a = b = c = 0xdeadbeefu + (2u << 2u) + 13u;
  b += ky;
  a += kx;
  blHashFinal(a, b, c);
  return c;
}

uint blHashUint3(uint kx, uint ky, uint kz) {
  uint a, b, c;
  a = b = c = 0xdeadbeefu + (3u << 2u) + 13u;
  c += kz;
  b += ky;
  a += kx;
  blHashFinal(a, b, c);
  return c;
}

uint blHashInt3(ivec3 k) {
  return blHashUint3(uint(k.x), uint(k.y), uint(k.z));
}

float blHashUint2ToFloat(uint kx, uint ky) {
  return float(blHashUint2(kx, ky)) / 4294967295.0;
}

float blHashVec2ToFloat(vec2 k) {
  return blHashUint2ToFloat(floatBitsToUint(k.x), floatBitsToUint(k.y));
}

// PCG 3D from "Hash Functions for GPU Rendering" (JCGT 2020), Blender's
// signed-integer variant. Overflow wraps, which is the intended behaviour.
ivec3 blHashPcg3d(ivec3 v) {
  v = v * 1664525 + 1013904223;
  v.x += v.y * v.z;
  v.y += v.z * v.x;
  v.z += v.x * v.y;
  v = v ^ (v >> 16);
  v.x += v.y * v.z;
  v.y += v.z * v.x;
  v.z += v.x * v.y;
  return v;
}

vec3 blHashInt3ToVec3(ivec3 k) {
  ivec3 h = blHashPcg3d(k);
  return vec3(h & 0x7fffffff) * (1.0 / 2147483647.0);
}

float blFade(float t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float blNegateIf(float value, uint condition) {
  return (condition != 0u) ? -value : value;
}

float blGrad3(uint hash, float x, float y, float z) {
  uint h = hash & 15u;
  float u = h < 8u ? x : y;
  float vt = ((h == 12u) || (h == 14u)) ? x : z;
  float v = h < 4u ? y : vt;
  return blNegateIf(u, h & 1u) + blNegateIf(v, h & 2u);
}

float blTriMix(float v0, float v1, float v2, float v3,
               float v4, float v5, float v6, float v7,
               float x, float y, float z) {
  float x1 = 1.0 - x;
  float y1 = 1.0 - y;
  float z1 = 1.0 - z;
  return z1 * (y1 * (v0 * x1 + v1 * x) + y * (v2 * x1 + v3 * x)) +
         z * (y1 * (v4 * x1 + v5 * x) + y * (v6 * x1 + v7 * x));
}

float blPerlin3(vec3 p) {
  vec3 pf = floor(p);
  ivec3 P = ivec3(pf);
  vec3 f = p - pf;

  float u = blFade(f.x);
  float v = blFade(f.y);
  float w = blFade(f.z);

  return blTriMix(
    blGrad3(blHashInt3(P + ivec3(0, 0, 0)), f.x,       f.y,       f.z),
    blGrad3(blHashInt3(P + ivec3(1, 0, 0)), f.x - 1.0, f.y,       f.z),
    blGrad3(blHashInt3(P + ivec3(0, 1, 0)), f.x,       f.y - 1.0, f.z),
    blGrad3(blHashInt3(P + ivec3(1, 1, 0)), f.x - 1.0, f.y - 1.0, f.z),
    blGrad3(blHashInt3(P + ivec3(0, 0, 1)), f.x,       f.y,       f.z - 1.0),
    blGrad3(blHashInt3(P + ivec3(1, 0, 1)), f.x - 1.0, f.y,       f.z - 1.0),
    blGrad3(blHashInt3(P + ivec3(0, 1, 1)), f.x,       f.y - 1.0, f.z - 1.0),
    blGrad3(blHashInt3(P + ivec3(1, 1, 1)), f.x - 1.0, f.y - 1.0, f.z - 1.0),
    u, v, w
  );
}

// C fmod, not GLSL mod: Blender's compatible_mod keeps the sign of the dividend.
float blCompatibleMod(float a, float b) {
  float c = fract(abs(a / b)) * abs(b);
  return a < 0.0 ? -c : c;
}

vec3 blCompatibleMod(vec3 a, float b) {
  return vec3(blCompatibleMod(a.x, b), blCompatibleMod(a.y, b), blCompatibleMod(a.z, b));
}

// Signed noise in [-1, 1]. 0.9820 is the experimental OSL scale for 3D.
float blSnoise3(vec3 p) {
  vec3 precisionCorrection = 0.5 * vec3(greaterThanEqual(abs(p), vec3(1000000.0)));
  p = blCompatibleMod(p, 100000.0) + precisionCorrection;
  return 0.9820 * blPerlin3(p);
}

float blNoiseFbm3(vec3 p, float detail, float roughness, float lacunarity, bool normalized) {
  float fscale = 1.0;
  float amp = 1.0;
  float maxamp = 0.0;
  float sum = 0.0;
  int octaves = int(detail);

  for (int i = 0; i < BL_MAX_OCTAVES; i++) {
    if (i > octaves) { break; }
    float t = blSnoise3(fscale * p);
    sum += t * amp;
    maxamp += amp;
    amp *= roughness;
    fscale *= lacunarity;
  }

  float rmd = detail - floor(detail);
  if (rmd != 0.0) {
    float t = blSnoise3(fscale * p);
    float sum2 = sum + t * amp;
    return normalized
      ? mix(0.5 * sum / maxamp + 0.5, 0.5 * sum2 / (maxamp + amp) + 0.5, rmd)
      : mix(sum, sum2, rmd);
  }
  return normalized ? 0.5 * sum / maxamp + 0.5 : sum;
}

vec3 blRandomVec3Offset(float seed) {
  return vec3(
    100.0 + blHashVec2ToFloat(vec2(seed, 0.0)) * 100.0,
    100.0 + blHashVec2ToFloat(vec2(seed, 1.0)) * 100.0,
    100.0 + blHashVec2ToFloat(vec2(seed, 2.0)) * 100.0
  );
}

struct BlenderNoiseSample {
  float fac;
  vec3 color;
};

// Lacunarity 2 and Normalize on, as in every Avernus noise node.
BlenderNoiseSample blenderNoise3(vec3 q, float detail, float roughness, float distortion) {
  detail = clamp(detail, 0.0, 15.0);
  roughness = max(roughness, 0.0);
  vec3 p = q;

  if (distortion != 0.0) {
    p += vec3(
      blSnoise3(p + blRandomVec3Offset(0.0)) * distortion,
      blSnoise3(p + blRandomVec3Offset(1.0)) * distortion,
      blSnoise3(p + blRandomVec3Offset(2.0)) * distortion
    );
  }

  BlenderNoiseSample s;
  s.fac = blNoiseFbm3(p, detail, roughness, 2.0, true);
  s.color = vec3(
    s.fac,
    blNoiseFbm3(p + blRandomVec3Offset(3.0), detail, roughness, 2.0, true),
    blNoiseFbm3(p + blRandomVec3Offset(4.0), detail, roughness, 2.0, true)
  );
  return s;
}

// Fac only, for the nodes whose Color output is unused. Saves two fBM passes.
float blenderNoise3Fac(vec3 q, float detail, float roughness, float distortion) {
  detail = clamp(detail, 0.0, 15.0);
  roughness = max(roughness, 0.0);
  vec3 p = q;

  if (distortion != 0.0) {
    p += vec3(
      blSnoise3(p + blRandomVec3Offset(0.0)) * distortion,
      blSnoise3(p + blRandomVec3Offset(1.0)) * distortion,
      blSnoise3(p + blRandomVec3Offset(2.0)) * distortion
    );
  }

  return blNoiseFbm3(p, detail, roughness, 2.0, true);
}

// Euclidean, Randomness 1, Detail 0, Normalize off: the fractal wrapper is then an identity, so it is skipped.
float blenderVoronoiEdge3(vec3 coord) {
  vec3 cellPositionF = floor(coord);
  vec3 localPosition = coord - cellPositionF;
  ivec3 cellPosition = ivec3(cellPositionF);

  vec3 vectorToClosest = vec3(0.0);
  float minDistance = BL_FLT_MAX;
  for (int k = -1; k <= 1; k++) {
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        ivec3 cellOffset = ivec3(i, j, k);
        vec3 vectorToPoint = vec3(cellOffset) + blHashInt3ToVec3(cellPosition + cellOffset) - localPosition;
        float distanceToPoint = dot(vectorToPoint, vectorToPoint);
        if (distanceToPoint < minDistance) {
          minDistance = distanceToPoint;
          vectorToClosest = vectorToPoint;
        }
      }
    }
  }

  minDistance = BL_FLT_MAX;
  for (int k = -1; k <= 1; k++) {
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        ivec3 cellOffset = ivec3(i, j, k);
        vec3 vectorToPoint = vec3(cellOffset) + blHashInt3ToVec3(cellPosition + cellOffset) - localPosition;
        vec3 perpendicularToEdge = vectorToPoint - vectorToClosest;
        if (dot(perpendicularToEdge, perpendicularToEdge) > 0.0001) {
          float distanceToEdge = dot((vectorToClosest + vectorToPoint) / 2.0, normalize(perpendicularToEdge));
          minDistance = min(minDistance, distanceToEdge);
        }
      }
    }
  }

  return minDistance;
}
