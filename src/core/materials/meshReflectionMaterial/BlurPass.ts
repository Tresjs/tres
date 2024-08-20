/*
Adapted from Drei BlurPass
https://github.com/pmndrs/drei/blob/master/

MIT License

Copyright (c) 2020 react-spring

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import type { Material, WebGLRenderer } from 'three'
import {
  BufferAttribute,
  BufferGeometry,
  Camera,
  HalfFloatType,
  LinearFilter,
  Mesh,
  Scene,
  Vector2,
  WebGLRenderTarget,
} from 'three'

import { ConvolutionMaterial } from './ConvolutionMaterial'

export interface BlurPassProps {
  resolution: number
  width?: number
  height?: number
  depthEdge0?: number
  depthEdge1?: number
  depthScale?: number
  depthBias?: number
}

export class BlurPass {
  readonly renderTargetA: WebGLRenderTarget
  readonly renderTargetB: WebGLRenderTarget
  readonly convolutionMaterial: ConvolutionMaterial
  readonly scene: Scene
  readonly camera: Camera
  readonly screen: Mesh
  renderToScreen: boolean = false

  constructor({
    resolution,
    width = 500,
    height = 500,
    depthEdge0 = 0,
    depthEdge1 = 1,
    depthScale = 0,
    depthBias = 0.25,
  }: BlurPassProps) {
    this.renderTargetA = new WebGLRenderTarget(resolution, resolution, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
      type: HalfFloatType,
    })
    this.renderTargetB = this.renderTargetA.clone()
    this.convolutionMaterial = new ConvolutionMaterial()
    this.convolutionMaterial.setTexelSize(1.0 / width, 1.0 / height)
    this.convolutionMaterial.setResolution(new Vector2(width, height))
    this.scene = new Scene()
    this.camera = new Camera()
    this.convolutionMaterial.uniforms.depthEdge0.value = depthEdge0
    this.convolutionMaterial.uniforms.depthEdge1.value = depthEdge1
    this.convolutionMaterial.uniforms.depthScale.value = depthScale
    this.convolutionMaterial.uniforms.depthBias.value = depthBias
    this.convolutionMaterial.defines.USE_DEPTH = depthScale > 0
    const vertices = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0])
    const uvs = new Float32Array([0, 0, 2, 0, 0, 2])
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(vertices, 3))
    geometry.setAttribute('uv', new BufferAttribute(uvs, 2))
    this.screen = new Mesh(geometry, this.convolutionMaterial)
    this.screen.frustumCulled = false
    this.scene.add(this.screen)
  }

  render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, outputBuffer: WebGLRenderTarget) {
    const scene = this.scene
    const camera = this.camera
    const renderTargetA = this.renderTargetA
    const renderTargetB = this.renderTargetB
    const material = this.convolutionMaterial
    const uniforms = material.uniforms
    uniforms.depthBuffer.value = inputBuffer.depthTexture
    const kernel = material.kernel
    let lastRT = inputBuffer
    let destRT
    let i, l
    // Apply the multi-pass blur.
    for (i = 0, l = kernel.length - 1; i < l; ++i) {
      // Alternate between targets.
      destRT = (i & 1) === 0 ? renderTargetA : renderTargetB
      uniforms.kernel.value = kernel[i]
      uniforms.inputBuffer.value = lastRT.texture
      renderer.setRenderTarget(destRT)
      renderer.render(scene, camera)
      lastRT = destRT
    }
    uniforms.kernel.value = kernel[i]
    uniforms.inputBuffer.value = lastRT.texture
    renderer.setRenderTarget(this.renderToScreen ? null : outputBuffer)
    renderer.render(scene, camera)
  }

  dispose() {
    (this.screen.material as Material).dispose()
    this.screen.geometry.dispose()
    this.renderTargetA.dispose()
    this.renderTargetB.dispose()
    this.convolutionMaterial.dispose()
  }
}
