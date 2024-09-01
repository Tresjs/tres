uniform vec2 u_resolution;

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;// Normalized screen coordinates
  
  float red=st.y+.3;// Red component increases horizontally
  float green=st.y-.3;// Green component increases vertically
  float blue=0.;// Blue component is kept at 0 for orange
  
  vec3 orange=vec3(red,green,blue);
  
  gl_FragColor=vec4(orange,1.);
}