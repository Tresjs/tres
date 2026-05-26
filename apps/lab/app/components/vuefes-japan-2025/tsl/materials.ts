// Factory functions for the cone and sphere NodeMaterials.
// Each returns a MeshBasicNodeMaterial with colorNode wired up.
// No runtime uIsSphere branch — the two meshes have distinct materials.

import {
  Fn,
  float,
  int,
  vec2,
  vec3,
  vec4,
  uniform,
  texture,
  normalView,
  positionLocal,
  acos,
  atan,
  normalize,
  Discard,
  PI,
} from 'three/tsl'
import { MeshBasicNodeMaterial } from 'three/webgpu'
import type { Texture } from 'three'
import { blendSoftLight } from './soft-light'
import { flowField } from './noise'
import { generateSumiPattern } from './flow-field'
import { calculateColor, colorArray } from './color'

// Shared uniforms (same instances for both meshes)
export const uTime = uniform(0, 'float')
export const uActiveColorSet = uniform(0, 'int')

// Cone material: solid color1 + V-tail discard + soft-light noise
export function createConeMaterial(noiseTexture: Texture): MeshBasicNodeMaterial {
  const mat = new MeshBasicNodeMaterial({ transparent: true })

  mat.colorNode = Fn(() => {
    const pos = positionLocal

    // V-tail discard: carve bottom of cone where y < -90
    // and the cross-section x-width is inside the tapering mask.
    // t goes 0→1 as y goes -200→-90; maxX = mix(64, 0, t)
    const inTail = pos.y.lessThan(-90.0)
    const t = pos.y.add(200.0).div(110.0)
    const maxX = float(64.0).mul(float(1.0).sub(t))
    const insideMask = pos.x.abs().lessThan(maxX)

    Discard(inTail.and(insideMask))

    // Tiled noise texture in object-space XY
    const nUV = vec2(
      pos.x.mul(0.01).add(uTime.mul(0.05)),
      pos.y.mul(0.01),
    )
    const noise3 = texture(noiseTexture, nUV)

    // Cone base color: color1 of active palette (index = setIndex*3 + 0)
    const paletteOffset = uActiveColorSet.mul(int(3))
    const baseColor = vec3(colorArray.element(paletteOffset))

    // Soft-light noise blend at opacity 0.7.
    // Note: original GLSL applied a manual linearToGamma(c, 2.2) here because
    // its WebGL pipeline wrote raw values to the canvas. Under WebGPU/TSL the
    // renderer applies sRGB output encoding automatically, so we drop it.
    const noise3rgb = vec3(noise3.r, noise3.g, noise3.b)
    const blended = blendSoftLight(baseColor, noise3rgb, float(0.7))

    return vec4(blended, 1.0)
  })()

  return mat
}

// Sphere material: spherical UV + flow-field sumi + soft-light noise
export function createSphereMaterial(noiseTexture: Texture): MeshBasicNodeMaterial {
  const mat = new MeshBasicNodeMaterial({ transparent: true })

  mat.colorNode = Fn(() => {
    const pos = positionLocal

    // Object-space noise UVs (same nUV scroll as cone)
    const nUV = vec2(
      pos.x.mul(0.01).add(uTime.mul(0.05)),
      pos.y.mul(0.01),
    )
    const noise3 = texture(noiseTexture, nUV)

    // Spherical UVs from view-space normal (= GLSL vNormal)
    const n = normalize(normalView)
    const phi = acos(n.y)
    const theta = atan(n.z, n.x).add(uTime.mul(0.1))

    const sphereUV = vec2(
      theta.div(PI.mul(2.0)),
      phi.div(PI),
    ).mul(0.5)

    // Flow-field warp
    const timeScale = uTime.mul(0.7)
    const baseFlow = flowField(sphereUV.mul(1.5), timeScale)
    const detailFlow = flowField(sphereUV.mul(3.0).add(baseFlow.mul(0.4)), timeScale.mul(1.2))

    const flowStrength = float(0.1).add(noise3.r.mul(0.01)).toVar()

    const warpedUV = baseFlow.mul(0.7).add(detailFlow.mul(0.3)).mul(flowStrength).toVar()

    // Edge effect
    const edgeIntensity = n.dot(vec3(0.0, 0.0, 1.0)).mul(0.5).add(0.5)
    warpedUV.addAssign(edgeIntensity.mul(baseFlow).mul(flowStrength).mul(1.5))

    // Sumi ink marble pattern
    const allscale = float(0.3)
    const allspeed = float(0.25)
    const noiseValue = generateSumiPattern(
      sphereUV.add(warpedUV),
      uTime.mul(allspeed),
      allscale,
    )

    // Map noise value to color gradient
    const baseColor = calculateColor(
      noiseValue,
      uActiveColorSet,
      sphereUV,
      warpedUV,
      uTime,
    )

    // Soft-light noise blend at opacity 0.7.
    // sRGB output encoding handled by the WebGPU renderer.
    const noise3rgb = vec3(noise3.r, noise3.g, noise3.b)
    const blended = blendSoftLight(vec3(baseColor), noise3rgb, float(0.7))

    return vec4(blended, 1.0)
  })()

  return mat
}
