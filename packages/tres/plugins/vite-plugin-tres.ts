import { createUnplugin } from 'unplugin'
import * as THREE from 'three'

import fs from 'fs'
import { join } from 'pathe'

const blacklist = ['Scene', 'Color', 'Object3D']

export const unplugin = createUnplugin(() => {
  let modules = []
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
        if (
          blacklist.includes(key) ||
          key.includes('Vector') || // Vector2, Vector3, Vector4
          key.includes('BufferGeometry') || // Deprecated geometries
          key.includes('Utils') || // Utils
          key.includes('Curve') || // Curves
          key.includes('Audio') // Curves
        )
          continue
        if (typeof value === 'function' && /^\s*class\s+/.test(value.toString())) {
          const outputFilePath = join(outputDir, `${key}.ts`)

          const template = `
      import { defineComponent, inject, ShallowRef } from 'vue';
      import { ${key}, Scene, Color, Vector3, Object3D } from 'three';
      import { useCamera } from '/@/composables/'
      import { VectorFlexibleParams, normalizeVectorFlexibleParam, normalizeColor } from '/@/utils/normalize';

      let ${key}Instance: ${key};
      let instanceProps: string[] = [];
  

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
         * @see https://threejs.org/docs/?q=${key}
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
        // @ts-ignore
        ${key}Instance = new ${key}();
        instanceProps = [...Object.keys(${key}Instance)]
      } catch (e) {
      }

      export const Tres${key} = /* #__PURE__ */ defineComponent<Tres${key}Props>({
        name: 'Tres${key}',
        props: ['parentInstance', 'args', ...instanceProps] as unknown as undefined,
        setup(props, { slots, expose }) {
          if(props.args) {
            // @ts-ignore
            ${key}Instance = new ${key}(...props.args);
          } else {
            // @ts-ignore
            ${key}Instance = new ${key}();
          }
          const scene = inject<ShallowRef<Scene>>('scene')
         
          expose({${key}Instance})

          function append(parent, child) {
            const regex = /[A-Z][a-z]+/g
            const propName = child.type.match(regex).pop().toLowerCase()
            if (parent[propName]) {
              parent[propName] = child
            }
          }

          function processProps() {
            Object.keys(props).forEach((key) => {
              if (props[key] !== undefined && key !== 'parentInstance' && key !== 'args') {
                if( ${key}Instance[key] instanceof Color) {
                  ${key}Instance[key] = normalizeColor(props[key])
                } else if ( ${key}Instance[key] instanceof Vector3) {
                  ${key}Instance[key].set(normalizeVectorFlexibleParam(props[key]))
                } else {
                  ${key}Instance[key] = props[key]
                }
              }
            })
          }

          processProps()

          if (${key}Instance.hasOwnProperty('isCamera')) {
            ${key}Instance.position.set(0, 0, 5)
            ${key}Instance.lookAt(0, 0, 0)
            const { pushCamera } = useCamera()
            pushCamera(${key}Instance)
          }
      
         
          if(props.parentInstance) {
            append(props.parentInstance, ${key}Instance)
          }

          if(scene && !props.parentInstance && ${key}Instance instanceof Object3D) {
            scene.value.add(${key}Instance)
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
          indexTemplate += `export * from './${key}'\n`
          fs.writeFileSync(outputFilePath, template)
          modules.push(key)
        }

        fs.writeFileSync(join(outputDir, `index.ts`), indexTemplate)
      }
      console.log(`✨ Generated ${modules.length} components!`)
    },
  }
})

export const ViteTresPlugin = unplugin.vite
