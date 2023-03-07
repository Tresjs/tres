import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponent,
  addTemplate,
  addVitePlugin,
  addComponentsDir,
  addImportsDir,
} from '@nuxt/kit'
import * as THREE from 'three'
import glsl from 'vite-plugin-glsl'
// Module options TypeScript inteface definition
export interface ModuleOptions {
  prefix?: string
  modules?: string[]
  shaders?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@tresjs/nuxt',
    configKey: 'tres',
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '^3.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    prefix: 'Tres',
    modules: [],
    shaders: false,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    for (const comp in THREE) {
      if (comp === 'Scene') continue
      addTemplate({
        filename: `tres/three/${comp}.ts`,
        getContents: () => `
        import { ref } from 'vue'
        import createComponentInstances from '../instance-creator'
        import { ${comp} } from 'three'
        const component = /* #__PURE__ */ createComponentInstances(ref({ ${comp} }))
        export default component[0][1]
        `,
      })
      addComponent({
        name: `${options.prefix}${comp}`,
        filePath: `#build/tres/three/${comp}.ts`,
        /* mode: 'client', */
      })
    }

    // Register core components
    addComponent({
      name: `${options.prefix}Canvas`,
      filePath: '@tresjs/core',
      export: 'TresCanvas',
      /* mode: 'client', */
    })
    addComponent({
      name: `${options.prefix}Scene`,
      filePath: '@tresjs/core',
      export: 'TresScene',
      /* mode: 'client', */
    })

    addTemplate({
      filename: 'tres/instance-creator.ts',
      getContents: () => `
      import { useInstanceCreator } from '@tresjs/core'
      const { createComponentInstances } = useInstanceCreator('${options.prefix}')
      export default createComponentInstances
      `,
    })

    // Add other modules
    /* for (const module of options.modules || []) {
      nuxt.options.build.transpile.push(`@tresjs/${module}`)
      addComponentsDir({
        path: `@tresjs/${module}/src/components`,
      })
      console.log({
        module,
      })
      addImportsDir(`@tresjs/${module}/src/composables`)
    } */
    if (options.shaders) {
      addVitePlugin(glsl())
    }
  },
})
