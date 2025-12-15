vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection) {
  vec3 lightDirection = normalize(lightPosition);
  vec3 reflectionDirection = reflect(-lightDirection, normal);
  // Shading
  float shading = dot(normal, lightDirection);
  shading = max(shading, 0.0);

  // Specular light
  float specular = - dot(viewDirection, reflectionDirection);
  specular = max(0.0, specular);
  specular = pow(specular, 20.0);
  vec3 specularLight = lightColor * specular * lightIntensity;

  return lightColor * lightIntensity * shading + specularLight;
}