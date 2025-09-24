import type { ComponentResolver } from 'unplugin-vue-components'

/**
 * Resolver options for `unplugin-vue-components` to automatically import Tres.js components and directives:
 */
export interface TresVueResolverOptions {
  /**
   * @default false
   */
  prefixComponents?: boolean
  /**
   * @default false
   */
  prefixDirectives?: boolean
}

/**
 * Resolver for `unplugin-vue-components` to automatically import Tres.js components and directives:
 * ```ts
 * import { TresVueResolver } from '@tresjs/core/unplugin-vue-components'
 * const {
 *   TresDirectiveResolver,
 *   TresComponentResolver,
 * } = TresVueResolver()
 * // then use them in the `unplugin-vue-components` resolvers
 * Components({
 *   directives: true,
 *   resolvers: [
 *     TresDirectiveResolver,
 *     TresComponentResolver
 *   ]
 * })
 * ```
 *
 * @param options The options to configure the resolvers.
 * @returns the resolvers for components and directives.
 */
export function TresVueResolver(options: TresVueResolverOptions = {}) {
  const {
    prefixComponents = false,
    prefixDirectives = false,
  } = options

  const directives = createDirectivesResolver(
    prefixDirectives,
  )
  const components = createComponentsResolver(
    prefixComponents,
  )

  return {
    TresDirectiveResolver: directives,
    TresComponentResolver: components,
  }
}

/**
 * Directives resolver for `unplugin-vue-components`:
 * ```ts
 * import { TresDirectiveResolver } from '@tresjs/core/unplugin-vue-components'
 * // then use it in the `unplugin-vue-components` resolvers
 * Components({
 *   directives: true,
 *   resolvers: [TresDirectiveResolver()]
 * })
 * ```
 */
export function TresDirectiveResolver(prefix = false) {
  return createDirectivesResolver(prefix)
}

/**
 * Components resolver for `unplugin-vue-components`.
 * ```ts
 * import { TresComponentResolver } from '@tresjs/core/unplugin-vue-components'
 * // then use it in the `unplugin-vue-components` resolvers
 * Components({
 *   resolvers: [TresComponentResolver()]
 * })
 * ```
 */
export function TresComponentResolver(prefix = false) {
  return createComponentsResolver(prefix)
}

const directives = [
  'vDistanceTo',
  'vLightHelper',
  'vLog',
] as const

const components = {
  TresCanvas: '@tresjs/core/components',
  UseLoader: '@tresjs/core/composables',
} as const

function createComponentsResolver(prefix: boolean) {
  return {
    type: 'component',
    resolve: (name) => {
      let tresName = name
      const usePrefix = prefix && !(name in components)
      if (usePrefix) {
        if (!name.startsWith('Tres')) {
          return undefined
        }
        tresName = `${name.slice('Tres'.length)}`
      }
      const from = tresName in components
        ? components[tresName as keyof typeof components]
        : undefined

      if (!from) { return undefined }
      return {
        name: tresName,
        as: usePrefix ? name : undefined,
        type: 'component',
        from,
      }
    },
  } satisfies ComponentResolver
}

function createDirectivesResolver(prefix: boolean) {
  // Vue will transform v-<directive> to _resolveDirective('<directive>')
  // If prefix enabled, Vue will transform v-tres-<directive> to _resolveDirective('tres-<directive>')
  // unplugin-vue-components will provide the correct import when calling resolve: PascalCase(<directive>)
  // If prefix enabled, unplugin-vue-components will provide PascalCase(tres-<directive>)
  return {
    type: 'directive',
    resolve: async (name) => {
      let tresName = name
      if (prefix) {
        if (!tresName.startsWith('Tres')) {
          return undefined
        }
        tresName = tresName.slice('Tres'.length)
      }
      const directive = directives.includes(`v${tresName}`)
      if (!directive) { return undefined }

      return {
        name: tresName,
        as: prefix ? name : undefined,
        from: `@tresjs/core/directives`,
      }
    },
  } satisfies ComponentResolver
}
