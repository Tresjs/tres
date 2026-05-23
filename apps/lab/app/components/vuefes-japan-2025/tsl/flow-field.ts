// TSL port of generateSumiPattern and generateSumiDetail.

import { float, Fn, add, mul } from 'three/tsl'
import { flowField, fbm } from './noise'

/**
 * Three-layer flow-field warp → sumi ink marble pattern.
 * Returns a float noise value in [0, 1] range.
 */
export const generateSumiPattern = Fn(([uvNode, timeNode, scale]: [any, any, any]) => {
  const timeScale = timeNode.mul(0.15)
  const st = uvNode.mul(scale)

  const flow = flowField(st.mul(2.0), timeScale)
  const flow2 = flowField(add(st.mul(4.0), flow.mul(0.2)), timeScale.mul(1.2))
  const flow3 = flowField(add(st.mul(8.0), flow2.mul(0.15)), timeScale.mul(0.9))

  const finalFlow = flow.mul(0.5).add(flow2.mul(0.3)).add(flow3.mul(0.2))

  const marbleNoise = fbm(
    add(st, finalFlow.mul(0.8)),
    float(0.6), float(2.0), float(1.8), float(0.5), 6,
  )
  const sumiPattern = fbm(
    add(add(st, finalFlow).mul(3.0), timeNode.mul(0.05)),
    float(0.6), float(2.0), float(1.8), float(0.5), 6,
  )

  return marbleNoise.mul(0.5).add(sumiPattern.mul(0.5))
})

/**
 * Fine-detail sumi layer for the narrow transition band.
 */
export const generateSumiDetail = Fn(([uvNode, timeNode]: [any, any]) => {
  const st = uvNode
  const timeScale = timeNode.mul(0.15)

  const flow = flowField(mul(st, 2.0), timeScale)
  const flow2 = flowField(add(mul(st, 4.0), flow.mul(0.2)), timeScale.mul(1.2))
  const flow3 = flowField(add(mul(st, 8.0), flow2.mul(0.15)), timeScale.mul(0.9))

  const finalFlow = flow.mul(0.5).add(flow2.mul(0.3)).add(flow3.mul(0.2))

  return fbm(
    add(add(st, finalFlow).mul(6.0), timeNode.mul(0.02)),
    float(0.8), float(4.0), float(2.2), float(0.7), 4,
  )
})
