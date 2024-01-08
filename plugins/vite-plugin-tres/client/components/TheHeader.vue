<script lang="ts" setup>
const route = useRoute()
</script>

<template>
  <header
    class="w-full h-46px px4 flex items-center justify-between bg-white dark:bg-dark border-b border-base z-10"
    border="b base"
  >
    <div
      v-if="route.path === '/'"
      class="flex items-center gap-4"
    >
      <img
        
        src="/logo.svg"
        alt="tres logo"
      >
      <h2 class="text opacity-60 font-bold">
        TresJS DevTools
      </h2>
    </div>
    <div
      v-else
      class="flex items-center gap-4"
    >
      <UButton
        variant="ghost"
        size="sm"
        icon="i-carbon-arrow-left"
        to="/"
      />
      <h2 class="text opacity-60 font-bold">
        {{ route.name }}
      </h2>
    </div>
    <div class="flex items-center gap-2">
      <UButton
        variant="ghost"
        size="sm"
        icon="i-carbon-document"
        target="_blank"
        to="https://docs.tresjs.org/"
      />
      <UButton
        variant="ghost"
        size="sm"
        icon="i-iconoir-github"
        target="_blank"
        to="https://github.com/Tresjs/nuxt"
      />
      <UButton
        variant="solid"
          
        size="sm"
        target="_blank"
        class="ml2"
        to="https://github.com/Tresjs/nuxt/issues/new?labels=enhancement&template=feature_request.yml"
      >
        Request feature
      </UButton>
    </div>
  </header>
</template>

<style scoped></style>
