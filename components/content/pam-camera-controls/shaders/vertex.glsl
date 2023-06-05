varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vRotateLayer;
uniform float uTime;

mat2 rotate(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}

void main(){
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
    vPosition = position;
    mat2 rot = rotate(uTime);
    vec3 newPos = position;
    newPos.xz = rot*newPos.xz;
    vRotateLayer = newPos;
    vNormal = normal;
}