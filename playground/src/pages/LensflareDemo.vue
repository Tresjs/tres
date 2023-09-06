<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Levioso, Lensflare, Dodecahedron } from '@tresjs/cientos';
import { Color, MeshPhongMaterial } from 'three';
import { OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches';
import '@tresjs/leches/styles'

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
const seedRef = shallowRef(1049);
const seedPropsRef = shallowRef();
const flarePropsRef = shallowRef([{ color, size: 1 }]);
flarePropsRef.value = new Array(11).fill(0).map((_, i) => ({ size: Math.min(256 / (1 + i * i)), color }));

const { onLoop } = useRenderLoop();

onLoop(() => {
    if (!lightRef.value) return

    if (Math.random() > 0.99) {
        lightRef.value.color = new Color(randomColor());
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

const float = (lo: number, hi: number) => { return Math.random() * (hi - lo) + lo; }
const floatSpread = (range: number) => { return Math.random() * range - range * 0.5; }
const ROCK_COUNT = 1000;
const ROCK_DISTANCE = 200;
const ROCK_SCALE = 3;
const rocks = new Array(ROCK_COUNT).fill(0).map((_, i) => ({
    position: [0, 0, 0].map(() => floatSpread(ROCK_DISTANCE)),
    rotation: [0, 0, 0].map(() => floatSpread(Math.PI * 2)),
    scale: [0, 0, 0].map(() => float(ROCK_SCALE, ROCK_SCALE * 2)),
    key: i
}));

const rockMaterial = new MeshPhongMaterial({ color: 0x123141, specular: 0xffffff, shininess: 1000 });

{
    const TEXTURE_PATH =
        'https://raw.githubusercontent.com/andretchen0/tresjs_assets/' +
        'b1bc3780de73a9328a530767c9a7f4cbab060396/textures/lensflare/'
    const circle = `${TEXTURE_PATH}circle.png`
    const circleBlur = `${TEXTURE_PATH}cirlceBlur.png`
    const circleRainbow = `${TEXTURE_PATH}circleRainbow.png`
    const line = `${TEXTURE_PATH}line.png`
    const poly6 = `${TEXTURE_PATH}poly6.png`
    const polyStroke6 = `${TEXTURE_PATH}polyStroke6.png`
    const rays6 = `${TEXTURE_PATH}rays6.png`
    const ring = `${TEXTURE_PATH}ring.png`

    const oversizeSizeMin = shallowRef(750)
    const oversizeSizeMax = shallowRef(1024)
    const oversizeLengthMin = shallowRef(0)
    const oversizeLengthMax = shallowRef(2)

    const bodySizeMin = shallowRef(180)
    const bodySizeMax = shallowRef(512)
    const bodyLengthMin = shallowRef(2)
    const bodyLengthMax = shallowRef(4)

    const frontSizeMin = shallowRef(20)
    const frontSizeMax = shallowRef(180)
    const frontLengthMin = shallowRef(5)
    const frontLengthMax = shallowRef(21)
    const frontOffset = shallowRef(0.25)
    const frontDistance = shallowRef(2.5)

    const backSizeMin = shallowRef(180)
    const backSizeMax = shallowRef(360)
    const backLengthMin = shallowRef(0)
    const backLengthMax = shallowRef(5)
    const backOffset = shallowRef(0.1)
    const backDistance = shallowRef(1)

    const updateSeedProps = () => {
        seedPropsRef.value = [
            {
                texture: [line, ring],
                color: ['white'],
                distance: [0, 0],
                size: [oversizeSizeMin.value, oversizeSizeMax.value],
                length: [oversizeLengthMin.value, oversizeLengthMax.value]
            },
            {
                texture: [circleBlur, rays6, circleRainbow, circle],
                color: ['white', 'gray'],
                distance: [0, 0],
                size: [bodySizeMin.value, bodySizeMax.value],
                length: [bodyLengthMin.value, bodyLengthMax.value]
            },
            {
                texture: [circleBlur, ring, poly6, polyStroke6],
                color: ['white', 'gray', 'darkBlue'],
                distance: [frontOffset.value, frontOffset.value + frontDistance.value],
                size: [frontSizeMin.value, frontSizeMax.value],
                length: [frontLengthMin.value, frontLengthMax.value]
            },
            {
                texture: [circleBlur, ring, poly6, polyStroke6],
                color: ['white', 'gray', 'darkBlue'],
                distance: [-backOffset.value - backDistance.value, -backOffset.value],
                size: [backSizeMin.value, backSizeMax.value],
                length: [backLengthMin.value, backLengthMax.value]
            }
        ]
    };

    watch(() => [
        oversizeSizeMin.value, oversizeSizeMax.value, oversizeLengthMin.value, oversizeLengthMax.value,
        bodySizeMin.value, bodySizeMax.value, bodyLengthMin.value, bodyLengthMax.value,
        frontSizeMin.value, frontSizeMax.value, frontLengthMin.value, frontLengthMax.value, frontOffset.value, frontDistance.value,
        backSizeMin.value, backSizeMax.value, backLengthMin.value, backLengthMax.value, backDistance.value, backOffset.value
    ], updateSeedProps)
    
    useControls({
        seed: seedRef,
        oversizeSizeMin,
        oversizeSizeMax,
        oversizeLengthMin,
        oversizeLengthMax,
        bodySizeMin,
        bodySizeMax,
        bodyLengthMin,
        bodyLengthMax,
        frontOffset,
        frontDistance,
        frontSizeMin,
        frontSizeMax,
        frontLengthMin,
        frontLengthMax,
        backOffset,
        backDistance,
        backSizeMin,
        backSizeMax,
        backLengthMin,
        backLengthMax,
    })

    updateSeedProps();
}
</script>

<template>
    <TresLeches class="important-fixed" />
    <TresCanvas v-bind="gl">
        <Levioso :speed="1">
            <TresPerspectiveCamera :position="[11, 11, 100]" />
        </Levioso>
        <OrbitControls />
        <Levioso :speed="1.3" :range="[-13, 13]" :rotation-factor="10">
            <TresPointLight ref="lightRef" :color="color" :intensity="1000" :position="[10, 0, 0]">
                <Lensflare :seed="seedRef" :scale="0.5" :flare="flarePropsRef" />
            </TresPointLight>
        </Levioso>
        <TresPointLight :color="new Color(1, 1, 1)" :intensity="2000" :position="[10, 5, 0]">
            <Lensflare :seed="seedRef" :seedProps="seedPropsRef" />
        </TresPointLight>
        <Dodecahedron v-for="{ key, position, rotation, scale } in rocks" :key="key" :material="rockMaterial"
            :position="position" :rotation="rotation" :scale="scale" />
    </TresCanvas>
</template>
