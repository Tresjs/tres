<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { SVG, Text3D, OrbitControls } from '@tresjs/cientos'
import { ref } from 'vue';
import { NoToneMapping, Group } from 'three'

const svgTriangleString = `<svg width="404" height="80" viewBox="0 0 404 80" fill="none" 
xmlns="http://www.w3.org/2000/svg">
<path d="M44.5703 5.71662C46.124 3.12726 49.8767 3.12726 51.4303 5.71662L92.3655 73.942C93.9652 
76.6081 92.0447 80 88.9355 80H7.06507C3.95589 80 2.03544 76.6081 3.6351 73.942L44.5703 5.71662Z" 
fill="rgb(130,219,197)" stroke="rgb(130,219,197)" />
</svg>`;

// Source: https://commons.wikimedia.org/wiki/File:Finger_Pointing-Left-1574437693.svg
// License: Public Domain
const svgHandString = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="1301.145" height="655.88" viewBox="0, 0, 1301.145, 655.88">
  <g id="g12">
    <path d="M1271.92,418.01 L1092.235,404.01 C1092.235,404.01 1019.555,553.86 807.335,558.305 C807.335,558.305 683.965,623.31 637.32,621.07 C585.545,618.625 549.505,553.035 571.41,503.185 C571.41,503.185 478.675,458.52 501.655,371.365 C501.655,371.365 427.725,318.22 470.35,235.26 C470.35,235.26 189.48,217.75 100.065,205.59 C10.65,193.415 25.545,90.945 96.18,87.2 C148.315,84.43 691.08,70.25 691.08,70.25 L699.545,70.315 C733.555,25.775 766.975,9.61 851.98,34.43 C935.305,58.815 1032.545,134.13 1032.545,134.13 L1271.92,154.84" fill="rgb(244, 244, 90)" id="path68" />
    <path d="M1271.92,418.01 L1083.145,409.795 C1083.145,409.795 1010.465,559.645 798.245,564.085 C798.245,564.085 674.875,629.095 628.23,626.855 C576.46,624.41 540.42,558.82 562.32,508.97 C562.32,508.97 469.585,464.305 492.565,377.15 C492.565,377.15 418.635,324.005 461.26,241.045 C461.26,241.045 180.39,223.535 90.975,211.375 C1.565,199.2 16.455,96.725 87.095,92.98 C139.225,90.215 684.91,77.785 684.91,77.785 L685.78,77.85 C719.795,33.31 757.885,15.395 842.89,40.215 C926.215,64.6 1023.455,139.915 1023.455,139.915 L1271.92,154.84" fill="none" fill-opacity="0" stroke="rgb(0, 0, 0)" stroke-width="37.91" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" id="path72" />
    <path d="M696.92,68.01 C630.875,154.555 597.275,295.68 648.995,316.87 C700.715,338.04 790.31,253.095 816.1,195.61" fill="none" fill-opacity="0" stroke="rgb(0, 0, 0)" stroke-width="32.495" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" id="path74"/>
    <path d="M796.975,237.48 C796.975,237.48 891.26,371.635 995.39,354.525" fill="none" fill-opacity="0" stroke="rgb(0, 0, 0)" stroke-width="32.495" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" id="path76"/>
    <path d="M470.35,235.26 L627.125,208.28" fill="none" fill-opacity="0" stroke="rgb(0, 0, 0)" stroke-width="32.495" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" id="path78"/>
    <path d="M500.615,371.15 L649.145,318.64" fill="none" fill-opacity="0" stroke="rgb(0, 0, 0)" stroke-width="32.495" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" id="path80"/>
    <path d="M794.325,564.76 C794.325,564.76 855.685,519.47 862.97,488.92 C873.05,446.685 855.125,413.37 814.23,408.095 C814.23,408.095 849.23,339.445 773.835,282.56" fill="none" fill-opacity="0" stroke="rgb(0, 0, 0)" stroke-width="32.495" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" id="path82"/>
    <path d="M571.41,503.185 C571.41,503.185 765.53,455.69 813.64,400.025" fill="none" fill-opacity="0" stroke="rgb(0, 0, 0)" stroke-width="32.495" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" id="path84"/>
  </g>
</svg>`;

const fontURL = 'https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json'

const items: Group[] = [];
const itemRefs = ref(items);

function ease(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

const { onLoop } = useRenderLoop();
onLoop(({ elapsed }) => {
  const numItems = itemRefs.value.length;
  const theta = elapsed * 0.6;
  const floored = Math.floor(theta);
  const activeI = floored % numItems;
  const progress = theta - floored; 
  const dir = Math.floor((floored % (numItems * 4)) * 0.25);
  if (dir === 0 || dir === 2) {
    const sign = dir === 0 ? 1 : -1;
    itemRefs.value.forEach((object, i) => {
      object.rotation.x = 0;
      object.rotation.y = i === activeI ? sign * Math.PI * 2 * ease(progress) : 0 ;
    })
  } else {
    const sign = dir === 1 ? 1 : -1;
    itemRefs.value.forEach((object, i) => {
      object.rotation.x = i === activeI ? sign * Math.PI * 2 * ease(progress) : 0 ;
      object.rotation.y = 0;
    })
  }
});

const gl = {
  clearColor: '#333',
  alpha: true,
  toneMapping: NoToneMapping,
}

</script>

<template>
  <TresCanvas v-bind="gl" ref="canvas">
    <TresPerspectiveCamera :position="[0, 0, 10]" />
    <TresGridHelper :args="[10, 20]" :rotation="[Math.PI * 0.5, Math.PI * 0.5, Math.PI]" />
    <TresGroup v-for="(depth, i) of ['flat', 'renderOrder', 'offsetZ', 1]" :key="i + ''"
      :position="[i * 2 - 3.25, 1, 0]" :scale="0.003">
      <TresGroup :position="[0, -360, 0]" ref="itemRefs">
        <Suspense>
          <SVG :src="svgHandString" :position="[-230, 280, 0]" :scale="0.3" :depth="depth" />
        </Suspense>
        <Suspense>
          <SVG :src="svgTriangleString" :position="[-180, 200, 100]" :depth="depth" :scale="5" />
        </Suspense>
      </TresGroup>
        <Suspense>
          <Text3D :text="typeof depth === 'number' ? depth + '' : `'${depth}'`" :size="50" :font="fontURL" center
            :position="[80, 0, 0]" />
        </Suspense>
    </TresGroup>
    <TresAmbientLight />
    <TresDirectionalLight />
    <OrbitControls />
  </TresCanvas>
</template>
