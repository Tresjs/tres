import { INJECTION_KEY, useLoop, useTres, useTresContext } from '@tresjs/core'
import { HalfFloatType, LinearFilter, Scene, Vector2 } from 'three'
// `RenderTarget` must stay a type-only import: three exports the class only from r155, and the root entry supports r133.
import type { RenderTarget, RenderTargetOptions, Texture, WebGLRenderTarget } from 'three'
import type { ShallowRef } from 'vue'
import { onBeforeUnmount, provide, shallowRef, watch } from 'vue'
import type { MeshPortalMaterialProps, PortalBlendPass, PortalWindowMaterial } from './props'

interface UseMeshPortalMaterialOptions<T extends RenderTarget> {
  createTarget: (width: number, height: number, options: RenderTargetOptions) => T
  createBlendPass: (portal: Texture, root: Texture) => PortalBlendPass
  forWebGPURenderer: boolean
}

export function useMeshPortalMaterial<T extends RenderTarget>(
  props: Required<MeshPortalMaterialProps>,
  materialRef: ShallowRef<PortalWindowMaterial | undefined>,
  { createTarget, createBlendPass, forWebGPURenderer }: UseMeshPortalMaterialOptions<T>,
) {
  const portalScene = new Scene()
  portalScene.matrixAutoUpdate = false

  // Children that read `useTres().scene`, such as <Environment>, must configure the portal scene, not the main scene.
  const ctx = useTresContext()
  provide(INJECTION_KEY, { ...ctx, scene: shallowRef(portalScene) })

  const targetOptions: RenderTargetOptions = { minFilter: LinearFilter, magFilter: LinearFilter, type: HalfFloatType }
  const fboMap = createTarget(props.resolution, props.resolution, targetOptions)
  const portalBuffer = createTarget(1, 1, targetOptions)
  const rootBuffer = createTarget(1, 1, targetOptions)

  watch(() => props.resolution, res => fboMap.setSize(res, res))

  const blendPass = createBlendPass(portalBuffer.texture, rootBuffer.texture)

  const { invalidate } = useTres()
  const { isWebGPU } = ctx
  const { onBeforeRender, onRender } = useLoop()
  const drawSize = new Vector2()

  // Each material compiles only on its own renderer.
  const runsOnThisRenderer = () => isWebGPU.value === forWebGPURenderer

  onBeforeRender(({ renderer, camera }) => {
    const mat = materialRef.value
    if (!mat || !runsOnThisRenderer()) { return }
    const host = mat.__tres?.parent
    const cam = camera.value
    if (!host || !cam) { return }

    if (props.worldUnits) {
      portalScene.matrixWorld.identity()
    }
    else {
      if (props.blend === 1) { host.updateWorldMatrix(true, false) }
      portalScene.matrixWorld.copy(host.matrixWorld)
    }

    // The window FBO tracks animated portal contents, and the blend takeover needs the main pass every frame.
    invalidate()

    renderer.getDrawingBufferSize(drawSize)
    mat.resolution?.copy(drawSize)

    const prevAlpha = renderer.getClearAlpha()
    renderer.setClearAlpha(0)
    setTarget(renderer, fboMap)
    renderer.clear()
    renderer.render(portalScene, cam)
    setTarget(renderer, null)
    renderer.setClearAlpha(prevAlpha)

    mat.map = fboMap.texture
  }, Number.POSITIVE_INFINITY)

  onRender(({ renderer, scene, camera }) => {
    const mat = materialRef.value
    if (!mat || !runsOnThisRenderer()) { return }
    const cam = camera.value
    if (!cam) { return }
    const blend = props.blend
    if (blend <= 0) { return }

    if (blend >= 1) {
      renderer.render(portalScene, cam)
      return
    }

    renderer.getDrawingBufferSize(drawSize)
    if (portalBuffer.width !== drawSize.x || portalBuffer.height !== drawSize.y) {
      portalBuffer.setSize(drawSize.x, drawSize.y)
      rootBuffer.setSize(drawSize.x, drawSize.y)
    }
    blendPass.blend.value = blend

    const prevAlpha = renderer.getClearAlpha()
    renderer.setClearAlpha(1)

    setTarget(renderer, portalBuffer)
    renderer.clear()
    renderer.render(portalScene, cam)

    setTarget(renderer, rootBuffer)
    renderer.clear()
    renderer.render(scene.value, cam)

    setTarget(renderer, null)
    blendPass.render(renderer)

    renderer.setClearAlpha(prevAlpha)
  }, props.renderPriority)

  onBeforeUnmount(() => {
    fboMap.dispose()
    portalBuffer.dispose()
    rootBuffer.dispose()
    blendPass.dispose()
  })

  return { portalScene }
}

// The renderer type is a union, so its parameter types intersect. Both renderers accept either target class.
function setTarget(renderer: { setRenderTarget: (target: WebGLRenderTarget | null) => void }, target: RenderTarget | null) {
  renderer.setRenderTarget(target as WebGLRenderTarget | null)
}
