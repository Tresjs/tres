<script setup lang="ts">
const props = defineProps<{
  /** Skip the collapsed button and always show the field (phone drawer). */
  alwaysOpen?: boolean
}>()

const query = useExperimentQuery()
const expanded = ref(props.alwaysOpen || !!query.value)
const input = ref<{ inputRef: HTMLInputElement | null } | null>(null)

async function expand() {
  expanded.value = true
  await nextTick()
  input.value?.inputRef?.focus()
}

function collapse() {
  if (props.alwaysOpen) { return }
  query.value = ''
  expanded.value = false
}

// Keep the field open while it holds a filter, otherwise the list would look filtered for no visible reason.
function onBlur() {
  if (!query.value) { collapse() }
}

defineExpose({ expand })
</script>

<template>
  <UInput
    v-if="expanded"
    ref="input"
    v-model="query"
    icon="i-lucide-search"
    size="xs"
    variant="soft"
    placeholder="Filter experiments..."
    aria-label="Filter experiments"
    class="min-w-0 flex-1"
    @blur="onBlur"
    @keydown.esc="collapse"
  >
    <template v-if="query" #trailing>
      <UButton
        icon="i-lucide-x"
        color="neutral"
        variant="link"
        size="xs"
        aria-label="Clear filter"
        class="-me-1"
        @mousedown.prevent
        @click="query = ''"
      />
    </template>
  </UInput>
  <UTooltip v-else text="Filter experiments">
    <UButton
      icon="i-lucide-search"
      color="neutral"
      variant="ghost"
      size="xs"
      aria-label="Filter experiments"
      aria-keyshortcuts="Meta+K"
      class="ml-auto"
      @click="expand"
    >
      <template #trailing>
        <span class="flex items-center gap-0.5">
          <UKbd value="meta" size="sm" />
          <UKbd value="k" size="sm" />
        </span>
      </template>
    </UButton>
  </UTooltip>
</template>
