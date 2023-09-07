<script setup lang="ts">
import { shallowRef, watch } from 'vue'
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
const seedRef = shallowRef(847);
const seedPropsRef = shallowRef();
const elementsRef = shallowRef([{ color, size: 1 }]);
elementsRef.value = new Array(11).fill(0).map((_, i) => ({ size: Math.min(256 / (1 + i * i)), color }));

const { onLoop } = useRenderLoop();

onLoop(() => {
    if (!lightRef.value) return

    if (Math.random() > 0.99) {
        lightRef.value.color = new Color(randomColor());
        elementsRef.value = getFlareProps()
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

elementsRef.value = getFlareProps();

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

    const oversizeSizeMin = shallowRef(512)
    const oversizeSizeMax = shallowRef(1024)
    const oversizeLengthMin = shallowRef(0)
    const oversizeLengthMax = shallowRef(2)
    const oversizeSeed = shallowRef(1)
    const oversizeColorA = shallowRef('#ffffff')
    const oversizeColorB = shallowRef('#ffffff')
    const oversizeColorC = shallowRef('#ffffff')

    const bodySizeMin = shallowRef(180)
    const bodySizeMax = shallowRef(512)
    const bodyLengthMin = shallowRef(2)
    const bodyLengthMax = shallowRef(4)
    const bodySeed = shallowRef(1)
    const bodyColorA = shallowRef('#ffffff')
    const bodyColorB = shallowRef('#ffffff')
    const bodyColorC = shallowRef('#808080')

    const frontSizeMin = shallowRef(20)
    const frontSizeMax = shallowRef(180)
    const frontLengthMin = shallowRef(5)
    const frontLengthMax = shallowRef(21)
    const frontOffset = shallowRef(0.25)
    const frontDistance = shallowRef(2.5)
    const frontSeed = shallowRef(1)
    const frontColorA = shallowRef('#ffffff')
    const frontColorB = shallowRef('#808080')
    const frontColorC = shallowRef('#a9a9a9')

    const backSizeMin = shallowRef(180)
    const backSizeMax = shallowRef(360)
    const backLengthMin = shallowRef(0)
    const backLengthMax = shallowRef(5)
    const backOffset = shallowRef(0.1)
    const backDistance = shallowRef(1)
    const backSeed = shallowRef(1)
    const backColorA = shallowRef('#ffffff')
    const backColorB = shallowRef('#a9a9a9')
    const backColorC = shallowRef('#00008b')

    const updateSeedProps = () => {
        seedPropsRef.value = [
            {
                texture: [line, ring],
                color: [oversizeColorA.value, oversizeColorB.value, oversizeColorC.value],
                distance: [0, 0],
                size: [oversizeSizeMin.value, oversizeSizeMax.value],
                length: [oversizeLengthMin.value, oversizeLengthMax.value],
                seed: oversizeSeed.value
            },
            {
                texture: [circleBlur, rays6, circleRainbow, circle],
                color: [bodyColorA.value, bodyColorB.value, bodyColorC.value],
                distance: [0, 0],
                size: [bodySizeMin.value, bodySizeMax.value],
                length: [bodyLengthMin.value, bodyLengthMax.value],
                seed: bodySeed.value
            },
            {
                texture: [circleBlur, ring, poly6, polyStroke6],
                color: [frontColorA.value, frontColorB.value, frontColorC.value],
                distance: [frontOffset.value, frontOffset.value + frontDistance.value],
                size: [frontSizeMin.value, frontSizeMax.value],
                length: [frontLengthMin.value, frontLengthMax.value],
                seed: frontSeed.value
            },
            {
                texture: [circleBlur, ring, poly6, polyStroke6],
                color: [backColorA.value, backColorB.value, backColorC.value],
                distance: [-backOffset.value - backDistance.value, -backOffset.value],
                size: [backSizeMin.value, backSizeMax.value],
                length: [backLengthMin.value, backLengthMax.value],
                seed: backSeed.value
            }
        ]
    };

    useControls({
        seed: seedRef,
    });

    useControls(
        'Oversize',
        {
            sizeMin: oversizeSizeMin,
            sizeMax: oversizeSizeMax,
            lengthMin: oversizeLengthMin,
            lengthMax: oversizeLengthMax,
            colorA: oversizeColorA,
            colorB: oversizeColorB,
            colorC: oversizeColorC,
            seed: oversizeSeed
        });
    useControls(
        'Body',
        {
            sizeMin: bodySizeMin,
            sizeMax: bodySizeMax,
            lengthMin: bodyLengthMin,
            lengthMax: bodyLengthMax,
            colorA: bodyColorA,
            colorB: bodyColorB,
            colorC: bodyColorC,
            seed: bodySeed
        });
    useControls(
        'Front',
        {
            offset: frontOffset,
            distance: frontDistance,
            sizeMin: frontSizeMin,
            sizeMax: frontSizeMax,
            lengthMin: frontLengthMin,
            lengthMax: frontLengthMax,
            colorA: frontColorA,
            colorB: frontColorB,
            colorC: frontColorC,
            seed: frontSeed
        });
    useControls(
        'Back',
        {
            offset: backOffset,
            distance: backDistance,
            sizeMin: backSizeMin,
            sizeMax: backSizeMax,
            lengthMin: backLengthMin,
            lengthMax: backLengthMax,
            colorA: backColorA,
            colorB: backColorB,
            colorC: backColorC,
            seed: backSeed
        });

    watch(() => [
        seedRef.value,
        oversizeSizeMin.value, oversizeSizeMax.value, oversizeLengthMin.value, oversizeLengthMax.value,
        oversizeColorA.value, oversizeColorB.value, oversizeColorC.value, oversizeSeed.value,
        bodySizeMin.value, bodySizeMax.value, bodyLengthMin.value, bodyLengthMax.value,
        bodyColorA.value, bodyColorB.value, bodyColorC.value, bodySeed.value,
        frontSizeMin.value, frontSizeMax.value, frontLengthMin.value, frontLengthMax.value, 
        frontOffset.value, frontDistance.value,
        frontColorA.value, frontColorB.value, frontColorC.value, frontSeed.value,
        backSizeMin.value, backSizeMax.value, backLengthMin.value, backLengthMax.value, 
        backDistance.value, backOffset.value,
        backColorA.value, backColorB.value, backColorC.value, backSeed.value,
    ], updateSeedProps);

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
                <Lensflare :seed="seedRef" :scale="0.5" :elements="elementsRef" />
            </TresPointLight>
        </Levioso>
        <TresPointLight :color="new Color(1, 1, 1)" :intensity="2000" :position="[10, 5, 0]">
            <Lensflare :seed="seedRef" :seed-props="seedPropsRef" />
        </TresPointLight>
        <Dodecahedron v-for="{ key, position, rotation, scale } in rocks" :key="key" :material="rockMaterial"
            :position="position" :rotation="rotation" :scale="scale" />
    </TresCanvas>
</template>
