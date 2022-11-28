import * as THREE from 'three'

let catalogue: {
  [key: string]: any
} = { ...THREE }

delete catalogue.Scene

export function useCatalogue() {
  const extend = (objects: any) => {
    catalogue = Object.assign(catalogue, objects)
  }

  return {
    extend,
    catalogue,
  }
}
