<script setup lang="ts">
import { useDevtoolsHook } from '../composables/useDevtoolsHook'
import { computed } from '#imports'

const { renderer } = useDevtoolsHook()

const icons: Record<string, string> = {
  shaderMaterial: 'i-file-icons-vertexshader',
}

const programs = computed(() => renderer.info.programs.map(
  item => ({
    ...item,
    // @ts-expect-error there is a complex relationship between gl and tresjs types
    icon: icons[item.type] || 'i-file-icons-vertexshader',
    // @ts-expect-error for some reason getUniforms is not typed
    uniforms: item.getUniforms(),
    // @ts-expect-error for some reason getAttributes is not typed
    attributes: item.getAttributes(),
  }),
))
</script>

<template>
  <ProgramsModuleItem
    v-for="item in programs"
    :key="item.id"
    :item="item"
  />
</template>
