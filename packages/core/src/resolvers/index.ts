import type { ComponentResolver } from 'unplugin-vue-components'

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
