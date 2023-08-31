<script setup lang="ts">
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/lensflare';
import { MathUtils, Texture, TextureLoader, Color } from 'three';
import { watch, shallowRef, onMounted, onUnmounted } from 'vue'
import { normalizeColor } from '@tresjs/core';
import RandUtils from '../../utils/RandUtils';

export type FlareElementProps = {
  texture?: Texture | string
  size?: number
  distance?: number
}

const props = withDefaults(
  defineProps<{
    flare?: FlareElementProps[],
    scale?: number,
    seed?: number,
  }>(),
  {
    flare: undefined,
    seed: undefined,
    scale: 1,
  },
)

const lensflareRef = shallowRef<Lensflare>();

defineExpose({
  value: lensflareRef,
});

const textureLoader = new TextureLoader();

function linear(x: number): number {
  return x;
}

function easeInCubic(x: number): number {
  return x * x * x;
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeInQuart(x: number): number {
  return x * x * x * x;
}

function easeOutBounce(x: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

const easingFunctions = [linear, easeInCubic, easeInOutCubic, easeInQuart, easeOutBounce];

const lerp = MathUtils.lerp;

const TEXTURE_PATH = 'https://raw.githubusercontent.com/andretchen0/tresjs_assets/' +
  'b1bc3780de73a9328a530767c9a7f4cbab060396/textures/lensflare/';

const getSeededFlareElements = () => {
  const rand: RandUtils = new RandUtils(props.seed);

  const numPoints = rand.choice([4, 6, 8]) as 4 | 6 | 8;

  const circle = `${TEXTURE_PATH}circle.png`;
  const circleBlur = `${TEXTURE_PATH}cirlceBlur.png`;
  const circleRainbow = `${TEXTURE_PATH}circleRainbow.png`;
  const line = `${TEXTURE_PATH}line.png`;
  const poly = `${TEXTURE_PATH}poly${numPoints}.png`;
  const polyStroke = `${TEXTURE_PATH}polyStroke${numPoints}.png`;
  const rays = `${TEXTURE_PATH}rays${numPoints}.png`;
  const ring = `${TEXTURE_PATH}ring.png`;
  const starThin = `${TEXTURE_PATH}starThin${numPoints}.png`;

  // NOTE:
  // Flare elements are divided into back, oversize, body, front. 
  // They are arranged as such, relative to the light source and camera:
  // [distance < 0]   [distance == 0]   [distance > 0]
  //                      light                          camera
  //      back        body, oversize       front

  const oversizeTexturesOptional = [line, ring];
  const oversizeColors = ["white"];
  const oversizeSizeMin = 750;
  const oversizeSizeMax = 1024;
  const oversizeElementsNumMin = 0;
  const oversizeElementsNumMax = 2;

  const bodyTexturesRequired = [circleBlur, rays];
  const bodyTexturesOptional = [circle, circleRainbow, ring, starThin];
  const bodyColors = ["white"];
  const bodySizeMin = 180;
  const bodySizeMax = 512;
  const bodyTexturesOptionalNumMin = 2;
  const bodyTexturesOptionalNumMax = 3;

  const frontTexturesOptional = [circleBlur, circle, ring, poly, polyStroke];
  const [darkPurple, darkBlue] = [0x38235f, 0x02055a];
  const frontColors = ["dimgray", "gray", "darkgray", darkPurple, darkBlue];
  const frontTexturesNumMin = 2;
  const frontTexturesNumMax = 4;
  const frontSizeMin = 20;
  const frontSizeMax = 180;
  const frontOffsetMin = 0.5;
  const frontOffsetMax = 1;
  const frontLengthMin = 0.75;
  const frontLengthMax = 2.5;
  const frontElementsNumMin = 5;
  const frontElementsNumMax = 21;

  const backTexturesOptional = frontTexturesOptional;
  const backColors = frontColors;
  const backTexturesNumMin = 2;
  const backTexturesNumMax = 4;
  const backSizeMin = 180;
  const backSizeMax = 360;
  const backOffsetMin = 0.1;
  const backOffsetMax = 0.2;
  const backLengthMin = 0.5;
  const backLengthMax = 0.6;
  const backElementsNumMin = 0;
  const backElementsNumMax = 5;

  const easingFn = rand.choice(easingFunctions) as (n: number) => number;

  const oversizeTexturesSelected = rand.sample(
    oversizeTexturesOptional,
    rand.int(oversizeElementsNumMin, oversizeElementsNumMax)
  );
  const oversizeElements = oversizeTexturesSelected.map(
    texture => ({
      texture,
      size: rand.int(oversizeSizeMin, oversizeSizeMax),
      distance: 0,
      color: rand.choice(oversizeColors)
    })
  );

  const bodyTexturesOptionalSelected = rand.sample(
    bodyTexturesOptional,
    rand.int(bodyTexturesOptionalNumMin, bodyTexturesOptionalNumMax)
  );
  const bodyElements = [
    ...bodyTexturesRequired.map(texture => ({ 
      texture, 
      size: rand.int(bodySizeMin, bodySizeMax), 
      distance: 0, 
      color: rand.choice(bodyColors) })
      ),
    ...bodyTexturesOptionalSelected.map(texture => ({ 
      texture, 
      size: rand.int(bodySizeMin, bodySizeMax), 
      distance: 0, 
      color: rand.choice(bodyColors) })
      )
  ];

  const frontTexturesSelected = rand.sample(frontTexturesOptional, rand.int(frontTexturesNumMin, frontTexturesNumMax));
  const frontNumElements = rand.int(frontElementsNumMin, frontElementsNumMax);
  const frontDistanceStart = rand.float(frontOffsetMin, frontOffsetMax);
  const frontDistanceEnd = frontDistanceStart + rand.float(frontLengthMin, frontLengthMax);
  const frontElementProps = new Array(frontNumElements).fill(0).map(() => {
    const progress = easingFn(rand.rand());
    return {
      texture: rand.choice(frontTexturesSelected),
      size: lerp(frontSizeMin, frontSizeMax, easingFn(1 - progress)),
      distance: lerp(frontDistanceStart, frontDistanceEnd, progress),
      color: rand.choice(frontColors)
    };
  });

  const backTexturesSelected = rand.sample(backTexturesOptional, rand.int(backTexturesNumMin, backTexturesNumMax));
  const backNumElements = rand.int(backElementsNumMin, backElementsNumMax);
  const backDistanceStart = rand.float(backOffsetMin, backOffsetMax);
  const backDistanceEnd = backDistanceStart + rand.float(backLengthMin, backLengthMax);
  const backElements = new Array(backNumElements).fill(0).map(() => {
    const progress = easingFn(rand.rand());
    return {
      texture: rand.choice(backTexturesSelected),
      size: lerp(backSizeMin, backSizeMax, easingFn(1 - progress)),
      distance: -lerp(backDistanceStart, backDistanceEnd, progress),
      color: rand.choice(backColors)
    };
  });

  return [...oversizeElements, ...bodyElements, ...frontElementProps, ...backElements];
}

const defaultElement: LensflareElement = {
  texture: `${TEXTURE_PATH}cirlceBlur.png`,
  size: 64,
  distance: 0,
  color: new Color("white")
}

const threeLensflare = new Lensflare();
// NOTE: THREE.Lensflare doesn't expose `elements` – the "parts" of a lensflare. 
// We'll maintain a reference that we can update.
const threeElements: LensflareElement = [];

const dispose = () => {
  while (threeElements.length) threeElements.pop();
  lensflareRef.value?.children.forEach((c: any) => { if ('dispose' in c) c.dispose(); });
  lensflareRef.value?.remove(...lensflareRef.value.children);
}

const onChange = () => {
  if (lensflareRef.value) {

    const normalizedUserElements = (() => {
      // NOTE: The user can either tweak the seeded lensflare or provide their own.
      const flare = props.flare || [];

      // NOTE: There are 2 variables leading to the following results
      // hasSeed | hasFlare
      // T | T : Use seeded elements with user flare as tweaks
      // F | T : Use user flare, fill missing values with defaults
      // T | F : Use the seeded elements
      // F | F : Use seeded elements with seed == 0

      const hasSeed = typeof props.seed !== 'undefined';
      const hasFlare = Array.isArray(props.flare);

      if (hasSeed && hasFlare) {
        return getSeededFlareElements().map((element, i) => Object.assign({}, element, flare[i]));
      } else if (!hasSeed && hasFlare) {
        return flare.map(element => Object.assign({}, defaultElement, element))
      } else if (hasSeed && !hasFlare) {
        return getSeededFlareElements();
      } else {
        return getSeededFlareElements();
      }
    })();

    normalizedUserElements.forEach(el => {
      if (typeof el.texture === 'string') {
        el.texture = textureLoader.load(el.texture);
      }
      el.color = normalizeColor(el.color);
    });

    // NOTE: The THREE lensflare, doesn't expose "elements", so keep a copy.
    while (normalizedUserElements.length > threeElements.length) {
      const element = Object.assign({}, defaultElement);
      threeElements.push(element);
      threeLensflare.addElement(element);
    }

    // NOTE: We can't remove already added elements from the THREE lensflare. 
    // So if we've previously added more elements than are currently needed, 
    // make those elements too small to display.
    while (normalizedUserElements.length < threeElements.length) {
      for (let i = normalizedUserElements.length - 1; i < threeElements.length; i++) {
        threeElements[i].size = 0;
      }
    }

    normalizedUserElements.forEach((userElement, i) => {
      const threeElement = threeElements[i];
      const { texture, size, distance, color } = userElement;

      if (threeElement.texture !== texture) {
        if (threeElement.texture?.dispose) {
          threeElement.texture.dispose();
        }
        threeElement.texture = texture;
      }

      threeElement.size = size * props.scale;
      threeElement.distance = distance * props.scale;
      threeElement.color = color;
    });
  }
}

onMounted(() => {
  lensflareRef.value.add(threeLensflare);
  onChange();
})

onUnmounted(() => {
  dispose();
});

watch(() => props.flare, onChange)

</script>

<template>
  <TresGroup v-bind="$attrs" ref="lensflareRef"></TresGroup>
</template>
