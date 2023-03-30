<script setup lang="ts"></script>
<template>
  <router-link to="/shapes">Shapes</router-link>
  <Suspense>
    <ShadersExperiment />
  </Suspense>
</template>
