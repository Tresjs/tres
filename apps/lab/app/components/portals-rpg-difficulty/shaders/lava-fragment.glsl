// CustomShaderMaterial fragment stage for GEO_Lava_Lake over
// MeshPhysicalMaterial. blender-noise.glsl and avernus-fields.glsl are
// prepended in AvernusLava.vue. vNormal and vViewPosition come from Three's
// physical material varyings.
uniform float uWarpAmount;
uniform float uPlateScale;
uniform float uEmissionGain;
uniform float uBumpStrength;
uniform float uBumpDistance;
uniform float uFineDetail;
uniform float uDebugView;
uniform float uTime;
uniform float uFlowSpeed;
uniform float uChurnSpeed;

varying vec3 vBlenderPosition;

// Blender's Bump node filter width. Scales the un-perturbed normal against the
// surface gradient, so a smaller value means a stronger bump.
const float BUMP_FILTER_WIDTH = 0.1;

// Blender node_bump (gpu_shader_material_bump.glsl) with the height offsets
// replaced by hardware derivatives of the single height sample: one field
// evaluation instead of three. Everything in view space.
vec3 bumpNormal(vec3 N, float height, vec3 P) {
  vec3 dPdx = dFdx(P);
  vec3 dPdy = dFdy(P);

  vec3 Rx = cross(dPdy, N);
  vec3 Ry = cross(N, dPdx);
  float det = dot(dPdx, Rx);

  vec2 dHd = vec2(dFdx(height), dFdy(height));
  vec3 surfgrad = dHd.x * Rx + dHd.y * Ry;

  float dist = gl_FrontFacing ? uBumpDistance : -uBumpDistance;
  vec3 bumped = normalize(BUMP_FILTER_WIDTH * abs(det) * N - dist * sign(det) * surfgrad);
  return normalize(mix(N, bumped, max(uBumpStrength, 0.0)));
}

void main() {
  // CSM sets csm_UnlitFac to 1 whenever a shader mentions csm_FragColor, so
  // the lit path has to claim it back before the debug branch below.
  csm_UnlitFac = 0.0;

  // Flow runs along Blender -Y, the axis Flow_Direction_Stretch elongates.
  // Sampling upstream makes the pattern travel downstream.
  vec3 flow = vec3(0.0, uTime * uFlowSpeed, 0.0);
  LavaFields f = evaluateLava(vBlenderPosition, uWarpAmount, uPlateScale, uFineDetail > 0.5,
                              flow, uTime * uChurnSpeed);

  vec3 N = normalize(vNormal);
  vec3 P = -vViewPosition;

  csm_DiffuseColor = vec4(f.baseColor, 1.0);
  csm_Emissive = f.emission * uEmissionGain;
  csm_Roughness = f.roughness;
  csm_FragNormal = bumpNormal(N, f.height, P);

  // Debug views bypass lighting and emission so bloom cannot blur the mask.
  if (uDebugView > 0.5) {
    vec3 debug = uDebugView < 1.5 ? vec3(f.moltenMask) : vec3(f.height);
    csm_Emissive = vec3(0.0);
    csm_FragColor = vec4(debug, 1.0);
    csm_UnlitFac = 1.0;
  }
}
