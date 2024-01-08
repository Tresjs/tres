import { NuxtModule, RuntimeConfig } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["unocss"]?: typeof import("@unocss/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["icon"]?: typeof import("nuxt-icon").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["colorMode"]?: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["ui"]?: typeof import("@nuxt/ui").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["vueuse"]?: typeof import("/Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/@vueuse+nuxt@10.7.1_nuxt@3.9.1_rollup@3.29.4_vue@3.4.5/node_modules/@vueuse/nuxt/index").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["devtoolsUIKit"]?: typeof import("@nuxt/devtools-ui-kit").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["devtools"]?: typeof import("/Users/alvarosabu/.nvm/versions/node/v18.14.1/lib/node_modules/@nuxt/devtools/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@unocss/nuxt", Exclude<NuxtConfig["unocss"], boolean>] | ["nuxt-icon", Exclude<NuxtConfig["icon"], boolean>] | ["@nuxtjs/color-mode", Exclude<NuxtConfig["colorMode"], boolean>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@nuxt/ui", Exclude<NuxtConfig["ui"], boolean>] | ["/Users/alvarosabu/Projects/tres/core/node_modules/.pnpm/@vueuse+nuxt@10.7.1_nuxt@3.9.1_rollup@3.29.4_vue@3.4.5/node_modules/@vueuse/nuxt/index", Exclude<NuxtConfig["vueuse"], boolean>] | ["@nuxt/devtools-ui-kit", Exclude<NuxtConfig["devtoolsUIKit"], boolean>] | ["/Users/alvarosabu/.nvm/versions/node/v18.14.1/lib/node_modules/@nuxt/devtools/module", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
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