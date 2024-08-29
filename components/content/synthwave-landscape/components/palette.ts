import { Color } from 'three'

export const PALETTE = [
  '#0D0221',
  '#241734',
  '#2E2157',
  '#FD3777',
  '#F706CF',
  '#2DE2E6',
  '#FD1D53',
  '#F9C80E',
  '#FFFFFF',
]

export const PALETTE_VEC4 = PALETTE.map(hexToRgbaString)

export function hexToRgbaString(hex: string) {
  const c = new Color(hex)
  return `vec4(${c.r}, ${c.g}, ${c.b}, 1.0)`
}
