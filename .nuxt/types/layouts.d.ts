import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "experiment"
declare module "C:/Users/Jaime/Desktop/packages-libraries/tres-group/playground/node_modules/.pnpm/nuxt@3.4.2_@types+node@18.15.12/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}