import { createUnplugin } from 'unplugin'
import * as THREE from 'three'
import fs from 'fs'
import { join } from 'pathe'

export const unplugin = createUnplugin(() => {
  return {
    name: 'unplugin-tres',
    buildStart() {
      console.log('✨ Magically generating components...')
      const outputDir = join('.tres', 'components')

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      let indexTemplate = ''

      for (const key in THREE) {
        const value = (THREE as any)[key]
        if (key === 'Scene') continue
        if (typeof value === 'function' && /^\s*class\s+/.test(value.toString())) {
          const outputFilePath = join(outputDir, `${key}.ts`)

          const template = `
      import { defineComponent } from 'vue';
      import { ${key} } from 'three';

      export const Tres${key} = /* #__PURE__ */ defineComponent({
        name: 'Tres${key}',
        props: ['parentInstance'],
        setup(props, { slots, expose, ...rest }) {
          const ${key}Instance = new ${key}();
          console.log('instance', {${key}Instance, props, slots: slots.default ? slots.default() : null, rest, type: ${key}.name})
          expose({${key}Instance})

          function append(parent, child) {
            const regex = /[A-Z][a-z]+/g
            const propName = child.type.match(regex).pop().toLowerCase()
            if (parent[propName]) {
              parent[propName] = child
            }
          }
      
          if (props.parentInstance) {
            append(props.parentInstance, ${key}Instance)
          }

          const preparedSlots = slots.default 
            // eslint-disable-next-line max-len
            ? slots.default().map((slot) => { slot.props = { 
              ...slot.props, 
              parentInstance: ${key}Instance }; 
              return slot; 
            })
            : null
          return () => {
            return preparedSlots;
          };
        },
      });

      export default Tres${key};
    `
          indexTemplate += `export { default as Tres${key} } from './${key}'\n`
          fs.writeFileSync(outputFilePath, template)
        }

        fs.writeFileSync(join(outputDir, `index.ts`), indexTemplate)
      }
    },
  }
})

export const ViteTresPlugin = unplugin.vite
