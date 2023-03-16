import { createUnplugin } from 'unplugin'
import * as THREE from 'three'

import fs from 'fs'
import { join } from 'pathe'

export const unplugin = createUnplugin(() => {
  return {
    name: 'unplugin-tres',
    apply: 'build',
    configResolved(config) {
      // Check if the output directory exists, if not create it
      const outputDir = join(config.root, 'src/types')
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir)
      }

      const typeDefs = `
      import type { DefineComponent } from 'vue'
      import type { Vector2, Vector3, Color } from 'three'
      export type TresVectorProp = Vector2 | Vector3 | number[] | number
      export type TresColor = string | number | Color | number[]
      import type {
        Mesh,
        ${Object.keys(THREE)
          .filter(
            key =>
              key.endsWith('Geometry') ||
              key.endsWith('Material') ||
              key.endsWith('Helper') ||
              key.endsWith('Light') ||
              key.endsWith('Camera'),
          )
          .join(',\n')}
      } from 'three';

      type OverwrittenProps = 'position' | 'rotation' | 'scale' | 'color'

      type TresModifiedObject = {
        /**
         * A Vector3 | Array | scalar representing the object's local position. Default is (0, 0, 0).
         *
         * @type {TresVectorProp}
         */
        position: TresVectorProp
        /**
         * A Vector3 | Array | scalar representing the object's local rotation. Default is (0, 0, 0).
         *
         * @type {TresVectorProp}
         */
        rotation: TresVectorProp
        /**
         * A Vector3 | Array | scalar representing the object's local scale. Default is (0, 0, 0).
         *
         * @type {TresVectorProp}
         */
        scale: TresVectorProp
        /**
         * Color of the material, by default set to white (0xffffff).
         *
         * @type {TresColor}
         */
        color: TresColor,
        /**
         * Arguments of the THREE instance, by default set to empty array.
         *
         * @type {any[]}
         * 
         * @example
         * 
         * \`\`\`html
         * <TresBoxGeometry args="[1, 3, 4]" /> // BoxGeometry(1, 3, 4)
         * \`\`\`
         */
        args?: any[],
      }
      
      declare module 'vue' {
        export interface GlobalComponents {
          TresMesh: DefineComponent<Partial<Omit<Mesh, OverwrittenProps> & TresModifiedObject>>
      ${Object.keys(THREE)
        .filter(key => key.endsWith('Geometry'))
        .map(
          key =>
            `Tres${key}: DefineComponent<Partial<Omit<${key}['parameters'], OverwrittenProps> & TresModifiedObject>>`,
        )
        .join('\n')}
        ${Object.keys(THREE)
          .filter(
            key =>
              key.endsWith('Geometry') ||
              key.endsWith('Material') ||
              key.endsWith('Helper') ||
              key.endsWith('Light') ||
              key.endsWith('Camera'),
          )
          .map(key => `Tres${key}: DefineComponent<Partial<Omit<${key}, OverwrittenProps > & TresModifiedObject>>`)
          .join('\n')}
        }
      }
      `

      fs.writeFileSync(join(outputDir, 'tres-components.d.ts'), typeDefs)
    },
  }
})

export const ViteTresPlugin = unplugin.vite
