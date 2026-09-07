<script setup lang="ts">

const { nodes, state } = useGLTF('/models/portals-rpg/adventurers-camp.glb', { draco: true })


const trees = computed(() => {
  return Object.entries(nodes.value).map(([key, value]) => key.includes('Tree') ? value : null)
    .filter(Boolean)
})

const logs = computed(() => {
  return Object.entries(nodes.value).map(([key, value]) => key.includes('Log') ? value : null)
    .filter(Boolean)
})

const lutes = computed(() => {
  return Object.entries(nodes.value).map(([key, value]) => key.includes('Lute') ? value : null)
    .filter(Boolean)
})


</script>

<template>
  <TresAmbientLight :intensity="1.5" />
  <TresGroup v-if="nodes?.Ground" :position="[0, -2, -8]">
    <primitive name="Ground" :object="nodes['Ground']" />
    <TresGroup v-if="trees" name="Trees">
      <primitive v-for="tree in trees" :key="tree.name" :object="tree" />
    </TresGroup>
    <PortalsRpgDifficultyFireplace :nodes="nodes" />
    <TresGroup name="Logs">
      <primitive v-for="log in logs" :key="log.name" :object="log" />
    </TresGroup>
    <PortalsRpgDifficultyEngineer :nodes="nodes" :state="state" />
    <primitive name="Backpack" :object="nodes['Engineer_Backpack']" />
    <primitive v-for="lute in lutes" :key="lute.name" :object="lute" />

    <primitive name="BeerMug" :object="nodes['Mug_Beer']" />
  </TresGroup>
</template>