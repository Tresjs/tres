uniform float u_time;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform vec3 u_colorC;
uniform float u_noiseScale;
uniform float u_grainIntensity;
uniform float u_fresnelPower;

varying vec3 v_position;
varying vec3 v_normal;
varying vec2 v_uv;

// Random function for grain effect
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Noise function for color mixing
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Fractal Brownian Motion for more complex noise
float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(st * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    
    return value;
}

void main() {
    vec3 normal = normalize(v_normal);
    vec3 viewDirection = normalize(cameraPosition - v_position);
    
    // Fresnel effect for liquid-like rim lighting
    float fresnel = 1.0 - dot(normal, viewDirection);
    fresnel = pow(fresnel, u_fresnelPower);
    
    // Create flowing noise pattern for color mixing
    vec2 flowUv = v_uv + u_time * 0.1;
    float colorNoise = fbm(flowUv * u_noiseScale);
    
    // Mix colors based on noise and fresnel
    vec3 baseColor = mix(u_colorA, u_colorB, colorNoise);
    vec3 finalColor = mix(baseColor, u_colorC, fresnel);
    
    // Enhanced grain effect for more texture
    vec2 grainUv = v_uv * 100.0 + u_time * 0.02;
    float grain1 = random(grainUv) * u_grainIntensity;
    float grain2 = random(grainUv * 2.0 + 0.5) * u_grainIntensity * 0.5;
    float totalGrain = grain1 + grain2;
    finalColor += vec3(totalGrain);
    
    // Add some iridescence based on viewing angle
    float iridescence = sin(fresnel * 3.14159 + u_time) * 0.1;
    finalColor += vec3(iridescence * 0.5, iridescence * 0.8, iridescence);
    
    gl_FragColor = vec4(finalColor, 1.0);
}