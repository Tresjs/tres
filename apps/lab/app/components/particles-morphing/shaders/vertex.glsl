uniform vec2 uResolution;
uniform float uSize;
uniform float uProgress;
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
attribute vec3 aPositionTarget;
attribute float aSize;

varying vec3 vColor;

#include ../includes/simplexNoise3D.glsl

void main()
{
    // Mixed position
    float noiseOrigin = simplexNoise3d(position);
    float noiseTarget = simplexNoise3d(aPositionTarget);
    float noise = mix(noiseOrigin, noiseTarget, uProgress);
    noise = smoothstep(-1.0, 1.0, noise);

    float duration = 0.4;
    float delay = (1.0 - duration) * noise;
    float end = delay + duration;
    float progress = smoothstep(delay, end, uProgress);
    vec3 mixedPosition = mix(position, aPositionTarget, progress);

    // Final position
    vec4 modelPosition = modelMatrix * vec4(mixedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Point size
    float timeVariation = noise * sin(uTime) * 0.5 + 1.0;
    gl_PointSize = aSize * uSize * uResolution.y * timeVariation;
    gl_PointSize *= (1.0 / - viewPosition.z);

    // Varyings
    vColor = mix(uColorA, uColorB, noise);
}