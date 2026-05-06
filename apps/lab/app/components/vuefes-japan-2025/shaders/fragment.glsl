// Suminagashi (Japanese ink-marbling) shader.
// Original by the Vue Fes Japan 2025 team — https://vuefes.jp/2025/en
// Reverse engineered from their Three.js r178 bundle (main visual canvas).


uniform float uTime;
uniform int uIsSphere;
uniform int uActiveColorSet;
uniform sampler2D uNoiseTexture;
uniform struct ColorSet {
  vec3 color1;
  vec3 color2;
  vec3 color3;
} uColorSet1, uColorSet2, uColorSet3, uColorSet4;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

float blendSoftLight(float base, float blend) {
    return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}
vec3 blendSoftLight(vec3 base, vec3 blend) {
    return vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));
}
vec3 blendSoftLight(vec3 base, vec3 blend, float opacity) {
    return (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));
}
float map(float value, float inputMin, float inputMax, float outputMin, float outputMax) {
  return clamp(((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin), outputMin, outputMax);
}
vec3 linearToGamma(vec3 color, float gamma) { return pow(color, vec3(1.0 / gamma)); }
float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
    mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 st, float amplitude, float frequency, float lacunarity, float gain, int octaves) {
  float value = 0.0;
  float amp = amplitude;
  float freq = frequency;
  for (int i = 0; i < octaves; i++) {
    value += amp * noise(st * freq);
    freq *= lacunarity;
    amp *= gain;
  }
  return value;
}
vec2 flowField(vec2 p, float time) {
  return vec2(
    fbm(p + vec2(0.0, time * 0.1), 0.6, 2.0, 1.8, 0.5, 6),
    fbm(p + vec2(time * 0.1, 0.0), 0.6, 2.0, 1.8, 0.5, 6)
  );
}
float generateSumiPattern(vec2 uv, float time, float scale) {
  float timeScale = time * 0.15;
  vec2 st = uv * scale;
  vec2 flow = flowField(st * 2.0, timeScale);
  vec2 flow2 = flowField(st * 4.0 + flow * 0.2, timeScale * 1.2);
  vec2 flow3 = flowField(st * 8.0 + flow2 * 0.15, timeScale * 0.9);
  vec2 finalFlow = flow * 0.5 + flow2 * 0.3 + flow3 * 0.2;
  float marbleNoise = fbm(st + finalFlow * 0.8, 0.6, 2.0, 1.8, 0.5, 6);
  float sumiPattern = fbm((st + finalFlow) * 3.0 + time * 0.05, 0.6, 2.0, 1.8, 0.5, 6);
  return marbleNoise * 0.5 + sumiPattern * 0.5;
}
float generateSumiDetail(vec2 uv, float time) {
  vec2 st = uv;
  float timeScale = time * 0.15;
  vec2 flow = flowField(st * 2.0, timeScale);
  vec2 flow2 = flowField(st * 4.0 + flow * 0.2, timeScale * 1.2);
  vec2 flow3 = flowField(st * 8.0 + flow2 * 0.15, timeScale * 0.9);
  vec2 finalFlow = flow * 0.5 + flow2 * 0.3 + flow3 * 0.2;
  return fbm((st + finalFlow) * 6.0 + time * 0.02, 0.8, 4.0, 2.2, 0.7, 4);
}

