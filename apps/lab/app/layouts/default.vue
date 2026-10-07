<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints, useLocalStorage } from '@vueuse/core'

// The shell: it stays mounted while pages swap the viewer and article, so the sidebar keeps its scroll.
await useExperiments()

const COLLAPSED_KEY = 'lab-sidebar-collapsed'
const COLLAPSED_CLASS = 'lab-sidebar-collapsed'

// initOnMounted: SSR has no storage, reading it during hydration would mismatch the markup.
const collapsed = useLocalStorage(COLLAPSED_KEY, false, { initOnMounted: true })

// Prerendered HTML always has the sidebar open, and the stored state only arrives after hydration, so a
// collapsed sidebar would render open and then slide shut. This script sets the class before first paint;
// the collapsed styles hang off that class (`in-[.lab-sidebar-collapsed]:`) instead of the reactive ref.
useHead({
  script: [{
    key: 'lab-sidebar-collapsed',
    tagPosition: 'head',
    innerHTML: `try{if(localStorage.getItem('${COLLAPSED_KEY}')==='true')document.documentElement.classList.add('${COLLAPSED_CLASS}')}catch(e){}`,
  }],
})
watch(collapsed, (value) => {
  document.documentElement.classList.toggle(COLLAPSED_CLASS, value)
})

const browseOpen = ref(false)

// ⌘K filters the sidebar, so it first makes the sidebar visible: reopen it on desktop, open the drawer below lg.
// It only reaches the shell; while the experiment iframe has focus the keypress stays inside the iframe.
const isDesktop = useBreakpoints(breakpointsTailwind).greaterOrEqual('lg')
const sidebarSearch = ref<{ expand: () => Promise<void> } | null>(null)
defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => {
      if (!isDesktop.value) {
        browseOpen.value = true
        return
      }
      collapsed.value = false
      sidebarSearch.value?.expand()
    },
  },
})
</script>

<template>
  <div class="min-h-dvh bg-default">
    <NuxtLoadingIndicator color="var(--ui-primary)" />

    <aside
      id="lab-sidebar"
      class="fixed inset-y-0 left-0 z-20 hidden w-80 flex-col border-r border-dashed border-default bg-default transition-transform duration-300 lg:flex in-[.lab-sidebar-collapsed]:-translate-x-full"
    >
      <div class="flex h-(--ui-header-height) shrink-0 items-center gap-3 border-b border-dashed border-default px-4">
        <TheBrand />
        <TheSidebarSearch ref="sidebarSearch" />
      </div>
      <UIcon
        name="i-lucide-plus"
        class="absolute top-(--ui-header-height) -right-2 size-4 -translate-y-1/2 text-dimmed transition-opacity in-[.lab-sidebar-collapsed]:opacity-0"
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
        <UIcon name="i-lucide-chevron-left" class="size-3.5 in-[.lab-sidebar-collapsed]:rotate-180" />
        <span class="[writing-mode:vertical-rl] in-[.lab-sidebar-collapsed]:hidden">Hide</span>
        <span class="hidden [writing-mode:vertical-rl] in-[.lab-sidebar-collapsed]:inline">Show</span>
      </button>
    </aside>

    <div class="transition-[padding] duration-300 lg:pl-80 lg:in-[.lab-sidebar-collapsed]:pl-0">
      <header class="hidden h-(--ui-header-height) items-center gap-3 border-b border-dashed border-default px-4 lg:flex lg:px-8">
        <div class="hidden pl-6 in-[.lab-sidebar-collapsed]:block">
          <TheBrand />
        </div>
        <TheToolbar class="ml-auto" />
      </header>

      <slot></slot>
    </div>

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
