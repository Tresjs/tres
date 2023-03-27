import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/alvarosabu/Projects/tres/playground/node_modules/.pnpm/nuxt@3.3.2/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}