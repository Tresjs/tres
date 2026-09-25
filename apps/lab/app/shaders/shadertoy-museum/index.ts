import { gamesOfSinus } from './gamesOfSinus'
import { unyo } from './unyo'
import { prettyHip } from './prettyHip'
import { mainImageDrawCircle } from './mainImageDrawCircle'
import { cellular } from './cellular'
import { tiles } from './tiles'
import { rainbow } from './rainbow'
import { star } from './star'
import { fractalPyramid } from './fractalPyramid'
import { mandelbulb } from './mandelbulb'
import { shader02 } from './shader02'
import { raymarchingBasic } from './raymarchingBasic'
import { seventiesMelt } from './seventiesMelt'
import { sinusoidalTresJS } from './sinusoidalTresJS'
import { sinusoidalTresJS2 } from './sinusoidalTresJS2'
import { truchet } from './truchet'
import { octgrams } from './octgrams'

export {
  cellular,
  fractalPyramid,
  gamesOfSinus,
  mainImageDrawCircle,
  mandelbulb,
  octgrams,
  prettyHip,
  rainbow,
  raymarchingBasic,
  seventiesMelt,
  shader02,
  sinusoidalTresJS,
  sinusoidalTresJS2,
  star,
  tiles,
  truchet,
  unyo,
}

export const mainImage = gamesOfSinus

export const shaderToySrc = {
  gamesOfSinus,
  tiles,
  star,
  fractalPyramid,
  mandelbulb,
  shader02,
  rainbow,
  prettyHip,
  raymarchingBasic,
  unyo,
  seventiesMelt,
  sinusoidalTresJS,
  sinusoidalTresJS2,
  truchet,
  octgrams,
} as const
