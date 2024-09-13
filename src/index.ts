import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config'
import antfu from '@antfu/eslint-config'
import antfuOptions from './rules/antfu'
import base from './rules/base'
import nuxt from './rules/nuxt'

const tresLintConfig = (
  options: OptionsConfig & TypedFlatConfigItem = {},
  ...configs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]
): Promise<TypedFlatConfigItem[]> => {
  return antfu(
    // @antfu/eslint-config options, must be the first argument
    {
      ...antfuOptions,
      ...options,
    },
    // Addtionals flat configs start from here
    base as TypedFlatConfigItem,
    ...configs,
  )
}

export {
  nuxt,
  tresLintConfig,
}
