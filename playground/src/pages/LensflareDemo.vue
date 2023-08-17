<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { RandUtils, Levioso, Lensflare, Dodecahedron } from '@tresjs/cientos';
import * as THREE from 'three';

import { OrbitControls } from '@tresjs/cientos'

const gl = {
    clearColor: '#000000',
    shadows: false,
    alpha: false,
}

function easeInOutQuint(x: number): number {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

const colors = ["white", "yellow", "red", "orange", "purple"];
const randomColor = () => colors[Math.trunc(Math.random() * colors.length)];
const color = randomColor();

const lightRef = shallowRef();
const flarePropsRef = shallowRef([{ color, size: 1 }]);
flarePropsRef.value = new Array(11).fill(0).map((_, i) => ({ size: Math.min(256 / (1 + i * i)), color }));

const { onLoop } = useRenderLoop();

onLoop(() => {
    if (!lightRef.value) return

    if (Math.random() > 0.99) {
        lightRef.value.color = new THREE.Color(randomColor());
        flarePropsRef.value = getFlareProps()
    }
});

function getFlareProps() {
    const NUM_ELEMENTS = 15;
    return new Array(NUM_ELEMENTS).fill(0).map(
        (_, i) => ({
            size: 216 * (1 - easeInOutQuint(i / NUM_ELEMENTS)),
            distance: i < 5 ? 0 : easeInOutQuint(i / NUM_ELEMENTS),
            color: lightRef.value?.color ?? "white"
        }));
}

flarePropsRef.value = getFlareProps();

const rand = new RandUtils(112);
const ROCK_COUNT = 1000;
const ROCK_DISTANCE = 200;
const ROCK_SCALE = 3;
const rocks = new Array(ROCK_COUNT).fill(0).map((_, i) => ({
    position: [0, 0, 0].map(() => rand.floatSpread(ROCK_DISTANCE)),
    rotation: [0, 0, 0].map(() => rand.floatSpread(Math.PI * 2)),
    scale: [0, 0, 0].map(() => rand.float(ROCK_SCALE, ROCK_SCALE * 2)),
    key: i
}));

const rockMaterial = new THREE.MeshPhongMaterial({ color: 0x123141, specular: 0xffffff, shininess: 1000 });

</script>

<template>
    <TresCanvas v-bind="gl">
        <Levioso :speed="1">
            <TresPerspectiveCamera :position="[11, 11, 100]" />
        </Levioso>
        <OrbitControls />
        <Levioso :speed="2" :range="[-13, 13]" :rotation-factor="10">
            <TresPointLight ref="lightRef" :color="color" :intensity="1000" :position="[10, 0, 0]">
                <Lensflare :seed="10" :flare="flarePropsRef" />
            </TresPointLight>
        </Levioso>
        <TresPointLight :color="new THREE.Color(1, 1, 1)" :intensity="2000" :position="[10, 5, 0]">
            <Lensflare :seed="Math.random()" />
        </TresPointLight>
        <Dodecahedron v-for="{ key, position, rotation, scale } in rocks" :key="key" :material="rockMaterial"
            :position="position" :rotation="rotation" :scale="scale" />
    </TresCanvas>
</template>
