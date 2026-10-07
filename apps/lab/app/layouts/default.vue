<script setup lang="ts">
import { useLocalStorage, useMediaQuery } from '@vueuse/core'

// The shell: it stays mounted while pages swap the viewer and article, so the sidebar keeps its scroll.
await useExperiments()

// initOnMounted: SSR has no storage, reading it during hydration would mismatch the markup.
const collapsed = useLocalStorage('lab-sidebar-collapsed', false, { initOnMounted: true })
const browseOpen = ref(false)

// ⌘K filters the sidebar, so it first makes the sidebar visible: reopen it on desktop, open the drawer below lg.
// It only reaches the shell; while the experiment iframe has focus the keypress stays inside the iframe.
const isDesktop = useMediaQuery('(min-width: 1024px)')
const search = ref<{ expand: () => Promise<void> } | null>(null)
defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => {
      if (!isDesktop.value) {
        browseOpen.value = true
        return
      }
      collapsed.value = false
      search.value?.expand()
    },
  },
})
</script>

<template>
  <div class="min-h-dvh bg-default">
    <NuxtLoadingIndicator color="var(--ui-primary)" />

    <aside
      id="lab-sidebar"
      class="fixed inset-y-0 left-0 z-20 hidden w-80 flex-col border-r border-dashed border-default bg-default transition-transform duration-300 lg:flex"
      :class="collapsed ? '-translate-x-full' : 'translate-x-0'"
    >
      <div class="flex h-12 shrink-0 items-center gap-3 border-b border-dashed border-default px-4">
        <TheBrand />
        <TheSidebarSearch ref="search" />
      </div>
      <!-- Cross where the sidebar edge meets the header line, same marker as the viewer frame corners. -->
      <UIcon
        name="i-lucide-plus"
        class="absolute top-12 -right-2 size-4 -translate-y-1/2 text-dimmed transition-opacity"
        :class="collapsed ? 'opacity-0' : 'opacity-100'"
      />
      <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <TheSidebarList />
      </div>

      <button
        type="button"
        class="absolute top-1/2 left-full flex -translate-y-1/2 flex-col items-center gap-1 rounded-r-md border border-l-0 border-default bg-default px-1 py-2 font-mono text-xs text-muted transition-colors hover:text-highlighted"
        :aria-expanded="!collapsed"
        aria-controls="lab-sidebar"
        @click="collapsed = !collapsed"
      >
        <UIcon :name="collapsed ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left'" class="size-3.5" />
        <span class="[writing-mode:vertical-rl]">{{ collapsed ? 'Show' : 'Hide' }}</span>
      </button>
    </aside>

    <div
      class="transition-[padding] duration-300"
      :class="collapsed ? 'lg:pl-0' : 'lg:pl-80'"
    >
      <header class="hidden h-12 items-center gap-3 border-b border-dashed border-default px-4 lg:flex lg:px-8">
        <Transition enter-from-class="opacity-0" leave-to-class="opacity-0" enter-active-class="transition-opacity duration-300" leave-active-class="transition-opacity duration-150">
          <div v-if="collapsed" class="flex items-center gap-3 pl-6">
            <TheBrand />
          </div>
        </Transition>
        <TheToolbar class="ml-auto" />
      </header>

      <slot></slot>
    </div>

    <!-- Phone and narrow windows: the experiment fills the screen and the list lives in a drawer. -->
    <USlideover v-model:open="browseOpen" side="left" title="Experiments" :ui="{ content: 'max-w-sm', body: 'p-0 sm:p-0' }">
      <UButton
        label="Browse"
        icon="i-lucide-layout-grid"
        color="neutral"
        variant="subtle"
        size="sm"
        class="fixed top-3 left-3 z-30 shadow-lg backdrop-blur lg:hidden"
      />
      <template #title>
        <TheBrand />
      </template>
      <template #actions>
        <TheToolbar />
      </template>
      <template #body>
        <div class="border-b border-default p-3">
          <TheSidebarSearch always-open class="w-full" />
        </div>
        <TheSidebarList @select="browseOpen = false" />
      </template>
    </USlideover>
  </div>
</template>
