import {
  AdditiveBlending,
  Color,
  ShaderMaterial,
  Uniform,
} from 'three'
import type { Blending, Side } from 'three'
import { createTimer } from '@tresjs/core'
import type { TresTimer } from '@tresjs/core'
import type { HolographicMaterialUniforms } from './props'
import { holographicDefaults } from './props'

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

// `HolographicNodeMaterial.ts` ports this shader to TSL. A fix here must go there too.
class HolographicMaterial extends ShaderMaterial implements HolographicMaterialUniforms {
  clock: TresTimer
  /**
   * Create a HolographicMaterial.
   *
   * @param {object} parameters - The parameters to configure the material.
   * @param {number} [parameters.time] - The time uniform representing animation time.
   * @param {number} [parameters.fresnelOpacity] - The opacity for the fresnel effect.
   * @param {number} [parameters.fresnelAmount] - The strength of the fresnel effect.
   * @param {number} [parameters.scanlineSize] - The size of the scanline effect.
   * @param {number} [parameters.hologramBrightness] - The brightness of the hologram.
   * @param {number} [parameters.signalSpeed] - The speed of the signal effect.
   * @param {Color} [parameters.hologramColor] - The color of the hologram.
   * @param {boolean} [parameters.enableBlinking] - Enable/disable blinking effect.
   * @param {boolean} [parameters.blinkFresnelOnly] - Enable blinking only on the fresnel effect.
   * @param {number} [parameters.hologramOpacity] - The opacity of the hologram.
   * @param {number} [parameters.blendMode] - The blending mode. Use `THREE.NormalBlending` or `THREE.AdditiveBlending`.
   * @param {number} [parameters.side] - The rendering side. Use `THREE.FrontSide`,
   *  `THREE.BackSide`, or `THREE.DoubleSide`.
   * @param {boolean} [parameters.depthTest] - Enable or disable depthTest.
   */
  constructor(parameters: HolographicMaterialParameters = {}) {
    super()

    this.vertexShader /* GLSL */
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

    this.fragmentShader /* GLSL */
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
        float g = random(vUv.y * 20.2, vUv.y * .2);
        float b = random(vUv.y * .9, vUv.y * .2);

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
       * @default 1
       */
      fresnelOpacity: new Uniform(parameters.fresnelOpacity ?? holographicDefaults.fresnelOpacity),

      /**
       * The strength of the fresnel effect.
       * @type {Uniform<number>}
       * @default 0.45
       */
      fresnelAmount: new Uniform(parameters.fresnelAmount ?? holographicDefaults.fresnelAmount),

      /**
       * The size of the scanline effect.
       * @type {Uniform<number>}
       * @default 8
       */
      scanlineSize: new Uniform(parameters.scanlineSize ?? holographicDefaults.scanlineSize),

      /**
       * The brightness of the hologram.
       * @type {Uniform<number>}
       * @default 0.7
       */
      hologramBrightness: new Uniform(parameters.hologramBrightness ?? holographicDefaults.hologramBrightness),

      /**
       * The speed of the signal effect.
       * @type {Uniform<number>}
       * @default 0.45
       */
      signalSpeed: new Uniform(parameters.signalSpeed ?? holographicDefaults.signalSpeed),

      /**
       * The color of the hologram.
       * @type {Uniform<Color>}
       * @default new Color('#00d5ff')
       */
      hologramColor: new Uniform(new Color(parameters.hologramColor ?? holographicDefaults.hologramColor)),

      /**
       * Enable/disable blinking effect.
       * @type {Uniform<boolean>}
       * @default true
       */
      enableBlinking: new Uniform(parameters.enableBlinking ?? holographicDefaults.enableBlinking),

      /**
       * Enable blinking only on the fresnel effect.
       * @type {Uniform<boolean>}
       * @default true
       */
      blinkFresnelOnly: new Uniform(parameters.blinkFresnelOnly ?? holographicDefaults.blinkFresnelOnly),

      /**
       * The opacity of the hologram.
       * @type {Uniform<number>}
       * @default 1
       */
      hologramOpacity: new Uniform(parameters.hologramOpacity ?? holographicDefaults.hologramOpacity),
    }

    this.clock = createTimer()
    this.clock.start()
    this.setValues(parameters)
    this.depthTest = parameters.depthTest !== undefined ? parameters.depthTest : false
    this.blending = parameters.blendMode !== undefined ? parameters.blendMode : AdditiveBlending
    this.transparent = true
    this.side = parameters.side ?? holographicDefaults.side
  }

  update() {
    this.clock.update()
    this.uniforms.time.value = this.clock.getElapsed()
  }

  // The same accessors as `HolographicNodeMaterial`, so both components bind the props the same way.
  get fresnelAmount(): number { return this.uniforms.fresnelAmount.value }
  set fresnelAmount(value: number) { this.uniforms.fresnelAmount.value = value }

  get fresnelOpacity(): number { return this.uniforms.fresnelOpacity.value }
  set fresnelOpacity(value: number) { this.uniforms.fresnelOpacity.value = value }

  get scanlineSize(): number { return this.uniforms.scanlineSize.value }
  set scanlineSize(value: number) { this.uniforms.scanlineSize.value = value }

  get hologramBrightness(): number { return this.uniforms.hologramBrightness.value }
  set hologramBrightness(value: number) { this.uniforms.hologramBrightness.value = value }

  get signalSpeed(): number { return this.uniforms.signalSpeed.value }
  set signalSpeed(value: number) { this.uniforms.signalSpeed.value = value }

  get hologramOpacity(): number { return this.uniforms.hologramOpacity.value }
  set hologramOpacity(value: number) { this.uniforms.hologramOpacity.value = value }

  // The color has only a getter: Tres calls `.set()` on the returned uniform `Color`.
  get hologramColor(): Color { return this.uniforms.hologramColor.value }

  get enableBlinking(): boolean { return this.uniforms.enableBlinking.value }
  set enableBlinking(value: boolean) { this.uniforms.enableBlinking.value = value }

  get blinkFresnelOnly(): boolean { return this.uniforms.blinkFresnelOnly.value }
  set blinkFresnelOnly(value: boolean) { this.uniforms.blinkFresnelOnly.value = value }
}
export default HolographicMaterial
