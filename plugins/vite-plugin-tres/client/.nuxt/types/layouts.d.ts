import { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = string
declare module "../../../../../node_modules/.pnpm/nuxt@3.9.1_eslint@8.56.0_rollup@3.29.4_typescript@5.3.3_vite@5.0.11/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}