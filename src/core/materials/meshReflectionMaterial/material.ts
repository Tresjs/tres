/*
Inspired by and adapted from MeshReflectorMaterial
https://github.com/pmndrs/drei/blob/master/src/materials/MeshReflectorMaterial.tsx

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

import type { Matrix4, Texture } from 'three'
import { MeshStandardMaterial } from 'three'

interface UninitializedUniform<Value> { value: Value | null }

export class MeshReflectionMaterial extends MeshStandardMaterial {
  private _tDepth: UninitializedUniform<Texture> = { value: null }
  private _distortionMap: UninitializedUniform<Texture> = { value: null }
  private _tSharp: UninitializedUniform<Texture> = { value: null }
  private _tBlur: UninitializedUniform<Texture> = { value: null }
  private _textureMatrix: UninitializedUniform<Matrix4> = { value: null }
  private _mix: { value: number } = { value: 0.5 }
  private _sharpMix: { value: number } = { value: 0.0 }
  private _blurMixSmooth: { value: number } = { value: 0.0 }
  private _blurMixRough: { value: number } = { value: 0.0 }
  private _sharpDepthEdgeMin: { value: number } = { value: 0.9 }
  private _sharpDepthEdgeMax: { value: number } = { value: 1 }
  private _sharpDepthScale: { value: number } = { value: 0 }
  private _sharpDepthBias: { value: number } = { value: 0 }
  private _distortion: { value: number } = { value: 1 }

  constructor(parameters = {}) {
    super(parameters)
    this.setValues(parameters)
  }

  onBeforeCompile(shader: any) {
    if (!shader.defines?.USE_UV) {
      shader.defines.USE_UV = ''
    }
    // NOTE: Start #605 fix
    // Tres lowercases pierced props. As a result, a component
    // can't set "defines", which are written in ALL_CAPS by
    // convention in the Three.js codebase.
    //
    // Issue: https://github.com/Tresjs/tres/issues/605
    //
    // A fix has been merged into TresJS v4:
    // https://github.com/Tresjs/tres/pull/608
    //
    // TODO: This code can be removed for TresJS v4.
    //
    // Workaround: UPPER_CASE all defines
    for (const key of Object.keys(shader.defines)) {
      shader.defines[key.toUpperCase()] = shader.defines[key]
    }
    // NOTE: End #605 fix

    shader.uniforms.tSharp = this._tSharp
    shader.uniforms.tDepth = this._tDepth
    shader.uniforms.tBlur = this._tBlur
    shader.uniforms.distortionMap = this._distortionMap
    shader.uniforms.textureMatrix = this._textureMatrix
    shader.uniforms.mixMain = this._mix

    shader.uniforms.sharpMix = this._sharpMix
    shader.uniforms.sharpDepthScale = this._sharpDepthScale
    shader.uniforms.sharpDepthEdgeMin = this._sharpDepthEdgeMin
    shader.uniforms.sharpDepthEdgeMax = this._sharpDepthEdgeMax
    shader.uniforms.sharpDepthBias = this._sharpDepthBias

    shader.uniforms.blurMixSmooth = this._blurMixSmooth
    shader.uniforms.blurMixRough = this._blurMixRough

    shader.uniforms.distortion = this._distortion

    shader.vertexShader = `
        uniform mat4 textureMatrix;
        varying vec4 my_vUv;
      ${shader.vertexShader}`
    shader.vertexShader = shader.vertexShader.replace(
      '#include <project_vertex>',
      `#include <project_vertex>
        my_vUv = textureMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );`,
    )
    shader.fragmentShader = `
        uniform sampler2D tSharp;
        uniform sampler2D tBlur;
        uniform sampler2D tDepth;
        uniform sampler2D distortionMap;
        uniform float distortion;
        uniform float cameraNear;
        uniform float cameraFar;
        uniform float mixMain;
        uniform float sharpMix;
        uniform float blurMixSmooth;
        uniform float blurMixRough;
        uniform float sharpDepthScale;
        uniform float sharpDepthBias;
        uniform float sharpDepthEdgeMin;
        uniform float sharpDepthEdgeMax;
        varying vec4 my_vUv;
        ${shader.fragmentShader}`
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <emissivemap_fragment>',
      `#include <emissivemap_fragment>

      vec4 new_vUv = my_vUv;

      #ifdef USE_DISTORTION
        float distortionFactor = (texture(distortionMap, vUv).r - 0.5) * distortion;
        new_vUv.x += distortionFactor;
        new_vUv.y += distortionFactor;
      #endif

      #ifdef USE_NORMALMAP

        vec4 normalColor = texture(normalMap, vUv * normalScale);
        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
        vec3 coord = new_vUv.xyz / new_vUv.w;
        vec2 normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;

        vec4 sharp = texture(tSharp, normal_uv);

        #ifdef USE_BLUR
          vec4 blur = texture(tBlur, normal_uv);
        #endif

        #ifdef USE_DEPTH
          vec4 depth = texture(tDepth, normal_uv);
        #endif

      #else

        vec4 sharp = textureProj(tSharp, new_vUv);

        #ifdef USE_BLUR
          vec4 blur = textureProj(tBlur, new_vUv);
        #endif

        #ifdef USE_DEPTH
          vec4 depth = textureProj(tDepth, new_vUv);
        #endif

      #endif

      #ifdef USE_DEPTH
        float depthFactor = smoothstep(
          1.0 - sharpDepthEdgeMax, 1.0 - sharpDepthEdgeMin,
          1.0 - (depth.r * depth.a) + sharpDepthBias
        );
        depthFactor = clamp(sharpDepthScale * depthFactor, 0.0, 1.0);

        sharp *= depthFactor;
      #endif

      sharp *= (1.0 - roughnessFactor);
      `,
    )
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <opaque_fragment>',
      `

      #ifdef USE_BLUR
        outgoingLight += mixMain * (
          vec3(sharp) * sharpMix
          + vec3(blur) * (blurMixSmooth * (1.0 - roughnessFactor) + blurMixRough * roughnessFactor)
        );
      #else
        outgoingLight += mixMain * vec3(sharp) * sharpMix;
      #endif

      #include <opaque_fragment>
      `,
    )
  }

  get tSharp(): Texture | null {
    return this._tSharp.value
  }

  set tSharp(v: Texture | null) {
    this._tSharp.value = v
  }

  get tDepth(): Texture | null {
    return this._tDepth.value
  }

  set tDepth(v: Texture | null) {
    this._tDepth.value = v
  }

  get distortionMap(): Texture | null {
    return this._distortionMap.value
  }

  set distortionMap(v: Texture | null) {
    this._distortionMap.value = v
  }

  get tBlur(): Texture | null {
    return this._tBlur.value
  }

  set tBlur(v: Texture | null) {
    this._tBlur.value = v
  }

  get textureMatrix(): Matrix4 | null {
    return this._textureMatrix.value
  }

  set textureMatrix(v: Matrix4 | null) {
    this._textureMatrix.value = v
  }

  get sharpMix(): number {
    return this._sharpMix.value
  }

  set sharpMix(v: number) {
    this._sharpMix.value = v
  }

  get blurMixSmooth(): number {
    return this._blurMixSmooth.value
  }

  set blurMixSmooth(v: number) {
    this._blurMixSmooth.value = v
  }

  get blurMixRough(): number {
    return this._blurMixRough.value
  }

  set blurMixRough(v: number) {
    this._blurMixRough.value = v
  }

  get mix(): number {
    return this._mix.value
  }

  set mix(v: number) {
    this._mix.value = v
  }

  get sharpDepthScale(): number {
    return this._sharpDepthScale.value
  }

  set sharpDepthScale(v: number) {
    this._sharpDepthScale.value = v
  }

  get sharpDepthBias(): number {
    return this._sharpDepthBias.value
  }

  set sharpDepthBias(v: number) {
    this._sharpDepthBias.value = v
  }

  get sharpDepthEdgeMin(): number {
    return this._sharpDepthEdgeMin.value
  }

  set sharpDepthEdgeMin(v: number) {
    this._sharpDepthEdgeMin.value = v
  }

  get sharpDepthEdgeMax(): number {
    return this._sharpDepthEdgeMax.value
  }

  set sharpDepthEdgeMax(v: number) {
    this._sharpDepthEdgeMax.value = v
  }

  get distortion(): number {
    return this._distortion.value
  }

  set distortion(v: number) {
    this._distortion.value = v
  }
}
