vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition) {
  vec3 lightDirection = normalize(lightPosition);

  // Shading
  float shading = dot(normal, lightDirection);

  return lightColor * lightIntensity * shading;
}