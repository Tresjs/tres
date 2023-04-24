import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "C:/Users/Jaime/Desktop/packages-libraries/tres-group/playground/node_modules/.pnpm/nuxt@3.4.2_@types+node@18.15.13/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}