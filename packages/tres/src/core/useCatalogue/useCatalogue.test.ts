import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { describe, test, expect } from 'vitest'
import { useCatalogue } from './'

describe('useCatalogue()', () => {
  test('should init catalog', () => {
    const { catalogue } = useCatalogue()
    expect(catalogue).toHaveProperty('Mesh')
  })
  test('should be able to extend catalogue', () => {
    const { catalogue, extend } = useCatalogue()
    extend({ OrbitControls })
    expect(catalogue).toHaveProperty('OrbitControls')
  })
  test('catalog objects should be instanciable', () => {
    const { catalogue } = useCatalogue()
    expect(new catalogue.PerspectiveCamera()).toHaveProperty('type', 'PerspectiveCamera')
  })
})
