<script setup lang="ts">
import type { ComponentInternalInstance } from 'vue'
import { getCurrentInstance, nextTick, onMounted, onUpdated, provide, shallowRef } from 'vue'
import type { ComposedEffect } from './context'
import { effectComposerInjectionKey } from './context'
import { isSameOrder, orderEffectsBySlot } from './graph'
import RenderPipelineHost from './RenderPipelineHost'

export interface EffectComposerProps {
  /** `false` renders the scene without the effects. */
  enabled?: boolean
}

withDefaults(defineProps<EffectComposerProps>(), { enabled: true })

const instance = getCurrentInstance()!
const added = new Set<ComposedEffect>()
const effects = shallowRef<readonly ComposedEffect[]>([])
const watchedAncestors = new WeakSet<ComponentInternalInstance>()

// Reads the rendered tree, so it runs after the patch that added, removed or moved an effect.
const sortEffects = () => {
  if (instance.isUnmounted) { return }
  const next = orderEffectsBySlot(instance.subTree, added)
  if (!isSameOrder(next, effects.value)) { effects.value = next }
}

// A wrapper that moves its own child effects re-renders only itself, so the composer also sorts on its updates.
const watchAncestors = (effect: ComposedEffect) => {
  for (let parent = effect.instance.parent; parent && parent !== instance; parent = parent.parent) {
    if (watchedAncestors.has(parent)) { return }
    watchedAncestors.add(parent)
    onUpdated(sortEffects, parent)
  }
}

provide(effectComposerInjectionKey, {
  add: (effect) => {
    added.add(effect)
    watchAncestors(effect)
    nextTick(sortEffects)
  },
  remove: (effect) => {
    added.delete(effect)
    nextTick(sortEffects)
  },
})

onMounted(sortEffects)
onUpdated(sortEffects)
</script>

<template>
  <RenderPipelineHost v-if="enabled" :effects="effects" />
  <slot></slot>
</template>
