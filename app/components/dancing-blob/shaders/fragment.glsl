uniform vec2 u_resolution;
uniform vec3 u_colorStart;
uniform vec3 u_colorEnd;

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;
  // Linear interpolation between start and end color based on y
  vec3 color=mix(u_colorStart,u_colorEnd,st.y);
  gl_FragColor=vec4(color,1.);
}