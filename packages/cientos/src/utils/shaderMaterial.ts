/*
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

import type { Color, CubeTexture, Matrix3, Matrix4, Quaternion, Texture, Vector2, Vector3, Vector4 } from 'three'
import { MathUtils, ShaderMaterial, UniformsUtils } from 'three'

export function shaderMaterial(
  uniforms: {
    [name: string]:
      | CubeTexture
      | Texture
      | Int32Array
      | Float32Array
      | Matrix4
      | Matrix3
      | Quaternion
      | Vector4
      | Vector3
      | Vector2
      | Color
      | number
      | boolean
      | Array<any>
      | null
  },
  vertexShader: string,
  fragmentShader: string,
  onInit?: (material?: ShaderMaterial) => void,
) {
  const material = class extends ShaderMaterial {
    public key: string = ''
    constructor(parameters = {}) {
      const entries = Object.entries(uniforms)
      // Create unforms and shaders
      super({
        uniforms: entries.reduce((acc, [name, value]) => {
          const uniform = UniformsUtils.clone({ [name]: { value } })
          return {
            ...acc,
            ...uniform,
          }
        }, {}),
        vertexShader,
        fragmentShader,
      })
      // Create getter/setters
      entries.forEach(([name]) =>
        Object.defineProperty(this, name, {
          get: () => this.uniforms[name].value,
          set: v => (this.uniforms[name].value = v),
        }),
      )

      // Assign parameters, this might include uniforms
      Object.assign(this, parameters)
      // Call onInit
      if (onInit) { onInit(this) }
    }
  } as unknown as typeof ShaderMaterial & { key: string }
  material.key = MathUtils.generateUUID()
  return material
}
