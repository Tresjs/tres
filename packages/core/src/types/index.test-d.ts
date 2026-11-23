/* eslint-disable ts/method-signature-style -- method style copies @types/three, property style would change the variance under test */
import type * as THREE from 'three'
import { describe, expectTypeOf, it } from 'vitest'
import type { ThreeInstances, WithMathProps } from './index'

// @types/three 0.186 made the third parameter of `Vector3.set` optional.
// A structural check that compares the whole rest tuple stops matching it and
// every `position` / `scale` / `up` prop falls back to the bare `Vector3` (#696).
interface Vector3WithOptionalZ {
  set(x: number, y: number, z?: number): this
  setScalar(s: number): this
}

describe('WithMathProps', () => {
  it('maps a Vector3 prop to the math union', () => {
    type Position = WithMathProps<{ position: THREE.Vector3 }>['position']
    expectTypeOf<THREE.Vector3>().toExtend<Position>()
    expectTypeOf<[number, number, number]>().toExtend<Position>()
    expectTypeOf<number>().toExtend<Position>()
    expectTypeOf<{ x: number, y: number, z: number }>().toExtend<Position>()
  })

  it('still maps a Vector3 prop when set() has optional parameters', () => {
    type Position = WithMathProps<{ position: Vector3WithOptionalZ }>['position']
    expectTypeOf<[number, number, number]>().toExtend<Position>()
    expectTypeOf<number>().toExtend<Position>()
  })

  it('maps Color, Euler, Quaternion and Layers props', () => {
    expectTypeOf<'red'>().toExtend<WithMathProps<{ color: THREE.Color }>['color']>()
    expectTypeOf<0xFF0000>().toExtend<WithMathProps<{ color: THREE.Color }>['color']>()
    expectTypeOf<[number, number, number, 'YXZ']>().toExtend<WithMathProps<{ rotation: THREE.Euler }>['rotation']>()
    expectTypeOf<[number, number, number, number]>().toExtend<WithMathProps<{ quaternion: THREE.Quaternion }>['quaternion']>()
    expectTypeOf<number>().toExtend<WithMathProps<{ layers: THREE.Layers }>['layers']>()
  })

  it('leaves non-math props untouched', () => {
    expectTypeOf<WithMathProps<{ name: string }>['name']>().toEqualTypeOf<string>()
    expectTypeOf<WithMathProps<{ visible: boolean }>['visible']>().toEqualTypeOf<boolean>()
  })
})

describe('ThreeInstances', () => {
  it('accepts a tuple for position on Tres components', () => {
    type Position = ThreeInstances['perspectiveCamera']['position']
    expectTypeOf<[number, number, number]>().toExtend<Position>()
    expectTypeOf<readonly [number, number, number]>().toExtend<Position>()
    expectTypeOf<THREE.Vector3>().toExtend<Position>()
  })

  it('rejects a widened number[] for position', () => {
    // Deliberate: `[1, 2]` would compile and render NaN at runtime (see #1491).
    type Position = ThreeInstances['mesh']['position']
    expectTypeOf<number[]>().not.toExtend<Position>()
  })
})