// Get the active color set by index
ColorSet getActiveColorSet(int setIndex) {
  if (setIndex == 0) return uColorSet1;
  else if (setIndex == 1) return uColorSet2;
  else if (setIndex == 2) return uColorSet3;
  return uColorSet4;
}
vec3 calculateColor(float noiseValue, ColorSet colors, vec2 noiseUV, vec2 warpedUV, float time) {
  noiseValue = fract(noiseValue * 5.0);
  vec3 finalColor;
  const float DIVISIONS = 3.0;
  if (noiseValue > 0.3 && noiseValue < 0.33) {
    finalColor = vec3(0.0);
    float sumiDetail = generateSumiDetail((noiseUV+warpedUV)*.1, time*0.1);
    noiseValue = noiseValue*0.95 + sumiDetail*0.05;
    float segment = floor(noiseValue * float(DIVISIONS * 8.0));
    int index = int(mod(segment, 3.0));
    float localPos = fract(noiseValue * float(DIVISIONS * 3.0));
    if (localPos > 0.8) {
      float t = (localPos - 0.8) / 0.2;
      vec3 currentColor = index == 0 ? colors.color1 : (index == 1 ? colors.color2 : colors.color3);
      vec3 nextColor = index == 0 ? colors.color2 : (index == 1 ? colors.color3 : colors.color1);
      finalColor = mix(currentColor, nextColor, t);
    } else {
      finalColor = index == 0 ? colors.color1 : (index == 1 ? colors.color2 : colors.color3);
    }
    return finalColor;
  }

  float segment = floor(noiseValue * 3.0);
  float localPos = fract(noiseValue * 3.0);

  float gradientThreshold = 0.8;
  vec3 currentColor, nextColor;

  if (segment == 0.0) {
    currentColor = colors.color1;
    nextColor = colors.color2;
  } else if (segment == 1.0) {
    currentColor = colors.color2;
    nextColor = colors.color3;
  } else {
    currentColor = colors.color3;
    nextColor = colors.color1;
  }
  if (localPos > gradientThreshold) {
    float t = (localPos - gradientThreshold) / (1.0 - gradientThreshold);
    return mix(currentColor, nextColor, t);
  }
  return currentColor;
}

void main() {
  vec3 color = vec3(0.0497, 0.4891, 0.3893);
  float a = 1.0;
  ColorSet colors = getActiveColorSet(uActiveColorSet);

  vec2 nUV = vPosition.xy * 0.01;
  nUV.x += uTime * 0.05;
  vec4 noise3 = texture2D(uNoiseTexture, nUV);

  if (uIsSphere == 1) {
    vec3 normal = normalize(vNormal);
    float phi = acos(normal.y);
    float theta = atan(normal.z, normal.x) + uTime * 0.1;

    vec2 noiseUV = vec2(theta / (3.1415926 * 2.0), phi / 3.1415926) * 0.5;

    // Flow field and warp effect
    float timeScale = uTime * 0.7;
    vec2 baseFlow = flowField(noiseUV * 1.5, timeScale);
    vec2 detailFlow = flowField(noiseUV * 3.0 + baseFlow * 0.4, timeScale * 1.2);
    float flowStrength = 0.1;
    flowStrength += noise3.r*0.01;
    vec2 warpedUV = (baseFlow * 0.7 + detailFlow * 0.3) * flowStrength;

    // Edge effect
    float edgeIntensity = dot(normal, vec3(0.0, 0.0, 1.0)) * 0.5 + 0.5;
    warpedUV += edgeIntensity * baseFlow * flowStrength * 1.5;

    // Parameters controlling pattern scale and speed
    float allscale = 0.3;   // Overall pattern scale
    float allspeed = 0.25;  // Overall animation speed

    // Pattern generation
    float noiseValue = generateSumiPattern(noiseUV + warpedUV, uTime * allspeed, allscale);
    color = calculateColor(noiseValue, colors, noiseUV, warpedUV, uTime);

  } else {
    if (vPosition.y < -90.0) {
      float t = (vPosition.y + 200.0) / 110.0;
      float maxX = mix(64.0, 0.0, t);
      if (length(vPosition.x) < maxX) {
        discard;
      }
    }
    color = normalize(vNormal).rgb;
    color = colors.color1;
  }

  // add noise
  color = blendSoftLight(color, vec3(noise3),0.7);

  color = linearToGamma(color, 2.2);
  gl_FragColor = vec4(color, a);
}
