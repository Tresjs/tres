import type { Awaitable, FlatConfigItem, OptionsConfig, UserConfigItem } from '@antfu/eslint-config'
import antfu from '@antfu/eslint-config'
import antfuOptions from './rules/antfu'
import base from './rules/base'
import nuxt from './rules/nuxt'

const tresLintConfig = (
  options: OptionsConfig & FlatConfigItem = {},
  ...configs: Awaitable<UserConfigItem | UserConfigItem[]>[]
): Promise<UserConfigItem[]> => {
  return antfu(
    // @antfu/eslint-config options, must be the first argument
    {
      ...antfuOptions,
      ...options,
    },
    // Addtionals flat configs start from here
    base as FlatConfigItem,
    ...configs,
  )
}

export {
  tresLintConfig,
  nuxt,
}
