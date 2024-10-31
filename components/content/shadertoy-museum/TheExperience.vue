<script setup lang="ts">
import Floor from './components/Floor.vue';
import Gallery from './components/Gallery.vue';
import Camera from './components/Camera.vue';
import ShaderToy from './components/ShaderToy.vue';
</script>

<template>
    <Camera />
    <ShaderToy />
    <Lights />
    <Effects />

    <Suspense>
        <Floor />
    </Suspense>
    <Suspense>
        <Gallery />
    </Suspense>
</template>