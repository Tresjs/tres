// Imports nothing from `three/webgpu`: the root entry reaches this file.
import { useLoop, useTresContext } from '@tresjs/core'
import type { TresRenderer } from '@tresjs/core'
import { Color, Group, Mesh, MeshBasicMaterial, OrthographicCamera, PlaneGeometry, Scene } from 'three'
// `RenderTarget` must stay a type-only import: three exports the class only from r155, and the root entry supports r133.
import type { ColorRepresentation, RenderTarget, WebGLRenderTarget } from 'three'
import { onUnmounted, toValue, watch } from 'vue'
import type { ContactShadowsMaterialFactory, ContactShadowsProps } from './props'

interface UseContactShadowsOptions extends ContactShadowsMaterialFactory {
  createTarget: (size: number) => RenderTarget
  /** Whether the materials run on `WebGPURenderer` (node materials) or on `WebGLRenderer` (GLSL). */
  forWebGPURenderer: boolean
}

export function useContactShadows(
  props: Required<Omit<ContactShadowsProps, 'tint'>> & Pick<ContactShadowsProps, 'tint'>,
  { createTarget, createDepthMaterial, createBlurMaterial, forWebGPURenderer }: UseContactShadowsOptions,
) {
  const shadowGroup = new Group()

  const renderTarget = createTarget(props.resolution)
  const renderTargetBlur = createTarget(props.resolution)
  renderTarget.texture.generateMipmaps = false
  renderTargetBlur.texture.generateMipmaps = false

  const planeGeometry = new PlaneGeometry(props.width, props.height).rotateX(Math.PI / 2)
  const planeMaterial = new MeshBasicMaterial({
    map: renderTarget.texture,
    transparent: true,
  })
  const plane = new Mesh(planeGeometry, planeMaterial)
  // The y from the texture is flipped.
  plane.scale.y = -1
  shadowGroup.add(plane)

  // A scene of its own: WebGPURenderer clips a plane at the shadow camera's near plane and draws a mesh render root once only.
  const blurGeometry = new PlaneGeometry(2, 2)
  const blurQuad = new Mesh(blurGeometry)
  blurQuad.position.z = -0.5
  const blurScene = new Scene()
  blurScene.add(blurQuad)
  const blurCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)

  const shadowCamera = new OrthographicCamera(-props.width / 2, props.width / 2, props.height / 2, -props.height / 2, 0, 0.3)
  shadowCamera.rotation.x = Math.PI / 2
  shadowGroup.add(shadowCamera)

  const depthMaterial = createDepthMaterial()
  const horizontalBlurMaterial = createBlurMaterial('horizontal', renderTarget.texture)
  const verticalBlurMaterial = createBlurMaterial('vertical', renderTargetBlur.texture)

  // The renderer type is a union, so its parameter types intersect. Both renderers accept either target class.
  const setTarget = (renderer: TresRenderer, target: RenderTarget | null) =>
    renderer.setRenderTarget(target as WebGLRenderTarget | null)

  function blurShadow(blur: number, renderer: TresRenderer) {
    blurQuad.material = horizontalBlurMaterial
    horizontalBlurMaterial.offset = blur / 256
    setTarget(renderer, renderTargetBlur)
    renderer.render(blurScene, blurCamera)

    blurQuad.material = verticalBlurMaterial
    verticalBlurMaterial.offset = blur / 256
    setTarget(renderer, renderTarget)
    renderer.render(blurScene, blurCamera)
  }

  function update(scene: Scene, renderer: TresRenderer) {
    const initialBackground = scene.background
    const initialClearAlpha = renderer.getClearAlpha()
    const initialTarget = renderer.getRenderTarget()

    try {
      scene.background = null
      scene.overrideMaterial = depthMaterial
      renderer.setClearAlpha(0)

      setTarget(renderer, renderTarget)
      renderer.render(scene, shadowCamera)

      blurShadow(props.blur, renderer)
      // A second pass removes the artifacts. 0.4 is the smallest blur that does it.
      if (props.smooth) {
        blurShadow(props.blur * 0.4, renderer)
      }
    }
    finally {
      scene.overrideMaterial = null
      setTarget(renderer, initialTarget)
      renderer.setClearAlpha(initialClearAlpha)
      scene.background = initialBackground
    }
  }

  function fitShadowCamera() {
    const [scaleX, scaleY] = Array.isArray(props.scale) ? props.scale : [props.scale || 1, props.scale || 1]
    const w = props.width * scaleX
    const h = props.height * scaleY

    // three r183+ strips the parent scale from the camera view matrix, so the frustum takes world-space sizes.
    shadowCamera.left = -w / 2
    shadowCamera.right = w / 2
    shadowCamera.top = h / 2
    shadowCamera.bottom = -h / 2
    shadowCamera.far = props.far
    shadowCamera.updateProjectionMatrix()

    shadowGroup.scale.set(w, props.far, h)
  }

  const { isWebGPU } = useTresContext()
  const { onBeforeRender } = useLoop()

  let count = 0
  const updateOnNextRender = () => { count = count >= props.frames ? props.frames - 1 : count }

  onBeforeRender(({ renderer, scene }) => {
    // Each material compiles only on its own renderer. Only the GLSL entry warns, through useWebGPUSupportWarning.
    if (isWebGPU.value !== forWebGPURenderer) { return }
    if (count < props.frames) {
      count++
      update(toValue(scene), renderer)
    }
  })

  watch(() => [props.opacity, props.depthWrite, props.blur, props.smooth], () => {
    planeMaterial.opacity = props.opacity
    planeMaterial.depthWrite = props.depthWrite
    updateOnNextRender()
  }, { immediate: true })

  watch(() => [props.color, props.tint], () => {
    planeMaterial.color = new Color((props.color as ColorRepresentation) ?? 'black')
    depthMaterial.tint.set((props.tint as ColorRepresentation) ?? 'white')
    updateOnNextRender()
  }, { immediate: true })

  // `RenderTarget.setSize` keeps the texture objects, so the plane and the blur materials still read them.
  watch(() => props.resolution, (resolution) => {
    renderTarget.setSize(resolution, resolution)
    renderTargetBlur.setSize(resolution, resolution)
    updateOnNextRender()
  })

  watch(() => [props.width, props.height, props.scale, props.far], () => {
    fitShadowCamera()
    updateOnNextRender()
  }, { immediate: true })

  onUnmounted(() => {
    renderTarget.dispose()
    renderTargetBlur.dispose()
    planeGeometry.dispose()
    blurGeometry.dispose()
    planeMaterial.dispose()
    depthMaterial.dispose()
    horizontalBlurMaterial.dispose()
    verticalBlurMaterial.dispose()
  })

  return { shadowGroup }
}
