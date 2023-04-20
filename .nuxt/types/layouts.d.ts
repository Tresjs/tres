import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "experiment"
declare module "/Users/alvarosabu/Projects/tres/playground/node_modules/.pnpm/nuxt@3.4.1_@types+node@18.15.11/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}