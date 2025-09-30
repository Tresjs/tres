<script setup lang="ts">
import { NoToneMapping, SRGBColorSpace } from 'three'
import { TresCanvas } from '@tresjs/core'
import { Image, OrbitControls } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const URL_STUB = 'https://upload.wikimedia.org/wikipedia/commons/'

const URLS = [
  'f/f0/Cyanistes_caeruleus_Oulu_20150516.JPG',
  '3/36/Cyanistes_caeruleus_Oulu_20130323.JPG',
  '2/2e/Cyanistes_caeruleus_Oulu_20170507_02.jpg',
].map(url => URL_STUB + url)
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 0, 2]" />
    <OrbitControls />
    <Image :url="URLS[0]" :radius="0.2" :transparent="true" :position="[-1.5, 0, -1]" />
    <Image :url="URLS[1]" :radius="0.2" :transparent="true" />
    <Image :url="URLS[2]" :radius="0.2" :transparent="true" :position="[1.5, 0, -1]" />
  </TresCanvas>
</template>
