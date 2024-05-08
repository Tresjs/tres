<!-- Github Luckystriike: https://github.com/luckystriike22/TresJsPlayground/ -->
<script lang="ts" setup>
import { Vector2 } from 'three'

// composables
const { onLoop, resume } = useRenderLoop()

// refs
const blobRef = shallowRef<any>(null)
const analyser = shallowRef();
const audioStream = shallowRef();
const dataArray = shallowRef();
const showInfoDialog = shallowRef(true);

// lifecycle
onMounted(async () => {
  await nextTick();

  try {
    const access = await navigator.permissions.query({ name: 'microphone' })
    showInfoDialog.value = access.state != "granted";

    audioStream.value = await navigator.mediaDevices.getUserMedia({ audio: true });
    handleMicrophoneAccess()
  } catch (error) {
    alert('Not able to accessing microphone');
  }
})

onLoop(({ elapsed }) => {
  if (blobRef.value) {
    analyser.value?.getByteFrequencyData(dataArray.value);

    // calc average frequency
    let sum = 0;
    for (let i = 0; i < dataArray.value?.length; i++) {
      sum += dataArray.value[i];
    }

    uniforms.value.u_frequency.value = sum > 0 ? sum / dataArray.value?.length : 0;
    uniforms.value.u_time.value = elapsed
    blobRef.value.rotation.x += 0.01
  }
})
// call resume to fix a bug on prod with the onLoop function
resume();

// handle the microphone connection
const handleMicrophoneAccess = () => {
  const audioContext = new (window.AudioContext)();
  const source = audioContext.createMediaStreamSource(audioStream.value);

  analyser.value = audioContext.createAnalyser();
  analyser.value.fftSize = 2048;
  source.connect(analyser.value);

  const bufferLength = analyser.value.frequencyBinCount;
  dataArray.value = new Uint8Array(bufferLength);
};

// shader
// set props to pass into the shader
const uniforms = ref({
  u_resolution: { type: 'V2', value: new Vector2(window.innerWidth, window.innerHeight) },
  u_time: { type: 'f', value: 0.0 },
  u_frequency: { type: 'f', value: 0.0 }
});

const vertexShader = ref(`
   uniform float u_time;
  
   vec3 mod289(vec3 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 mod289(vec4 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 permute(vec4 x)
  {
    return mod289(((x*34.0)+10.0)*x);
  }
  
  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }
  
  float pnoise(vec3 P, vec3 rep)
  {
    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;
  
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
  
    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  
    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;
  
    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);
  
    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
  }
  
  uniform float u_frequency;
  
   void main() {
      float noise = 5.0 * pnoise(position + u_time, vec3(10.0));
      float displacement = (u_frequency / 30.0) * (noise / 10.0);
      vec3 newPosition = position + normal * displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
   }
  `);

const fragmentShader = ref(`
      uniform vec2 u_resolution;
  
      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution; // Normalized screen coordinates
  
        float red = st.y + 0.3; // Red component increases horizontally
        float green = st.y - 0.3; // Green component increases vertically
        float blue = 0.0; // Blue component is kept at 0 for orange
  
        vec3 orange = vec3(red, green, blue);
  
        gl_FragColor = vec4(orange, 1.0);
      }
  `);

</script>

<template>
  <button
    class="gitBtn bg-gray-600 hover:bg-gray-700 opacity-40 transition-color shadow-lg hover:shadow-xl infline-flex w-12 h-12 justify-center items-center rounded-full absolute bottom-2 right-2">
    <a href="https://github.com/Tresjs/lab/tree/main/components/content/dancing-blob" target="_blank">Code</a>
  </button>

  <TresCanvas :clear-color="'#0c1a30'" v-show="!showInfoDialog">
    <TresPerspectiveCamera :position="[13, 0, 0]" />
    <OrbitControls />
    <TresMesh ref="blobRef">
      <TresIcosahedronGeometry :args="[4, 80]"></TresIcosahedronGeometry>
      <TresShaderMaterial wireframe :uniforms="uniforms" :fragment-shader="fragmentShader"
        :vertex-shader="vertexShader" />
    </TresMesh>
    <TresDirectionalLight :position="[1, 1, 1]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
  <span class="blobPermissionDialog justify-center items-center infline-flex absolute" v-if="showInfoDialog">
    <p>
      Hey! <br />
      This site requires microphone permissions. The
      microphone is only used to calculate the frequency necessary for the blob to dance. A browser pop-up will ask you
      for permission.
    </p>
  </span>

</template>

<style scoped>
.gitBtn {
  margin-bottom: 10px;
  margin-right: 10px;
  z-index: 10;
  color: white;
}

.blobPermissionDialog {
  height: 100vh;
  justify-content: center;
  display: flex;
  background-color: #0c1a30;
  width: 100vw;
  color: white;
  font-size: x-large;
}

.blobPermissionDialog p {
  width: 700px;
}
</style>