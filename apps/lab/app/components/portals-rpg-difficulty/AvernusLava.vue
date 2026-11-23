<script setup lang="ts">
import type { Mesh } from 'three/webgpu'
import { MeshPhysicalNodeMaterial, Vector3, Vector4 } from 'three/webgpu'
import { abs, cross, dFdx, dFdy, dot, float, Fn, frontFacing, If, max, mix, normalize, normalView, output, positionGeometry, positionView, screenUV, select, sign, time, uniform, varying, vec2, vec3, vec4 } from 'three/tsl'
import { blenderNoise3Fac } from './tsl/blenderNoise'
import { evaluateLavaNoise, lavaSurface } from './tsl/avernusFields'
import { useMaterialSwap } from './useMaterialSwap'

const props = defineProps<{
  nodes: Record<string, any>
  // Without the card plane the noise runs on the whole target.
  frame?: Mesh
}>()

const UUID = 'portals-rpg-difficulty'

// Blender's Bump node filter width; smaller means a stronger bump.
const BUMP_FILTER_WIDTH = 0.1

// Screen UV, so the bump derivatives at the rect edge stay off the visible card.
const RECT_MARGIN = 0.01

// specularIntensity 0.6 is Blender's Specular IOR Level 0.3 over its 0.5 default. Emission
// 0.6 (captured 1) compensates for the bloom pass pushing the fissures to yellow-white.
const uniforms = {
  warpAmount: uniform(1.25),
  plateScale: uniform(1.05),
  emissionGain: uniform(0.6),
  bumpStrength: uniform(0.5),
  bumpDistance: uniform(0.055),
  fineDetail: uniform(1),
  debugView: uniform(0),
  flowSpeed: uniform(0.04),
  churnSpeed: uniform(0.08),
  // Top-left (xy) and bottom-right (zw) corners of the card, in screen UV.
  visibleRect: uniform(new Vector4(0, 0, 1, 1)),
}

// The GLB node is identity with Y-up vertices, so the Blender object coordinate is one basis swap away.
const blenderPosition = varying(vec3(positionGeometry.x, positionGeometry.z.negate(), positionGeometry.y))

// The If keeps the most expensive octaves off the GPU when fine detail is off; a select would still run them.
const microDetail = (q: any) => Fn(() => {
  const value = float(0.5).toVar()
  If(uniforms.fineDetail.greaterThan(0.5), () => {
    value.assign(blenderNoise3Fac(q.mul(22), 2, 0.5, 0))
  })
  return value
})()

// Sampling upstream along Blender -Y makes the pattern travel downstream.
const noise = evaluateLavaNoise(
  blenderPosition,
  uniforms.warpAmount,
  uniforms.plateScale,
  microDetail,
  vec3(0, time.mul(uniforms.flowSpeed), 0),
  time.mul(uniforms.churnSpeed),
)

const rect = uniforms.visibleRect
const onCard = screenUV.x.greaterThanEqual(rect.x).and(screenUV.y.greaterThanEqual(rect.y)).and(screenUV.x.lessThanEqual(rect.z)).and(screenUV.y.lessThanEqual(rect.w))

// The portal renders the whole screen, but only the card shows it. Outside the card the lake
// keeps its cheap lighting and skips every noise call.
const fields = Fn(() => {
  const value = vec2(0, 1).toVar()
  If(onCard, () => {
    value.assign(vec2(noise.moltenMask, noise.height))
  })
  return value
})().toVar()

const moltenMask = fields.x
const height = fields.y
const surface = lavaSurface(moltenMask)

// Blender node_bump with the height offsets replaced by derivatives of one height sample.
function bumpNormal(N: any, h: any, P: any) {
  const dPdx = dFdx(P)
  const dPdy = dFdy(P)
  const Rx = cross(dPdy, N)
  const Ry = cross(N, dPdx)
  const det = dot(dPdx, Rx)
  const surfgrad = dFdx(h).mul(Rx).add(dFdy(h).mul(Ry))
  const dist = select(frontFacing, uniforms.bumpDistance, uniforms.bumpDistance.negate())
  const bumped = normalize(N.mul(abs(det).mul(BUMP_FILTER_WIDTH)).sub(surfgrad.mul(dist).mul(sign(det))))
  return normalize(mix(N, bumped, max(uniforms.bumpStrength, 0)))
}

