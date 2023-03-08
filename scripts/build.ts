import { writeFileSync } from 'fs-extra'
import path from 'node:path'

const rootDir = path.resolve(__dirname, '..')

export type FunctionListingsType = (string | [string, string])[]

export interface FunctionList {
  cameras: FunctionListingsType
  lights: FunctionListingsType
  materials: FunctionListingsType
  geometries: FunctionListingsType
  textures: FunctionListingsType
  renderers: FunctionListingsType
  scenes: FunctionListingsType
  objects: FunctionListingsType
  helpers: FunctionListingsType
  effects: FunctionListingsType
  postprocessing: FunctionListingsType
  controls: FunctionListingsType
  animations: FunctionListingsType
  physics: FunctionListingsType
  audio: FunctionListingsType
  xr: FunctionListingsType
  ui: FunctionListingsType
  misc: FunctionListingsType
}

async function buildComponentDefinitions(functions: FunctionList) {
  
  const buildMaterialDefinition = (name: string | [string, string]) => {
    const [importName, componentName] = Array.isArray(name) ? [`${name[0]}Parameters`, name[1]] : [`${name}Parameters`, `Tres${name}`]

    return {
      componentName,
      importName,
      definition: `${componentName}: DefineComponent<Partial<${importName}>>`
    }
  }

  const buildGeometryDefinition = (name: string | [string, string]) => {
    const [importName, componentName] = Array.isArray(name) ? name : [name, `Tres${name}`]
    
    return {
      componentName,
      importName,
      definition: `${componentName}: DefineComponent<Partial<${importName}['parameters']>>`
    }
  }

  const materialDefinitions = functions.materials.map(buildMaterialDefinition)
  const geometryDefinitions = functions.geometries.map(buildGeometryDefinition)

  const _imports = [... new Set([...materialDefinitions, ...geometryDefinitions].map(({ importName }) => importName))].join(',\n')
  const _definitions = [...materialDefinitions, ...geometryDefinitions].map(({ definition }) => definition).join('\n    ')

  const componentDefinitions = `
import type { DefineComponent } from 'vue'
import type { 
${_imports} } from 'three'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ${_definitions}
  }
}
  `.trim()

  writeFileSync(path.resolve(rootDir, 'components.d.ts'), componentDefinitions)
}

buildComponentDefinitions({
  cameras: [],
  lights: [],
  materials: [
    'LineBasicMaterial',
    'LineDashedMaterial',
    'MeshBasicMaterial',
    'MeshDepthMaterial',
    'MeshDistanceMaterial',
    'MeshLambertMaterial',
    'MeshMatcapMaterial',
    'MeshNormalMaterial',
    'MeshPhongMaterial',
    'MeshPhysicalMaterial',
    'MeshStandardMaterial',
    'MeshToonMaterial',
    'PointsMaterial',
    ['ShaderMaterial', 'TresRawShaderMaterial'], // RawShaderMaterial uses ShaderMaterial's parameters
    'ShaderMaterial',
    'ShadowMaterial',
    'SpriteMaterial',
    'Material',
  ],
  geometries: [
    'BoxGeometry',
    'CapsuleGeometry',
    'CircleGeometry',
    'ConeGeometry',
    'CylinderGeometry',
    'DodecahedronGeometry',
    'EdgesGeometry',
    // 'ExtrudeGeometry', - Not yet supported via this method
    'IcosahedronGeometry',
    'LatheGeometry',
    'OctahedronGeometry',
    'PlaneGeometry',
    'PolyhedronGeometry',
    'RingGeometry',
    // 'ShapeGeometry', - Not yet supported via this method
    'SphereGeometry',
    'TetrahedronGeometry',
    'TorusGeometry',
    'TorusKnotGeometry',
    'TubeGeometry',
    'WireframeGeometry',
  ],
  textures: [],
  renderers: [],
  scenes: [],
  objects: [],
  helpers: [],
  effects: [],
  postprocessing: [],
  controls: [],
  animations: [],
  physics: [],
  audio: [],
  xr: [],
  ui: [],
  misc: [],
})
