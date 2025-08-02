import type { Camera, Light, Material, Object3D } from 'three'
import { AmbientLight, BufferGeometry, DirectionalLight, Fog, Group, Mesh, MeshBasicMaterial, MeshNormalMaterial, OrthographicCamera, PerspectiveCamera, PointLight, Scene } from 'three'
import { isBufferGeometry, isCamera, isFog, isLight, isMaterial, isObject3D, isScene, isTresObject } from '../is/index'

// TODO move file
const NUMBERS: Record<string, number> = {
  '0': 0,
  '1': 1,
  '-1': -1,
  '42': 42,
  'Math.PI': Math.PI,
  '-inf': Number.NEGATIVE_INFINITY,
  '+inf': Number.POSITIVE_INFINITY,
  '0b1111': 0b1111,
  '0o17': 0o17,
  '0xF': 0xF,
}

const BOOLEANS: Record<string, boolean> = {
  true: true,
  false: false,
}

const STRINGS: Record<string, string> = {
  a: 'a',
  aa: 'aa',
  stringEmpty: '',
  stringNumber: '0',
}

const NULL: Record<string, null> = {
  null: null,
}

const UNDEFINED: Record<string, undefined> = {
  undefined,
}

const ARRAYS: Record<string, any[]> = {
  arrayEmpty: [],
  arrayZero: [0],
  arrayString: ['a'],
  arrayMixed: ['', 0, undefined],
}

const FUNCTIONS: Record<string, (...a: any) => any> = {
  functionVoid: () => {},
  functionUndefined: () => undefined,
  functionNull: () => null,
  functionString: () => 'a',
  functionZero: () => 0,
}

const FOGS: Record<string, Fog> = {
  fogRed: new Fog('red'),
  fogBlue: new Fog('blue'),
}

const MATERIALS: Record<string, Material> = {
  meshNormalMaterial: new MeshNormalMaterial(),
  meshBasicMaterial: new MeshBasicMaterial(),
}

const CAMERAS: Record<string, Camera> = {
  perspectiveCamera: new PerspectiveCamera(),
  orthographicCamera: new OrthographicCamera(),
}

const SCENES: Record<string, Scene> = {
  scene: new Scene(),
}

const LIGHTS: Record<string, Light> = {
  pointLight: new PointLight(),
  directionalLight: new DirectionalLight(),
  ambientLight: new AmbientLight(),
}

const OBJECT3DS: Record<string, Object3D> = {
  mesh: new Mesh(),
  group: new Group(),
  ...SCENES,
  ...LIGHTS,
  ...CAMERAS,
}

const BUFFER_GEOMETRIES: Record<string, BufferGeometry> = {
  bufferGeometry: new BufferGeometry(),
}

const OBJECTS = Object.assign({}, { '{}': {}, '{ a: "a" }': { a: 'a' } }, FOGS, MATERIALS, OBJECT3DS, BUFFER_GEOMETRIES)

const TRES_OBJECTS = Object.assign({}, MATERIALS, OBJECT3DS, BUFFER_GEOMETRIES, FOGS)

const ALL = Object.assign({}, NUMBERS, BOOLEANS, STRINGS, NULL, UNDEFINED, ARRAYS, FUNCTIONS, OBJECTS)

describe('is', () => {
  describe('isObject3D(a: any)', () => { test(isObject3D, OBJECT3DS) })
  describe('isCamera(a: any)', () => { test(isCamera, CAMERAS) })
  describe('isBufferGeometry(a: any)', () => { test(isBufferGeometry, BUFFER_GEOMETRIES) })
  describe('isMaterial(a: any)', () => { test(isMaterial, MATERIALS) })
  describe('isLight(a: any)', () => { test(isLight, LIGHTS) })
  describe('isFog(a: any)', () => { test(isFog, FOGS) })
  describe('isScene(a: any)', () => { test(isScene, SCENES) })
  describe('isTresObject(a: any)', () => { test(isTresObject, TRES_OBJECTS) })
})

/**
 * Test all values in `ALL`.
 * `fn` should return `true` for all values in `truth` else `false`.
 */
function test(fn: (a: any) => boolean, truth: Record<string, any>) {
  const trueKeys = new Set(Object.keys(truth))
  for (const [key, value] of Object.entries(ALL)) {
    it(`returns ${trueKeys.has(key)} for ${key}`, () => {
      expect(fn(value)).toBe(trueKeys.has(key))
    })
  }
}
