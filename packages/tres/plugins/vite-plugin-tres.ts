import { createUnplugin } from 'unplugin'
import * as THREE from 'three'
import fs from 'fs'
import { join } from 'pathe'

export const unplugin = createUnplugin((options: UserOptions) => {
  return {
    name: 'unplugin-tres',
    buildStart() {
      const outputDir = join('.tres', 'components')

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      for (const key in THREE) {
        const value = (THREE as any)[key]
        if (key === 'Scene') continue
        if (typeof value === 'function' && /^\s*class\s+/.test(value.toString())) {
          const outputFilePath = join(outputDir, `${key}.ts`)
          const template = `
          import { ref } from 'vue'
          import { useInstanceCreator } from 'src/core'
          const { createComponentInstances } = useInstanceCreator()
        import { ${key} } from 'three'
        const component = /* #__PURE__ */ createComponentInstances(ref({ ${key} }))
        export default component[0][1]
        `

          /* const output = `
      import { defineComponent } from 'vue';
      import { ${key} } from 'three';

      export default defineComponent({
        name: '${componentName}',
        props: ${key}.prototype,
        setup(props) {
          const ${key}Instance = new ${key}();
          return () => ${key}Instance;
        },
      });
    ` */
          fs.writeFileSync(outputFilePath, template)
        }
      }
    },
  }
})

export const ViteTresPlugin = unplugin.vite
