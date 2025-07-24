<script setup lang="ts">
const navigation = inject(navigationInjectionKey)

const { header } = useAppConfig()

const route = useRoute()

const version = useRuntimeConfig().public.pkgVersion
</script>

<template>
  <UHeader
    :ui="{ center: 'flex-1' }"
    :to="header?.to || '/'"
  >
    <UContentSearchButton
      v-if="header?.search"
      :collapsed="false"
      class="w-full"
      variant="subtle"
    />

    <template
      v-if="header?.logo?.dark || header?.logo?.light || header?.title"
      #title
    >
      <UColorModeImage
        v-if="header?.logo?.dark || header?.logo?.light"
        :light="header?.logo?.light!"
        :dark="header?.logo?.dark!"
        :alt="header?.logo?.alt"
        class="h-6 w-auto shrink-0"
      />

      <span v-else-if="header?.title">
        {{ header.title }}
      </span>
    </template>

    <template
      v-else
      #left
    >
      <NuxtLink
        :to="header?.to || '/'"
        class="mr-2"
      >
        <TheLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
      <UBadge
        color="primary"
        variant="subtle"
        size="sm"
      >
        {{ version }}
      </UBadge>
    </template>

    <template #right>
      <UContentSearchButton
        v-if="header?.search"
        class="lg:hidden"
        variant="subtle"
      />

      <!-- <template v-if="header?.navigation">
        <UButton
          v-for="(item, index) of header.navigation"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...item }"
        />
      </template> -->

      <UNavigationMenu
        v-if="route.path === '/'"
        :items="header?.navigation"
        class="hidden md:flex"
      />

      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #body>
      <UContentNavigation
        highlight
        :navigation="navigation"
      />
    </template>
  </UHeader>
</template>
