<script setup lang="ts">
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare'
import { TextureLoader } from 'three'
import { watch, shallowRef, onMounted, onUnmounted } from 'vue'
import { normalizeColor } from '@tresjs/core'
import { LensflareElementProps, partialLensflarePropsArrayToLensflarePropsArray as fillInProps, SeedProps } from '.'

const props = withDefaults(
  defineProps<{
    elements?: Partial<LensflareElementProps>[],
    scale?: number,
    seed?: number,
    seedProps?: SeedProps[]
  }>(),
  {
    elements: undefined,
    scale: 1,
    seed: undefined,
    seedProps: undefined,
  },
)

const lensflareRef = shallowRef<Lensflare>();
const lensflareElementPropsArray = shallowRef<LensflareElementProps[]>([]);

defineExpose({
  value: lensflareRef,
});

const textureLoader = new TextureLoader();

const threeLensflare = new Lensflare();
// NOTE: THREE.Lensflare doesn't expose `elements` – the "parts" of a lensflare. 
// We'll maintain references that we can update.
const threeElements: LensflareElement[] = [];

const dispose = () => {
  while (threeElements.length) threeElements.pop();
  lensflareRef.value?.children.forEach((c: any) => { if ('dispose' in c) c.dispose(); });
  lensflareRef.value?.remove(...lensflareRef.value.children);
  lensflareRef.value?.dispose();
}

const lensflareElementPropsToLensflareElement = (p: LensflareElementProps) => {
  if (typeof p.texture === 'string') {
    const path = p.texture;
    p.texture = textureLoader.load(path);
    p.texture.name = path;
  }
  p.color = normalizeColor(p.color);
  return p as LensflareElement;
}

const updateThreeElements = () => {
  while (lensflareElementPropsArray.value.length > threeElements.length) {
    const element = lensflareElementPropsToLensflareElement(lensflareElementPropsArray.value[threeElements.length]);
    threeElements.push(element);
    threeLensflare.addElement(element);
  }

  lensflareElementPropsArray.value.forEach((elementProps, i) => {
    const threeElement = threeElements[i];
    const { texture, size, distance, color } = elementProps;
    if (typeof texture === 'string') {
      if (threeElement.texture.name !== texture) {
        threeElement.texture.dispose();
        const name = texture;
        threeElement.texture = textureLoader.load(name);
        threeElement.texture.name = name;
      }
    } else {
      if (threeElement.texture !== texture) {
        threeElement.texture.dispose();
        threeElement.texture = texture;
      }
    }

    threeElement.size = size;
    threeElement.distance = distance;
    threeElement.color = normalizeColor(color);
  });

  scaleThreeElements();
}

const scaleThreeElements = () => {
  // NOTE: We can't remove already added elements from the THREE lensflare. 
  // So if we've previously added more elements than are currently needed, 
  // make those elements too small to display.
  for (let i = lensflareElementPropsArray.value.length - 1; i < threeElements.length; i++) {
    threeElements[i].size = 0;
  }

  lensflareElementPropsArray.value.forEach((elementProps, i) => {
    threeElements[i].size = elementProps.size * props.scale;
  });
}

onUnmounted(() => {
  dispose();
});

onMounted(() => {
  lensflareRef.value?.add(threeLensflare);
  lensflareElementPropsArray.value = fillInProps(props.elements, props.seed, props.seedProps);
})

watch(() => [props.elements, props.seed, props.seedProps], () => {
  lensflareElementPropsArray.value = fillInProps(props.elements, props.seed, props.seedProps);
})

watch(() => props.scale, () => {
  scaleThreeElements();
});

watch(() => lensflareElementPropsArray.value, () => {
  updateThreeElements();
});

</script>

<template>
  <TresGroup ref="lensflareRef"></TresGroup>
</template>
