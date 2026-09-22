// Avernus material fields, transcribed from the Blender snapshot of 2026-09-21
// (avernus_shader_equations.glsl). Linear RGB. Ramps are piecewise linear with clamped
// stops, like Blender's ColorRamp; a smoothstep is not equivalent. Needs blender-noise.glsl first.

float lavaFissure(float x) {
  if (x <= 0.00800000038) return 1.0;
  if (x < 0.0280000009) return mix(1.0, 0.949999988, (x - 0.00800000038) / 0.0200000005);
  if (x < 0.155000001) return mix(0.949999988, 0.0, (x - 0.0280000009) / 0.127);
  return 0.0;
}

float lavaPools(float x) {
  if (x <= 0.439999998) return 0.0;
  if (x < 0.620000005) return mix(0.0, 1.0, (x - 0.439999998) / 0.180000007);
  return 1.0;
}

vec3 lavaPalette(float x) {
  if (x <= 0.0) return vec3(0.0140000004, 0.00800000038, 0.00600000005);
  if (x < 0.200000003) return mix(vec3(0.0140000004, 0.00800000038, 0.00600000005), vec3(0.0270000007, 0.0120000001, 0.00700000022), (x - 0.0) / 0.200000003);
  if (x < 0.400000006) return mix(vec3(0.0270000007, 0.0120000001, 0.00700000022), vec3(0.129999995, 0.0160000008, 0.00200000009), (x - 0.200000003) / 0.200000003);
  if (x < 0.620000005) return mix(vec3(0.129999995, 0.0160000008, 0.00200000009), vec3(0.649999976, 0.0350000001, 0.00100000005), (x - 0.400000006) / 0.219999999);
  if (x < 0.829999983) return mix(vec3(0.649999976, 0.0350000001, 0.00100000005), vec3(1.0, 0.0949999988, 0.00200000009), (x - 0.620000005) / 0.209999979);
  if (x < 1.0) return mix(vec3(1.0, 0.0949999988, 0.00200000009), vec3(1.0, 0.230000004, 0.00800000038), (x - 0.829999983) / 0.170000017);
  return vec3(1.0, 0.230000004, 0.00800000038);
}

float lavaHeat(float x) {
  if (x <= 0.319999993) return 0.0;
  if (x < 0.699999988) return mix(0.0, 0.280000001, (x - 0.319999993) / 0.379999995);
  if (x < 1.0) return mix(0.280000001, 1.0, (x - 0.699999988) / 0.300000012);
  return 1.0;
}

float lavaRoughness(float x) {
  return mix(0.920000017, 0.319999993, clamp(x, 0.0, 1.0));
}

struct LavaFields {
  vec3 baseColor;
  vec3 emission;
  float roughness;
  float height;
  float moltenMask;
};

// blenderObjectPosition is Blender-space (Z up). Snapshot: warpAmount 1.25, plateScale 1.05,
// no time input. The lake is flat, so Z is free as a time axis: flow slides the plates
// downstream, churn walks the warp and pool noises along Z so fissures breathe in place.
LavaFields evaluateLava(vec3 blenderObjectPosition, float warpAmount, float plateScale, bool fineDetail,
                        vec3 flow, float churn) {
  vec3 p = blenderObjectPosition * vec3(0.78, 1.25, 1.0) + flow;
  vec3 churnAxis = vec3(0.0, 0.0, churn);
  vec3 warpColor = blenderNoise3(p * 0.7 + churnAxis, 3.0, 0.65, 0.0).color;
  vec3 q = p + warpAmount * (warpColor - vec3(0.5));
  float edgeDistance = blenderVoronoiEdge3(q * plateScale);
  float broad = blenderNoise3Fac(q * 0.8 + churnAxis * 0.5, 2.5, 0.7, 0.6);
  float mask = max(lavaFissure(edgeDistance), lavaPools(broad));
  vec3 color = lavaPalette(mask);
  float micro = fineDetail ? blenderNoise3Fac(q * 22.0, 2.0, 0.5, 0.0) : 0.5;

  LavaFields f;
  f.baseColor = color;
  f.emission = color * (1.9 * lavaHeat(mask));
  f.roughness = lavaRoughness(mask);
  f.height = (1.0 - mask) + 0.18 * micro;
  f.moltenMask = mask;
  return f;
}

float energyTopFade(float x) {
  if (x <= 0.0) return 1.0;
  if (x < 0.449999988) return mix(1.0, 0.850000024, (x - 0.0) / 0.449999988);
  if (x < 1.0) return mix(0.850000024, 0.0, (x - 0.449999988) / 0.550000012);
  return 0.0;
}

float energyEndFade(float x) {
  if (x <= 0.0) return 0.0;
  if (x < 0.0399999991) return mix(0.0, 1.0, (x - 0.0) / 0.0399999991);
  if (x < 0.959999979) return 1.0;
  if (x < 1.0) return mix(1.0, 0.0, (x - 0.959999979) / 0.0400000215);
  return 0.0;
}

// Stops passed in so the palette can be uniforms; snapshot values live in AvernusEnergy.vue.
vec3 energyPalette(float x, vec3 c0, vec3 c1, vec3 c2, vec3 c3) {
  if (x <= 0.0) return c0;
  if (x < 0.300000012) return mix(c0, c1, (x - 0.0) / 0.300000012);
  if (x < 0.649999976) return mix(c1, c2, (x - 0.300000012) / 0.349999964);
  if (x < 1.0) return mix(c2, c3, (x - 0.649999976) / 0.350000024);
  return c3;
}

float energyRim(float x) {
  if (x <= 0.0) return 0.300000012;
  if (x < 0.200000003) return mix(0.300000012, 1.0, (x - 0.0) / 0.200000003);
  if (x < 0.550000012) return mix(1.0, 0.180000007, (x - 0.200000003) / 0.350000009);
  if (x < 1.0) return mix(0.180000007, 0.00999999978, (x - 0.550000012) / 0.449999988);
  return 0.00999999978;
}

struct EnergyFields {
  vec3 baseColor;
  vec3 emission;
  float roughness;
  float alpha;
  float density;
};

// energyUV: V = 0 at the groove, V = 1 at the top. drift shifts only the noise sample
// so the top and end fades stay attached to the geometry.
EnergyFields evaluateEnergy(vec2 energyUV, float wispScale, vec3 drift,
                            vec3 c0, vec3 c1, vec3 c2, vec3 c3) {
  vec3 q = vec3(energyUV, 0.0) * vec3(8.5, 1.6, 1.0) * wispScale + drift;
  float noiseFac = blenderNoise3Fac(q * 2.4, 3.1, 0.65, 0.9);
  float threshold = 0.43 * energyUV.y + 0.29;
  float density = clamp(8.0 * (noiseFac - threshold), 0.0, 1.0);
  float a = 0.78 * density * energyTopFade(energyUV.y) * energyEndFade(energyUV.x);
  vec3 color = energyPalette(density, c0, c1, c2, c3);

  EnergyFields f;
  f.baseColor = color;
  f.emission = color * (5.0 * energyRim(density));
  f.roughness = 0.9;
  f.alpha = a;
  f.density = density;
  return f;
}
