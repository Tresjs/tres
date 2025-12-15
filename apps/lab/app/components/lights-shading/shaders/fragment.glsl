uniform vec3 uColor;
uniform float uAmbientLightIntensity;
uniform vec3 uAmbientLightColor;
uniform float uDirectionalLightIntensity;
uniform vec3 uDirectionalLightColor;
uniform vec3 uDirectionalLightPosition;

varying vec3 vNormal;

#include ./includes/ambient.glsl
#include ./includes/directional.glsl

void main() {
  vec3 color = uColor;

  // Add ambient light
  vec3 light = vec3(0.0);
 /*  light += ambientLight(uAmbientLightColor, uAmbientLightIntensity);
  color *= light; */

  // Directional light
  light += directionalLight(
    uDirectionalLightColor, 
    uDirectionalLightIntensity, 
    vNormal,
    uDirectionalLightPosition
  );
  color *= light;


  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}