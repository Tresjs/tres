import { NuxtModule, RuntimeConfig } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["unocss"]?: typeof import("/Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/@unocss+nuxt@0.58.3_postcss@8.4.32_rollup@3.29.4_vite@5.0.10_webpack@5.89.0/node_modules/@unocss/nuxt/dist/index").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["vueuse"]?: typeof import("/Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/@vueuse+nuxt@10.7.1_nuxt@3.9.0_rollup@3.29.4_vue@3.4.3/node_modules/@vueuse/nuxt/index").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["colorMode"]?: typeof import("/Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/@nuxtjs+color-mode@3.3.2_rollup@3.29.4/node_modules/@nuxtjs/color-mode/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["devtoolsUIKit"]?: typeof import("@nuxt/devtools-ui-kit").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["icon"]?: typeof import("nuxt-icon").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["ui"]?: typeof import("@nuxt/ui").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["devtools"]?: typeof import("/Users/alvarosabu/.nvm/versions/node/v18.14.1/lib/node_modules/@nuxt/devtools/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["/Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/@unocss+nuxt@0.58.3_postcss@8.4.32_rollup@3.29.4_vite@5.0.10_webpack@5.89.0/node_modules/@unocss/nuxt/dist/index", Exclude<NuxtConfig["unocss"], boolean>] | ["/Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/@vueuse+nuxt@10.7.1_nuxt@3.9.0_rollup@3.29.4_vue@3.4.3/node_modules/@vueuse/nuxt/index", Exclude<NuxtConfig["vueuse"], boolean>] | ["/Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/@nuxtjs+color-mode@3.3.2_rollup@3.29.4/node_modules/@nuxtjs/color-mode/dist/module", Exclude<NuxtConfig["colorMode"], boolean>] | ["@nuxt/devtools-ui-kit", Exclude<NuxtConfig["devtoolsUIKit"], boolean>] | ["nuxt-icon", Exclude<NuxtConfig["icon"], boolean>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@nuxt/ui", Exclude<NuxtConfig["ui"], boolean>] | ["/Users/alvarosabu/.nvm/versions/node/v18.14.1/lib/node_modules/@nuxt/devtools/module", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },
  }
  interface PublicRuntimeConfig {

  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }