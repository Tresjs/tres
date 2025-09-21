uniform vec2 uResolution;
uniform float uTime;

varying vec3 vViewNormal;

void main() {
   // create a gradient from the bottom left to the top right

    vec3 color1 = vec3(1.0, 0.6, 0.0);
    vec3 color2 = vec3(0.55, 0.0, 1.0);

    vec2 st = gl_FragCoord.zy / uResolution.xy;

    float y = sin(gl_FragCoord.y / uResolution.y * 3.0 + uTime * 10.0 + 0.5);

// I dont want this to mix I want a hard line between the two colors

    vec3 color = sin(exp(y)) * color1 + (1.0 - sin(exp(y))) * color2;

    // make edges white 

    float distance = length(st - vViewNormal.zy * 2.0);

    // if it passes the threshold of 0.5, make it black
    // if it passes the threshold of 0.75, make it white

    csm_DiffuseColor = vec4(color, 1.0);
};