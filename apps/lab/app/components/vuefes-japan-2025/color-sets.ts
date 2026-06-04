import { Color } from 'three'
import { shallowRef } from 'vue'

export interface ColorSet {
  color1: Color
  color2: Color
  color3: Color
  // Page background tint (original site's --color-*-sub variable).
  bg: string
}

export const COLOR_CYCLE_SECONDS = 15

// Note: original source constructs set2.color1 as #4A056D then immediately
// overwrites it to #8314D3 after material creation. Hard-coding the final value.
export const colorSets: ColorSet[] = [
  { color1: new Color('#007F62'), color2: new Color('#16C787'), color3: new Color('#C6A167'), bg: '#fae8e4' },
  { color1: new Color('#8314D3'), color2: new Color('#B9B8E7'), color3: new Color('#EE7F88'), bg: '#d0edf2' },
  { color1: new Color('#F66C21'), color2: new Color('#FA8663'), color3: new Color('#004E4B'), bg: '#def7d1' },
  { color1: new Color('#385FCC'), color2: new Color('#FF9301'), color3: new Color('#FFB2DC'), bg: '#ffdaff' },
]

// Shared JS-side mirror of the active palette index, kept in sync with
// the uActiveColorSet TSL uniform inside TheMainVisual's render loop.
// Used by the page wrapper to drive the background CSS variable.
export const activeColorSetIndex = shallowRef(0)
