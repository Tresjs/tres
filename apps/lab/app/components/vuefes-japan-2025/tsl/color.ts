// TSL port of getActiveColorSet + calculateColor.
//
// Struct uniforms replaced with a flat uniformArray of 12 colors:
//   index = setIndex * 3 + colorSlot  (slot 0=color1, 1=color2, 2=color3)

import {
  Fn,
  float,
  int,
  vec3,
  select,
  fract,
  floor,
  mix,
  mod,
  uniformArray,
  If,
} from 'three/tsl'
import { Color } from 'three'
import type { ColorSet } from '../color-sets'
import { colorSets } from '../color-sets'
import { generateSumiDetail } from './flow-field'

// Flat color array: 4 sets × 3 colors = 12 Color entries
export const colorArray = uniformArray(
  colorSets.flatMap(s => [s.color1.clone(), s.color2.clone(), s.color3.clone()]),
  'color',
)

/**
 * JS helper — picks color1/2/3 of the active palette via a select() chain.
 */
function getColors(setIndexNode: any) {
  const pick = (slot: number) =>
    vec3(select(
      setIndexNode.equal(int(0)), colorArray.element(int(0 * 3 + slot)),
      select(
        setIndexNode.equal(int(1)), colorArray.element(int(1 * 3 + slot)),
        select(
          setIndexNode.equal(int(2)), colorArray.element(int(2 * 3 + slot)),
          colorArray.element(int(3 * 3 + slot)),
        ),
      ),
    ))

  return { color1: pick(0), color2: pick(1), color3: pick(2) }
}

/**
 * TSL port of calculateColor().
 * Returns vec3.
 */
export const calculateColor = Fn(([noiseValueNode, setIndexNode, noiseUVNode, warpedUVNode, timeNode]: [any, any, any, any, any]) => {
  const colors = getColors(setIndexNode)

  const nv = fract(noiseValueNode.mul(5.0)).toVar()
  const result = vec3(0.0).toVar()

  // Narrow sumi-detail band: 0.30 < nv < 0.33
  If(nv.greaterThan(float(0.3)).and(nv.lessThan(float(0.33))), () => {
    const sumiDetail = generateSumiDetail(
      noiseUVNode.add(warpedUVNode).mul(0.1),
      timeNode.mul(0.1),
    )
    nv.assign(nv.mul(0.95).add(sumiDetail.mul(0.05)))

    // GLSL: segment = floor(nv * DIVISIONS*8) → DIVISIONS=3 → *24
    const segment24 = floor(nv.mul(24.0))
    const idx = int(mod(segment24, 3.0))

    // GLSL: localPos = fract(nv * DIVISIONS*3) → *9
    const localPos9 = fract(nv.mul(9.0)).toVar()

    const currentColor9 = vec3(select(
      idx.equal(int(0)), colors.color1,
      select(idx.equal(int(1)), colors.color2, colors.color3),
    ))
    const nextColor9 = vec3(select(
      idx.equal(int(0)), colors.color2,
      select(idx.equal(int(1)), colors.color3, colors.color1),
    ))

    If(localPos9.greaterThan(float(0.8)), () => {
      const t = localPos9.sub(0.8).div(0.2)
      result.assign(mix(currentColor9, nextColor9, t))
    }).Else(() => {
      result.assign(currentColor9)
    })
  }).Else(() => {
    // Main 3-segment gradient
    const segment3 = floor(nv.mul(3.0))
    const localPos3 = fract(nv.mul(3.0)).toVar()

    const currentColor3 = vec3(0.0).toVar()
    const nextColor3 = vec3(0.0).toVar()

    If(segment3.equal(float(0.0)), () => {
      currentColor3.assign(colors.color1)
      nextColor3.assign(colors.color2)
    }).ElseIf(segment3.equal(float(1.0)), () => {
      currentColor3.assign(colors.color2)
      nextColor3.assign(colors.color3)
    }).Else(() => {
      currentColor3.assign(colors.color3)
      nextColor3.assign(colors.color1)
    })

    If(localPos3.greaterThan(float(0.8)), () => {
      const t = localPos3.sub(0.8).div(0.2)
      result.assign(mix(currentColor3, nextColor3, t))
    }).Else(() => {
      result.assign(currentColor3)
    })
  })

  return result
})

/**
 * Sync the flat colorArray values when the active palette data changes.
 */
export function syncColorArray(sets: ColorSet[]) {
  const flat = sets.flatMap(s => [s.color1, s.color2, s.color3])
  const value = colorArray.value as Color[] | undefined
  if (!value) return
  flat.forEach((c, i) => {
    value[i]?.copy(c)
  })
}
