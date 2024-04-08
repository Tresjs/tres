/**
 * Holographic material by Anderson Mancini - Dec 2023.
 */

/**
MIT License

Copyright (c) 2023 Anderson Mancini

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

import { 
  ShaderMaterial,
  Clock,
  Uniform,
  Color,
  NormalBlending,
  AdditiveBlending,
  FrontSide,
  BackSide,
  DoubleSide,
} from 'three'
import type { Side, Blending } from 'three'

interface HolographicMaterialParameters {
  time?: number
  fresnelOpacity?: number
  fresnelAmount?: number
  scanlineSize?: number
  hologramBrightness?: number
  signalSpeed?: number
  hologramColor?: Color
  enableBlinking?: boolean
  blinkFresnelOnly?: boolean
  hologramOpacity?: number
  blendMode?: Blending
  side?: Side
  depthTest?: boolean
}

class HolographicMaterial extends ShaderMaterial {

  /**
   * Create a HolographicMaterial.
   *
   * @param {Object} parameters - The parameters to configure the material.
   * @param {number} [parameters.time=0.0] - The time uniform representing animation time.
   * @param {number} [parameters.fresnelOpacity=1.0] - The opacity for the fresnel effect.
   * @param {number} [parameters.fresnelAmount=1.0] - The strength of the fresnel effect.
   * @param {number} [parameters.scanlineSize=15.0] - The size of the scanline effect.
   * @param {number} [parameters.hologramBrightness=1.0] - The brightness of the hologram.
   * @param {number} [parameters.signalSpeed=1.0] - The speed of the signal effect.
   * @param {Color} [parameters.hologramColor=new Color('#00d5ff')] - The color of the hologram.
   * @param {boolean} [parameters.enableBlinking=true] - Enable/disable blinking effect.
   * @param {boolean} [parameters.blinkFresnelOnly=false] - Enable blinking only on the fresnel effect.
   * @param {number} [parameters.hologramOpacity=1.0] - The opacity of the hologram.
   * @param {number} [parameters.blendMode=NormalBlending] - The blending mode. Use `THREE.NormalBlending` or `THREE.AdditiveBlending`.
   * @param {number} [parameters.side=FrontSide] - The rendering side. Use `THREE.FrontSide`,
   *  `THREE.BackSide`, or `THREE.DoubleSide`.
   * @param {Boolean} [parameters.depthTest=true] - Enable or disable depthTest.
   */

  constructor(parameters: HolographicMaterialParameters = {}) {
    super()

    this.vertexShader /*GLSL */
    = `
      #define STANDARD
      varying vec3 vViewPosition;
      #ifdef USE_TRANSMISSION
      varying vec3 vWorldPosition;
      #endif
    
      varying vec2 vUv;
      varying vec4 vPos;
      varying vec3 vNormalW;
      varying vec3 vPositionW;

      #include <common>
      #include <uv_pars_vertex>
      #include <envmap_pars_vertex>
      #include <color_pars_vertex>
      #include <fog_pars_vertex>
      #include <morphtarget_pars_vertex>
      #include <skinning_pars_vertex>
      #include <logdepthbuf_pars_vertex>
      #include <clipping_planes_pars_vertex>

      void main() {
        
        #include <uv_vertex>
        #include <color_vertex>
        #include <morphcolor_vertex>
      
        #if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
      
          #include <beginnormal_vertex>
          #include <morphnormal_vertex>
          #include <skinbase_vertex>
          #include <skinnormal_vertex>
          #include <defaultnormal_vertex>
      
        #endif
      
        #include <begin_vertex>
        #include <morphtarget_vertex>
        #include <skinning_vertex>
        #include <project_vertex>
        #include <logdepthbuf_vertex>
        #include <clipping_planes_vertex>
      
        #include <worldpos_vertex>
        #include <envmap_vertex>
        #include <fog_vertex>

        mat4 modelViewProjectionMatrix = projectionMatrix * modelViewMatrix;

        vUv = uv;
        vPos = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );
        vPositionW = vec3( vec4( transformed, 1.0 ) * modelMatrix);
        vNormalW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ) );
        
        gl_Position = modelViewProjectionMatrix * vec4( transformed, 1.0 );

      }`

    this.fragmentShader /*GLSL */
    = ` 
      varying vec2 vUv;
      varying vec3 vPositionW;
      varying vec4 vPos;
      varying vec3 vNormalW;
      
      uniform float time;
      uniform float fresnelOpacity;
      uniform float scanlineSize;
      uniform float fresnelAmount;
      uniform float signalSpeed;
      uniform float hologramBrightness;
      uniform float hologramOpacity;
      uniform bool blinkFresnelOnly;
      uniform bool enableBlinking;
      uniform vec3 hologramColor;

      float flicker( float amt, float time ) {return clamp( fract( cos( time ) * 43758.5453123 ), amt, 1.0 );}
      float random(in float a, in float b) { return fract((cos(dot(vec2(a,b) ,vec2(12.9898,78.233))) * 43758.5453)); }

      void main() {
        vec2 vCoords = vPos.xy;
        vCoords /= vPos.w;
        vCoords = vCoords * 0.5 + 0.5;
        vec2 myUV = fract( vCoords );

        // Defines hologram main color
        vec4 hologramColor = vec4(hologramColor, mix(hologramBrightness, vUv.y, 0.5));

        // Add scanlines
        float scanlines = 10.;
        scanlines += 20. * sin(time *signalSpeed * 20.8 - myUV.y * 60. * scanlineSize);
        scanlines *= smoothstep(1.3 * cos(time *signalSpeed + myUV.y * scanlineSize), 0.78, 0.9);
        scanlines *= max(0.25, sin(time *signalSpeed) * 1.0);

        // Scanlines offsets
        float r = random(vUv.x, vUv.y);
        float g = random(vUv.y * 20.2, 	vUv.y * .2);
        float b = random(vUv.y * .9, 	vUv.y * .2);

        // Scanline composition
        hologramColor += vec4(r*scanlines, b*scanlines, r, 1.0) / 84.;
        vec4 scanlineMix = mix(vec4(0.0), hologramColor, hologramColor.a);

        // Calculates fresnel
        vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
        float fresnelEffect = dot(viewDirectionW, vNormalW) * (1.6 - fresnelOpacity/2.);
        fresnelEffect = clamp(fresnelAmount - fresnelEffect, 0., fresnelOpacity);

        // Blinkin effect
        //Suggested by Octano - https://x.com/OtanoDesign?s=20
        float blinkValue = enableBlinking ? 0.6 - signalSpeed : 1.0;
        float blink = flicker(blinkValue, time * signalSpeed * .02);

        // Final shader composition
        vec3 finalColor;

        if(blinkFresnelOnly){
          finalColor = scanlineMix.rgb + fresnelEffect * blink;
        }else{
          finalColor = scanlineMix.rgb * blink + fresnelEffect;
        }

        gl_FragColor = vec4( finalColor, hologramOpacity);

      }`

    // Set default values or modify existing properties if needed
    this.uniforms = {
      /**
         * The time uniform representing animation time.
         * @type {Uniform<number>}
         * @default 0.0
         */
      time: new Uniform(0),

      /**
         * The opacity for the fresnel effect.
         * @type {Uniform<number>}
         * @default 1.0
         */
      fresnelOpacity: new Uniform(parameters.fresnelOpacity !== undefined ? parameters.fresnelOpacity : 1.0),

      /**
         * The strength of the fresnel effect.
         * @type {Uniform<number>}
         * @default 1.0
         */
      fresnelAmount: new Uniform(parameters.fresnelAmount !== undefined ? parameters.fresnelAmount : 0.45),

      /**
         * The size of the scanline effect.
         * @type {Uniform<number>}
         * @default 1.0
         */
      scanlineSize: new Uniform(parameters.scanlineSize !== undefined ? parameters.scanlineSize : 8.0),

      /**
         * The brightness of the hologram.
         * @type {Uniform<number>}
         * @default 1.0
         */
      hologramBrightness: new Uniform(parameters.hologramBrightness !== undefined 
        ? parameters.hologramBrightness 
        : 1.0),

      /**
         * The speed of the signal effect.
         * @type {Uniform<number>}
         * @default 1.0
         */
      signalSpeed: new Uniform(parameters.signalSpeed !== undefined ? parameters.signalSpeed : 1.0),

      /**
         * The color of the hologram.
         * @type {Uniform<Color>}
         * @default new Color(0xFFFFFF)
         */
      hologramColor: new Uniform(parameters.hologramColor !== undefined 
        ? new Color(parameters.hologramColor) 
        : new Color('#00d5ff')),

      /**
         * Enable/disable blinking effect.
         * @type {Uniform<boolean>}
         * @default true
         */
      enableBlinking: new Uniform(parameters.enableBlinking !== undefined ? parameters.enableBlinking : true),

      /**
         * Enable blinking only on the fresnel effect.
         * @type {Uniform<boolean>}
         * @default false
         */
      blinkFresnelOnly: new Uniform(parameters.blinkFresnelOnly !== undefined ? parameters.blinkFresnelOnly : true),

      /**
         * The opacity of the hologram.
         * @type {Uniform<number>}
         * @default 1.0
         */
      hologramOpacity: new Uniform(parameters.hologramOpacity !== undefined ? parameters.hologramOpacity : 1.0),
    }

    this.clock = new Clock()
    this.setValues(parameters)
    this.depthTest = parameters.depthTest !== undefined ? parameters.depthTest : false
    this.blending = parameters.blendMode !== undefined ? parameters.blendMode : AdditiveBlending
    this.transparent = true
    this.side = parameters.side !== undefined ? parameters.side : FrontSide

  }

  update() {
    this.uniforms.time.value = this.clock.getElapsedTime()
  }

}

export default HolographicMaterial 