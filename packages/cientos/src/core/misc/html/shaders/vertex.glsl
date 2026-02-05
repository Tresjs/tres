#include <common>

uniform float uWidth;
uniform float uHeight;

void main() {

  vec4 mvPosition = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);

  vec2 quad = position.xy;

  vec2 alignedPosition = quad * vec2(uWidth, uHeight);

  mvPosition.xy += alignedPosition;

  gl_Position = projectionMatrix * mvPosition;
}
