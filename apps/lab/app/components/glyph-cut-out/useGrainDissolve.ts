import type { Ref } from 'vue'
import { useLoop, useTres } from '@tresjs/core'
import { useMediaQuery } from '@vueuse/core'
import { cos, exp, float, hash, log, max, mix, normalize, pass, screenSize, sin, time, uniform, uv, vec2, vec4 } from 'three/tsl'
import { Color, RenderPipeline } from 'three/webgpu'
import type { Camera, Renderer, Scene } from 'three/webgpu'
import { MAX_PUSH } from './useForceField'
import type { useForceField } from './useForceField'

export interface GrainParams {
  /** Scatter distance at the ring when the spring sits at MAX_PUSH, as a fraction of the viewport height. */
  scatter: Ref<number>
  /** Scatter distance inside the field while the pointer rests, so the letters keep a faint dust halo. */
  halo: Ref<number>
  /** Half-angle of the cone the dust drifts in, around the direction away from the cursor. PI is isotropic. */
  cone: Ref<number>
  /** How much the dust rises instead of leaving the cursor radially. 0 is radial, 1 is straight up. */
  lift: Ref<number>
  /** Brightness gain for the dust at the far end of its flight, so it sparkles against dark footage. */
  glow: Ref<number>
  /** How fast the dust thins out with distance. Density falls as exp(-falloff * d / reach); higher hugs the edge. */
  falloff: Ref<number>
  /** Chromatic split of the dust along its flight direction, in CSS px, for grain right at the edge. */
  aberration: Ref<number>
  /** Extra split for grain at the far end of its flight, as a multiple of the base value. */
  flightAberration: Ref<number>
}

/**
 * Replaces the Tres render function with a scene pass plus one stochastic sample per pixel. Each pixel pulls its
 * color from a random point between itself and the cursor, so glyph edges inside the field crumble into dithered
 * dust that drifts away from the pointer. One sample, no averaging: the grain is the look.
 * Skipped on coarse pointers, there is no hover on a phone.
 */
export function useGrainDissolve(field: ReturnType<typeof useForceField>, params: GrainParams) {
  const { renderer, scene, camera } = useTres()
  const { render } = useLoop()
  const coarse = useMediaQuery('(pointer: coarse)')

  const scatter = uniform(params.scatter.value)
  const halo = uniform(params.halo.value)
  const cone = uniform(params.cone.value)
  const lift = uniform(params.lift.value)
  const glow = uniform(params.glow.value)
  const falloff = uniform(params.falloff.value)
  const aberration = uniform(params.aberration.value)
  const flightAberration = uniform(params.flightAberration.value)
  watchEffect(() => {
    falloff.value = params.falloff.value
    aberration.value = params.aberration.value
    flightAberration.value = params.flightAberration.value
    scatter.value = params.scatter.value
    halo.value = params.halo.value
    cone.value = params.cone.value
    lift.value = params.lift.value
    glow.value = params.glow.value
  })

  let pipeline: RenderPipeline | undefined
  let passCamera: Camera | undefined

  // The canvas clear color becomes the composite background; the pass itself renders on transparent black.
  const clearColor = new Color()
  const background = uniform(new Color())
  const TRANSPARENT = new Color(0, 0, 0)

  const build = (cam: Camera) => {
    const scenePass = pass(scene.value as Scene, cam)
    const sceneColor = scenePass.getTextureNode()

    const aspect = screenSize.x.div(screenSize.y)
    const toPixels = vec2(aspect, 1)
    const d = uv().sub(field.screenCenter).mul(toPixels)
    const dist = d.length()
    const fieldFalloff = exp(dist.div(field.screenRadius).pow(2).negate()).mul(field.fade)

    // Two white-noise values per pixel, reseeded every frame so the grain crawls like film instead of freezing.
    const seed = uv().mul(screenSize).add(time.mul(60).floor())
    const n1 = hash(seed.x.mul(12.9898).add(seed.y.mul(78.233)))
    const n2 = hash(seed.x.mul(39.3468).add(seed.y.mul(11.135)).add(7.31))

    // Exponentially distributed flight length: dust density decays as exp(-falloff * d / reach), so it is packed
    // against the edge and thins out geometrically. Clamped so no sample flies past the reach.
    const reach = fieldFalloff.mul(halo.add(field.amplitude.abs().mul(scatter.div(MAX_PUSH))))
    const length = reach.mul(log(n1.max(0.0001)).negate().div(falloff)).min(reach)
    // `uv()` v grows downward here, so "up" on screen is negative v.
    const away = normalize(mix(d.div(dist.max(0.0001)), vec2(0, -1), lift))
    const angle = n2.sub(0.5).mul(cone.mul(2))
    const c = cos(angle)
    const s = sin(angle)
    const dir = vec2(away.x.mul(c).sub(away.y.mul(s)), away.x.mul(s).add(away.y.mul(c)))
    // Pull from the cursor side: pixels beyond the edge borrow the letter's color and the edge appears to fly out.
    const sampleUv = uv().sub(dir.mul(length).div(toPixels))

    // The pass clears to transparent, so alpha is glyph coverage and RGB is premultiplied. Letter pixels win over the
    // dust they would otherwise scatter into, so interiors stay solid and grain only lands where no letter is.
    const flight = length.div(reach.max(0.0001))

    // The letter itself stays a single clean sample. Only the dust splits: red and blue read from either side of the
    // grain's own flight path, and the split grows with distance so stray specks fringe more than the dense edge.
    const original = sceneColor
    const pxToUv = vec2(1).div(screenSize)
    const shift = dir.mul(aberration.mul(float(1).add(flight.mul(flightAberration)))).mul(pxToUv)
    const red = sceneColor.sample(sampleUv.add(shift))
    const green = sceneColor.sample(sampleUv)
    const blue = sceneColor.sample(sampleUv.sub(shift))
    const scattered = vec4(red.r, green.g, blue.b, max(max(red.a, green.a), blue.a))

    const dust = scattered.rgb.mul(float(1).add(flight.mul(glow))).mul(float(1).sub(original.a))
    const alpha = original.a.add(scattered.a.mul(float(1).sub(original.a)))
    pipeline = new RenderPipeline(renderer as Renderer)
    pipeline.outputNode = vec4(background.mul(float(1).sub(alpha)).add(original.rgb).add(dust), 1)
  }

  render((notifySuccess) => {
    const cam = camera.value
    if (!cam) { return }
    if (coarse.value) {
      renderer.render(scene.value, cam)
      notifySuccess()
      return
    }
    if (!pipeline || passCamera !== cam) {
      pipeline?.dispose()
      build(cam)
      passCamera = cam
    }
    const r = renderer as Renderer
    r.getClearColor(clearColor)
    background.value.copy(clearColor)
    r.setClearColor(TRANSPARENT, 0)
    pipeline!.render()
    // Restore for anything that renders directly, such as the screenshot shortcut.
    r.setClearColor(clearColor, 1)
    notifySuccess()
  })

  onScopeDispose(() => pipeline?.dispose())
}
