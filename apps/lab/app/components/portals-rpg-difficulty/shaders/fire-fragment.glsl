uniform float uCoreOffset;
uniform float uCoreScale;
uniform vec3 uCoreLow;
uniform vec3 uCoreMid;
uniform vec3 uCoreHigh;
uniform float uCoreMidPos;
uniform float uCoreStrength;
uniform vec3 uRimLow;
uniform vec3 uRimHigh;
uniform vec2 uRimStops;
uniform float uRimOffset;
uniform float uRimStrength;
uniform float uRimScale;

varying float vHeight;
varying vec3 vNormalView;
varying vec3 vViewDir;

// Color ramps
vec3 ramp3(vec3 c0, vec3 c1, vec3 c2, float midPos, float t) {
  vec3 lower = mix(c0, c1, smoothstep(0.0, midPos, t));
  return mix(lower, c2, smoothstep(midPos, 1.0, t));
}

vec3 ramp2(vec3 c0, vec3 c1, vec2 stops, float t) {
  return mix(c0, c1, smoothstep(stops.x, stops.y, t));
}


void main() {
  float facing = 1.0 - abs(dot(vNormalView, vViewDir));

  float coreT = smoothstep(0.0, 1.0, uCoreOffset - uCoreScale * vHeight);
  float rimT = smoothstep(0.0, 1.0, uRimOffset - uRimScale * vHeight);

  vec3 core = ramp3(uCoreLow, uCoreMid, uCoreHigh, uCoreMidPos, coreT) * uCoreStrength;
  vec3 rim = ramp2(uRimLow, uRimHigh, uRimStops, rimT) * uRimStrength;

  gl_FragColor = vec4(mix(core, rim, facing), 1.0);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}