import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/alvarosabu/Projects/tres/playground/node_modules/.pnpm/nuxt@3.4.1_@types+node@18.15.11/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}