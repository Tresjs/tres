<script setup lang="ts">
import { CubeReflectionMapping, CubeTextureLoader, EquirectangularReflectionMapping, type CubeTexture } from 'three';
import type { LoaderProto } from '@tresjs/core';
import { useLoader, useTresContext } from '@tresjs/core';
import { RGBELoader } from 'three-stdlib'

/* const files = ref(['/px.jpg', '/nx.jpg', '/py.jpg', '/ny.jpg', '/pz.jpg', '/nz.jpg']) */
const files = ref('venice/venice_sunset_1k.hdr')
const path = 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/hdr/'
const texture: Ref<Texture | CubeTexture | null> = ref(null)
  
const { scene, invalidate } = useTresContext()

const isCubeMap = computed(() => Array.isArray((files as Ref<string[]>).value))
  const result = ref()
  const loader = computed(() => isCubeMap.value ? CubeTextureLoader as unknown as LoaderProto<CubeTexture | RGBELoader> : RGBELoader as unknown as LoaderProto<CubeTexture | RGBELoader>)

  result.value = await useLoader<CubeTexture | RGBELoader>(
    loader.value,
    isCubeMap.value ? [...unref(files)] : unref(files),
    (loader: any) => {
      if (path) { loader.setPath(unref(path)) }
      /* if (colorSpace) loader.colorSpace = colorSpace */
    },
  )
  if (result.value) {
    texture.value = result.value
    if (texture.value) {
      texture.value.mapping = isCubeMap.value ? CubeReflectionMapping : EquirectangularReflectionMapping
      scene.value.environment = texture.value
      scene.value.background = texture.value
    }
  }
</script>
<template>
  <TresMesh>
    <TresSphereGeometry args="[1, 64, 32]" />
    <TresMeshStandardMaterial :envMap="texture" />
  </TresMesh>
</template>