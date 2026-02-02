uniform vec3 uResolution;
uniform float uSize;
uniform float uProgress;

attribute float aSize;
attribute float aDecay;

float remap(float value, float inMin, float inMax, float outMin, float outMax) {
    return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
}

void main(){
    float progress = aDecay * uProgress;

    vec3 newPosition = position;

    // Explosion effect
    float explosion = remap(progress, 0., 0.1, 0.0, 1.0);
    explosion = clamp(explosion, 0.0, 1.0);
    explosion = 1.0 - pow(1.0 - explosion, 2.0);
    newPosition *= explosion;

    // Falling effect
    float falling = remap(progress, 0.1, 1.0, 0.0, 1.0);
    falling = clamp(falling, 0.0, 1.0);
    falling = 1.0 - pow(1.0 - falling, 2.0);
    newPosition.y -= falling * 0.2;

    // Scale effect
    float sizeOpening = remap(progress, 0.0, 0.125, 0., 1.0);
    float sizeClosing = remap(progress, 0.125, 1.0, 1.0, 0.0);

    float size = min(sizeOpening, sizeClosing);
    size = clamp(size, 0.0, 1.0);

    // Twinkling effect
    float twinkling = remap(progress, 0.2, 0.8, 0.0, 1.0);
    twinkling = clamp(twinkling, 0.0, 1.0);
    twinkling = 1.0 - pow(1.0 - twinkling, 2.0);
    float sizeTwink = sin(progress * 30.0) * 0.5 + 0.5;
    sizeTwink = 1.0 - sizeTwink * twinkling;


    vec4 modelPosition=modelMatrix*vec4(newPosition,1.);
    vec4 viewPosition=viewMatrix*modelPosition;
    vec4 projectionPosition=projectionMatrix*viewPosition;
    
    gl_Position=projectionPosition;
    gl_PointSize=aSize * uSize * uResolution.z * uResolution.y * size * sizeTwink;
    
    gl_PointSize*=(1./-viewPosition.z);

    // To mitigate the windows issue with the points
    if(gl_PointSize < 1.0){
        gl_Position = vec4(9999.9);
    }
}