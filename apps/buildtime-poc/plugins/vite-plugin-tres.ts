import { createUnplugin } from 'unplugin'
import * as THREE from 'three'

export type SizeFlexibleParams =
  | number[]
  | {
      width: number
      height: number
    }

export interface Vector2PropInterface {
  x?: number
  y?: number
  width?: number
  height?: number
}

export interface Vector3PropInterface extends Vector2PropInterface {
  z?: number
}

export type VectorFlexibleParams = THREE.Vector3 | number[] | Vector3PropInterface | number

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
      import { ${key}, Color, Vector3 } from 'three';

      let ${key}Instance: ${key};
      let instanceProps: string[] = [];

      export function normalizeVectorFlexibleParam(value: VectorFlexibleParams): Array<number> {
        if (typeof value === 'number') {
          return [value, value, value]
        }
        if (value instanceof Vector3) {
          return [value.x, value.y, value.z]
        }
        return value as Array<number>
      }
      
      export function normalizeColor(value: Color | Array<number> | string | number) {
        if (value instanceof Color) {
          return value
        }
        if (Array.isArray(value)) {
          return new Color(...value)
        }
        return new Color(value)
      }
      

      /**
       * Tres${key}Props
       * @type {Partial<${key}> & {parentInstance?: ${key}}}
       * @memberof Tres${key}
       * @description This is a partial of the ${key} class, with the parentInstance property added.
       * 
       **/
      export type Tres${key}Props = Partial<${key}> & {
        parentInstance?: ${key},
        /** 
         * 
         * Array of arguments to pass to the ${key} constructor
         *  
         * @type {Array<any>}
         * @memberof Tres${key}Props
         * @description This is a partial of the ${key} class, with the parentInstance property added.
         *  
         **/
        args?: Array<any>,
        /**
         *
         * Object's local position
         * 
         * @type {VectorFlexibleParams}
         * @memberof Tres${key}Props
        **/
        position?: VectorFlexibleParams
      }

      try {
        ${key}Instance = new ${key}();
        instanceProps = [...Object.keys(${key}Instance)]
      } catch (e) {
      }

      export const Tres${key} = /* #__PURE__ */ defineComponent<Tres${key}Props>({
        name: 'Tres${key}',
        props: ['parentInstance', 'args', ...instanceProps] as unknown as undefined,
        setup(props, { slots, expose, ...rest }) {
         
        /*   const cleanedProps = Object.keys(props).reduce((acc, key) => {
            if (props[key] !== undefined && key !== 'parentInstance') {
              if( ${key}Instance[key] instanceof Color) {
                acc[key] = normalizeColor(props[key])
              } else if ( ${key}Instance[key] instanceof Vector3) {
                acc[key] = normalizeVectorFlexibleParam(props[key])
              } else {
                acc[key] = props[key]
              }
            }
            return acc
          }, {}) */

          if(props.args) {
            ${key}Instance = new ${key}(...props.args);
          } else {
            ${key}Instance = new ${key}();
          }

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
