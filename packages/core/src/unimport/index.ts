import type { Addon, AddonsOptions, InlinePreset } from 'unimport'

/**
 * Add auto-import `@tresjs/core` composables to your application via [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) or Nuxt.
 *
 * To auto-import `@tresjs/core` composables using [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import):
 * ```ts
 * import { TresCoreComposables } from '@tresjs/core/unimport'
 *
 * AutoImport({
 *   imports: [TresCoreComposables()]
 * })
 * ```
 *
 * To auto-import `@tresjs/core` composables using a Nuxt module:
 * ```ts
 * import { TresCoreComposables } from '@tresjs/core/unimport'
 * // inside the setup function
 * nuxt.hook('imports:sources', (sources) => {
 *   sources.push(TresCoreComposables())
 * })
 * ```
 *
 * To auto-import `@tresjs/core` composables using Nuxt configuration file:
 * ```ts
 * import { TresCoreComposables } from '@tresjs/core/unimport'
 * // inside the defineNuxtConfig options
 * imports: {
 *   presets: [TresCoreComposables()],
 * }
 * ```
 *
 * @param prefix Add `useTres` prefix (`useCameraManager` becomes `useTresCameraManager`)?. The prefix is `false` if omitted. The composables starting with `useTres` won't add the prefix.
 * @returns The inline preset for the composables.
 */
export function TresCoreComposables(prefix = false) {
  const composables = [
    'useCameraManager',
    'useGraph',
    'useLoader',
    'useLoop',
    'useRendererManager',
    'useTres',
    'useTresContext',
    'useTresContextProvider',
  ]
  return {
    from: '@tresjs/core/composables',
    imports: composables.map(name => ({
      name,
      as: prefix && !name.startsWith('useTres') ? `useTres${name.slice(3)}` : undefined,
    })),
  } satisfies InlinePreset
}

/**
 * Add auto-import `@tresjs/core` directives to your application via [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) or Nuxt.
 *
 * To auto-import `@tresjs/core` directives using [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import):
 * ```ts
 * import { TresCoreDirectives } from '@tresjs/core/unimport'
 *
 * AutoImport({
 *   imports: [TresCoreDirectives()],
 *   vueDirectives: true
 * })
 * ```
 *
 * To auto-import `@tresjs/core` directives using a Nuxt module:
 * ```ts
 * import { TresCoreDirectives } from '@tresjs/core/unimport'
 * // inside the setup function
 * nuxt.hook('imports:sources', (sources) => {
 *   sources.push(TresCoreDirectives())
 * })
 * ```
 *
 * To enable auto-import `@tresjs/core` directives using Nuxt configuration file:
 * ```ts
 * import { TresCoreDirectives } from '@tresjs/core/unimport'
 * // inside the defineNuxtConfig options
 * imports: {
 *   presets: [TresCoreDirectives()],
 *   addons: {
 *     vueDirectives: true
 *   }
 * }
 * ```
 *
 * @param prefix Add `Tres` prefix (`v-log` becomes `v-tres-log` when prefix is `true`)?. The prefix is `false` if omitted.
 * @returns The inline preset for the directives.
 * @see enableDirectives
 */
export function TresCoreDirectives(prefix = false) {
  const directives = [
    'vDistanceTo',
    'vLightHelper',
    'vLog',
  ]
  return {
    from: '@tresjs/core/directives',
    meta: {
      vueDirective: true,
    },
    imports: directives.map(name => ({
      name,
      as: prefix ? `vTres${name.slice(1)}` : undefined,
      meta: {
        vueDirective: true,
      },
    })),
  } satisfies InlinePreset
}

/**
 * Helper function to enable auto-importing Vue directives with Nuxt.
 *
 * To auto-import `@tresjs/core` directives using a Nuxt module:
 * ```ts
 * import { enableDirectives } from '@tresjs/core/unimport'
 * // inside the setup function
 * const imports = nuxt.options.imports
 * imports.addons = enableDirectives(imports.addons as AddonsOptions | Addon[] | undefined)
 * ```
 *
 * To auto-import `@tresjs/core` directives using Nuxt configuration file:
 * ```ts
 * import { TresCoreDirectives } from '@tresjs/core/unimport'
 * // inside the defineNuxtConfig options
 * imports: {
 *   presets: [TresCoreDirectives()],
 *   addons: {
 *     vueDirectives: true
 *   }
 * }
 * ```
 *
 * @param addons The addons to include.
 * @return The modified addons with the directives enabled.
 */
export function enableDirectives(addons?: AddonsOptions | Addon[]): AddonsOptions {
  if (!addons) {
    return { vueDirectives: true }
  }

  if (Array.isArray(addons)) {
    return { vueDirectives: true, addons }
  }

  return {
    ...addons,
    vueDirectives: addons.vueDirectives ?? true,
    addons: addons.addons,
  }
}
