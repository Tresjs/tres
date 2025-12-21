uniform float uTime;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord;
  float distanceToCenter = length(uv - 0.5);
  float alpha = 0.05 / distanceToCenter - 0.1;
  gl_FragColor = vec4(vColor, alpha);
  
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}