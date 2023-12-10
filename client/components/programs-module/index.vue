<script setup lang="ts">
const { renderer } = useDevtoolsHook()

const icons: Record<string, string> = {
  shaderMaterial: 'i-file-icons-vertexshader',
}

const programs = computed(() => renderer.info.programs.map(
  item => ({
    ...item,
    icon: icons[item.type] || 'i-file-icons-vertexshader',
    uniforms: item.getUniforms(),
    attributes: item.getAttributes(),
  })))
</script>

<template>
  <ProgramsModuleItem
    v-for="item in programs"
    :key="item.id"
    :item="item"
  />
</template>