const material = new MeshPhysicalNodeMaterial({
  metalness: 0,
  roughness: 1,
  ior: 1.5,
  specularIntensity: 0.6,
})
material.name = 'AvernusLava'
material.colorNode = vec4(surface.baseColor, 1)
material.emissiveNode = surface.emission.mul(uniforms.emissionGain)
material.roughnessNode = surface.roughness
material.normalNode = bumpNormal(normalView, height, positionView)
// Debug views bypass lighting and emission so bloom cannot blur the mask.
material.outputNode = select(
  uniforms.debugView.greaterThan(0.5),
  vec4(vec3(select(uniforms.debugView.lessThan(1.5), moltenMask, height)), 1),
  output,
)

const { camera } = useTresContext()
const corner = new Vector3()

function updateVisibleRect() {
  const frame = props.frame
  const cam = camera.activeCamera.value
  if (!frame?.geometry || !cam) {
    uniforms.visibleRect.value.set(0, 0, 1, 1)
    return
  }
  if (!frame.geometry.boundingBox) { frame.geometry.computeBoundingBox() }
  const box = frame.geometry.boundingBox!
  // The pop animation and OrbitControls move these this frame, before the scene graph updates them.
  frame.updateWorldMatrix(true, false)
  cam.updateMatrixWorld()

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const x of [box.min.x, box.max.x]) {
    for (const y of [box.min.y, box.max.y]) {
      for (const z of [box.min.z, box.max.z]) {
        corner.set(x, y, z).applyMatrix4(frame.matrixWorld).project(cam)
        minX = Math.min(minX, corner.x)
        maxX = Math.max(maxX, corner.x)
        minY = Math.min(minY, corner.y)
        maxY = Math.max(maxY, corner.y)
      }
    }
  }
  // NDC is y-up, screen UV is y-down.
  uniforms.visibleRect.value.set(
    (minX + 1) / 2 - RECT_MARGIN,
    (1 - maxY) / 2 - RECT_MARGIN,
    (maxX + 1) / 2 + RECT_MARGIN,
    (1 - minY) / 2 + RECT_MARGIN,
  )
}

const { onBeforeRender } = useLoop()
onBeforeRender(updateVisibleRect)

useMaterialSwap(() => props.nodes.GEO_Lava_Lake as Mesh | undefined, material)

const {
  lavaWarp,
  lavaPlateScale,
  lavaEmission,
  lavaBump,
  lavaSpecular,
  lavaFineDetail,
  lavaDebugView,
  lavaFlowSpeed,
  lavaChurnSpeed,
} = useControls('lava', {
  warp: { value: uniforms.warpAmount.value, min: 0, max: 3, step: 0.01 },
  flowSpeed: { value: uniforms.flowSpeed.value, min: 0, max: 0.5, step: 0.005, label: 'flow speed' },
  churnSpeed: { value: uniforms.churnSpeed.value, min: 0, max: 0.5, step: 0.005, label: 'churn speed' },
  plateScale: { value: uniforms.plateScale.value, min: 0.2, max: 4, step: 0.01, label: 'plate scale' },
  emission: { value: uniforms.emissionGain.value, min: 0, max: 6, step: 0.05 },
  bump: { value: uniforms.bumpStrength.value, min: 0, max: 3, step: 0.05 },
  specular: { value: 0.6, min: 0, max: 1, step: 0.05 },
  // Drops the most expensive noise octaves; they only feed the bump height.
  fineDetail: { value: true, type: 'boolean', label: 'fine detail' },
  debugView: {
    value: 0,
    options: [
      { text: 'final', value: 0 },
      { text: 'molten mask', value: 1 },
      { text: 'height', value: 2 },
    ],
    label: 'debug view',
  },
}, { uuid: UUID })

watch(lavaWarp, v => uniforms.warpAmount.value = v)
watch(lavaPlateScale, v => uniforms.plateScale.value = v)
watch(lavaEmission, v => uniforms.emissionGain.value = v)
watch(lavaBump, v => uniforms.bumpStrength.value = v)
watch(lavaSpecular, v => material.specularIntensity = v)
watch(lavaFineDetail, v => uniforms.fineDetail.value = v ? 1 : 0)
watch(lavaDebugView, v => uniforms.debugView.value = Number(v))
watch(lavaFlowSpeed, v => uniforms.flowSpeed.value = v)
watch(lavaChurnSpeed, v => uniforms.churnSpeed.value = v)
</script>

<template>
  <TresGroup name="AvernusLava" />
</template>
