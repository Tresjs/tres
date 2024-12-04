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

import * as THREE from 'three'

export function shaderMaterial(
  uniforms: {
    [name: string]:
      | THREE.CubeTexture
      | THREE.Texture
      | Int32Array
      | Float32Array
      | THREE.Matrix4
      | THREE.Matrix3
      | THREE.Quaternion
      | THREE.Vector4
      | THREE.Vector3
      | THREE.Vector2
      | THREE.Color
      | number
      | boolean
      | Array<any>
      | null
  },
  vertexShader: string,
  fragmentShader: string,
  onInit?: (material?: THREE.ShaderMaterial) => void,
) {
  const material = class extends THREE.ShaderMaterial {
    public key: string = ''
    constructor(parameters = {}) {
      const entries = Object.entries(uniforms)
      // Create unforms and shaders
      super({
        uniforms: entries.reduce((acc, [name, value]) => {
          const uniform = THREE.UniformsUtils.clone({ [name]: { value } })
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
  } as unknown as typeof THREE.ShaderMaterial & { key: string }
  material.key = THREE.MathUtils.generateUUID()
  return material
}
