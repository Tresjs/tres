import { UserConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { existsSync, statSync } from 'node:fs'
import { LoadConfigResult, LoadConfigSource } from 'unconfig'
import { createConfigLoader as createLoader } from 'unconfig'

export interface TresOptions extends UserConfig {
  /**
   * Path to the config file.
   *
   * Default resolving to `tres.config.[js|mjs|cjs|ts|cts|mts]`
   *
   * Setting to `false` will disable config resolving.
   */
  config?: string | false
  /**
   * @default 'index.html'
   */
  entryPoint?: string
}

export interface ResolvedTresOptions {
  entryPoint: string
  vite: UserConfig
}

const defaultConfig: TresOptions = {
  base: '/',
  server: {
    open: true,
  },
  entryPoint: 'index.html',
}

export async function loadConfig<U extends TresOptions>(
  cwd = process.cwd(),
  configOrPath: string | U = cwd,
  extraConfigSources: LoadConfigSource[] = [],
  defaults: TresOptions = defaultConfig,
): Promise<LoadConfigResult<U>> {
  let inlineConfig = {} as U
  if (typeof configOrPath !== 'string') {
    inlineConfig = configOrPath
    if (inlineConfig.config === false) {
      return {
        config: inlineConfig as U,
        sources: [],
      }
    } else {
      configOrPath = inlineConfig.config || process.cwd()
    }
  }

  const resolved = resolve(cwd, configOrPath)

  let isFile = false
  if (existsSync(resolved) && statSync(resolved).isFile()) {
    isFile = true
    cwd = dirname(resolved).replace(/\\/g, '/')
  }

  const loader = createLoader<U>({
    sources: isFile
      ? [
          {
            files: resolved,
            extensions: [],
          },
        ]
      : [
          {
            files: ['tres.config'],
          },
          ...extraConfigSources,
        ],
    cwd,
    defaults: inlineConfig,
  })

  const result = await loader.load()
  result.config = Object.assign(defaults, result.config || inlineConfig)

  return result
}
