import type { Ref } from 'vue'
import { useLoop, useTres } from '@tresjs/core'
import { useMediaQuery } from '@vueuse/core'
import { cos, exp, float, hash, mix, normalize, pass, screenSize, sin, time, uniform, uv, vec2 } from 'three/tsl'
import { RenderPipeline } from 'three/webgpu'
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
  watchEffect(() => {
    scatter.value = params.scatter.value
    halo.value = params.halo.value
    cone.value = params.cone.value
    lift.value = params.lift.value
    glow.value = params.glow.value
  })

  let pipeline: RenderPipeline | undefined
  let passCamera: Camera | undefined

  const build = (cam: Camera) => {
    const scenePass = pass(scene.value as Scene, cam)
    const sceneColor = scenePass.getTextureNode()

    const aspect = screenSize.x.div(screenSize.y)
    const toPixels = vec2(aspect, 1)
    const d = uv().sub(field.screenCenter).mul(toPixels)
    const dist = d.length()
    const falloff = exp(dist.div(field.screenRadius).pow(2).negate()).mul(field.fade)

    // Two white-noise values per pixel, reseeded every frame so the grain crawls like film instead of freezing.
    const seed = uv().mul(screenSize).add(time.mul(60).floor())
    const n1 = hash(seed.x.mul(12.9898).add(seed.y.mul(78.233)))
    const n2 = hash(seed.x.mul(39.3468).add(seed.y.mul(11.135)).add(7.31))

    // Squaring the length noise piles most samples close to home: dense at the edge, sparse dust further out.
    const reach = falloff.mul(halo.add(field.amplitude.abs().mul(scatter.div(MAX_PUSH))))
    const length = reach.mul(n1.mul(n1))
    // `uv()` v grows downward here, so "up" on screen is negative v.
    const away = normalize(mix(d.div(dist.max(0.0001)), vec2(0, -1), lift))
    const angle = n2.sub(0.5).mul(cone.mul(2))
    const c = cos(angle)
    const s = sin(angle)
    const dir = vec2(away.x.mul(c).sub(away.y.mul(s)), away.x.mul(s).add(away.y.mul(c)))
    // Pull from the cursor side: pixels beyond the edge borrow the letter's color and the edge appears to fly out.
    const sampleUv = uv().sub(dir.mul(length).div(toPixels))

    // Only pixels that borrowed a letter color have anything to brighten: black stays black.
    const flight = length.div(reach.max(0.0001))
    const scattered = sceneColor.sample(sampleUv)
    pipeline = new RenderPipeline(renderer as Renderer)
    pipeline.outputNode = scattered.mul(float(1).add(flight.mul(glow)))
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
    pipeline!.render()
    notifySuccess()
  })

  onScopeDispose(() => pipeline?.dispose())
}
