import * as THREE from 'three'
import { catalogue, extend } from './catalogue'

describe('catalog', () => {
  it('should return a catalog of objects when extended', () => {
    extend(THREE)

    expect(catalogue.value).toHaveProperty('Mesh')
    expect(catalogue.value).toHaveProperty('MeshBasicMaterial')
  })
})
