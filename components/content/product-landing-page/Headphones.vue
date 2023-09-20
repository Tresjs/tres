<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    required: true,
  },
})

const { nodes, materials } = await useGLTF('/models/headphones/headphones.gltf', {
  draco: true,
})

watch(
  () => props.color,
  (color) => {
    materials.Base.color.set(color)

    if (color === '#000000') {
      materials.Base.roughness = 1
      materials.Cush.color.set('#050505')
    }
    else {
      materials.Cush.color.set('#A4BCB7')
    }
  },
  { immediate: true },
)
</script>

<template>
  <Levioso>
    <primitive :object="nodes.Headphones_7" />
  </Levioso>
  <ContactShadows
    :opacity="0.2"
    :blur="3"
    :position="[0, -2, 0]"
  />
</template>
