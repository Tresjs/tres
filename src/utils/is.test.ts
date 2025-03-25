import type { Camera, Light, Material, Object3D } from 'three'
import { AmbientLight, BufferGeometry, DirectionalLight, Fog, Group, Mesh, MeshBasicMaterial, MeshNormalMaterial, OrthographicCamera, PerspectiveCamera, PointLight, Scene } from 'three'
import * as is from './is'

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

// NOTE: See definition in is.ts
const TRES_OBJECTS = Object.assign({}, MATERIALS, OBJECT3DS, BUFFER_GEOMETRIES, FOGS)

const ALL = Object.assign({}, NUMBERS, BOOLEANS, STRINGS, NULL, UNDEFINED, ARRAYS, FUNCTIONS, OBJECTS)

describe('is', () => {
  describe('is.und(a: any)', () => { test(is.und, UNDEFINED) })
  describe('is.arr(a: any)', () => { test(is.arr, ARRAYS) })
  describe('is.num(a: any)', () => { test(is.num, NUMBERS) })
  describe('is.str(a: any)', () => { test(is.str, STRINGS) })
  describe('is.bool(a: any)', () => { test(is.bool, BOOLEANS) })
  describe('is.fun(a: any)', () => { test(is.fun, FUNCTIONS) })
  describe('is.obj(a: any)', () => { test(is.obj, OBJECTS) })
  describe('is.object3D(a: any)', () => { test(is.object3D, OBJECT3DS) })
  describe('is.camera(a: any)', () => { test(is.camera, CAMERAS) })
  describe('is.bufferGeometry(a: any)', () => { test(is.bufferGeometry, BUFFER_GEOMETRIES) })
  describe('is.material(a: any)', () => { test(is.material, MATERIALS) })
  describe('is.light(a: any)', () => { test(is.light, LIGHTS) })
  describe('is.fog(a: any)', () => { test(is.fog, FOGS) })
  describe('is.scene(a: any)', () => { test(is.scene, SCENES) })
  describe('is.tresObject(a: any)', () => { test(is.tresObject, TRES_OBJECTS) })
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
