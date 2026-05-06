import { Color } from 'three'

export interface ColorSet {
  color1: Color
  color2: Color
  color3: Color
}

export const COLOR_CYCLE_SECONDS = 15

// Note: original source constructs set2.color1 as #4A056D then immediately
// overwrites it to #8314D3 after material creation. Hard-coding the final value.
export const colorSets: ColorSet[] = [
  { color1: new Color('#007F62'), color2: new Color('#16C787'), color3: new Color('#C6A167') },
  { color1: new Color('#8314D3'), color2: new Color('#B9B8E7'), color3: new Color('#EE7F88') },
  { color1: new Color('#F66C21'), color2: new Color('#FA8663'), color3: new Color('#004E4B') },
  { color1: new Color('#385FCC'), color2: new Color('#FF9301'), color3: new Color('#FFB2DC') },
]
