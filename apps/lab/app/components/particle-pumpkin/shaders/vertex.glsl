uniform float uTime;
varying float vVisibility;
varying vec3 vViewNormal;

void main() {
    vec3 n = gln_curl(position + uTime * 3.0);

    vec3 _viewNormal = normalMatrix * normal;
    vViewNormal = _viewNormal;
    vec4 _mvPosition = modelViewMatrix * vec4(position, 1.);

    float visibility = step(-0.1, dot(-normalize(_mvPosition.xyz), normalize(_viewNormal)));
    vVisibility = visibility;

    float moveAmount = clamp(visibility * 0.5, 0.0, 0.05);
    csm_Position = position + n * moveAmount;
}
