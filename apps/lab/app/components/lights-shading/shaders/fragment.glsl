uniform vec3 uColor;
uniform float uAmbientLightIntensity;
uniform vec3 uAmbientLightColor;
uniform float uDirectionalLightIntensity;
uniform vec3 uDirectionalLightColor;
uniform vec3 uDirectionalLightPosition;
uniform float uPointLightIntensity;
uniform vec3 uPointLightColor;
uniform vec3 uPointLightPosition;
uniform float uPointLightDecayFactor;

varying vec3 vNormal;
varying vec3 vPosition;

#include ./includes/ambient.glsl
#include ./includes/directional.glsl
#include ./includes/point.glsl

void main() {
  vec3 color = uColor;
  vec3 viewDirection = normalize(vPosition - cameraPosition);
  vec3 normal = normalize(vNormal);
  // Add ambient light
  vec3 light = vec3(0.0);
  // light += ambientLight(uAmbientLightColor, uAmbientLightIntensity);

  // Directional light
  light += directionalLight(
    uDirectionalLightColor,
    uDirectionalLightIntensity,
    normal,
    uDirectionalLightPosition,
    viewDirection
  );

  // Point light
  light += pointLight(
    uPointLightColor,
    uPointLightIntensity,
    normal,
    uPointLightPosition,
    viewDirection,
    vPosition,
    uPointLightDecayFactor
  );

  color *= light;

  gl_FragColor = vec4(color, 1.0);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}