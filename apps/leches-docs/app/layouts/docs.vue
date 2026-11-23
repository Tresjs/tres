<script setup lang="ts">

</script>

<template>
  <div class="bg-pattern px-0 md:px-8 w-full ">
    <UPage class="bg-default border-l border-r border-gray-200 dark:border-gray-800 px-4">
      <template #left>
        <AppSide />
      </template>
      <UContainer>
        <slot></slot>
      </UContainer>
    </UPage>
  </div>
</template>
