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
uniform float uMaskFloor;
uniform float uPowerA;
uniform float uPowerB;
uniform vec2 uRampA;
uniform vec2 uRampB;
uniform float uTime;
uniform float uFlicker;

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

float colorDodge(float base, float blend) {
  if (base <= 0.0) { return 0.0; }

  float d = 1.0 - blend;
  if (d <= 0.0) { return 1.0; }

  return min(base / d, 1.0);
}


void main() {
  float facing = 1.0 - abs(dot(normalize(vNormalView), normalize(vViewDir)));
  float lifted = mix(facing, uMaskFloor, 0.5);
  float a = smoothstep(uRampA.x, uRampA.y, pow(lifted, uPowerA));
  float b = smoothstep(uRampB.x, uRampB.y, pow(lifted, uPowerB));
  float mask = colorDodge(a, b);

  float flicker = sin(vHeight * 9.0 - uTime * 6.0) * 0.5
                + sin(vHeight * 17.0 - uTime * 9.3) * 0.5;
  float coreT = smoothstep(0.0, 1.0, uCoreOffset + flicker * uFlicker - uCoreScale * vHeight);
  float rimT = smoothstep(0.0, 1.0, uRimOffset - uRimScale * vHeight);

  vec3 core = ramp3(uCoreLow, uCoreMid, uCoreHigh, uCoreMidPos, coreT) * uCoreStrength;
  vec3 rim = ramp2(uRimLow, uRimHigh, uRimStops, rimT) * uRimStrength;

  gl_FragColor = vec4(mix(core, rim, mask), 1.0);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}