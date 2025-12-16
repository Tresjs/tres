vec3 pointLight(
  vec3 lightColor, 
  float lightIntensity, 
  vec3 normal, 
  vec3 lightPosition, 
  vec3 viewDirection,
  vec3 position,
  float decayFactor
) {
  vec3 lightDelta = lightPosition - position;
  vec3 lightDirection = normalize(lightDelta);
  vec3 reflectionDirection = reflect(-lightDirection, normal);
  float lightDistance = length(lightDelta);


  // Shading
  float shading = dot(normal, lightDirection);
  shading = max(shading, 0.0);

  // Specular light
  float specular = - dot(viewDirection, reflectionDirection);
  specular = max(0.0, specular);
  specular = pow(specular, 20.0);
  vec3 specularLight = lightColor * specular * lightIntensity;

  // Decay 
  float decay = 1.0 - lightDistance * decayFactor;
  decay = max(decay, 0.0);

  return lightColor * lightIntensity * decay * (shading + specularLight);
}