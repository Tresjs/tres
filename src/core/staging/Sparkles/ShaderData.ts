import {
  ClampToEdgeWrapping,
  DataTexture,
  RGBAFormat,
  UVMapping,
  UnsignedByteType,
} from 'three'
import { clamp, mapLinear } from 'three/src/math/MathUtils'
import type { MaybeRef, Ref } from 'vue'
import { isRef, shallowRef, triggerRef, watch } from 'vue'
import { watchThrottled } from '@vueuse/core'
import type {
  GradientScalar,
  GradientTresColor,
  GradientVectorFlexibleParams,
} from './../../../utils/Gradient'
import {
  normalizeColorGradient,
  normalizeFlexibleVector3Gradient,
  normalizeScalarGradient,
} from './../../../utils/Gradient'

export type CanvasGradientRenderer<T> = (
  g: CanvasGradient,
  entry: ShaderDataEntry<T>
) => void

export class ShaderData {
  private entries: ShaderDataEntry<any>[]
  private resolution: number

  constructor(entries: ShaderDataEntry<any>[], resolution: number) {
    this.entries = entries
    this.resolution = resolution
  }

  useTexture() {
    return new ShaderDataTexture(this.entries, this.resolution).use()
  }
}

export class ShaderDataEntry<T> {
  data: T
  ref: Ref<T> | null
  name: string
  valueMin: number
  valueMax: number
  suffix: string
  renderToCanvasGradient: CanvasGradientRenderer<T>

  constructor(
    data: MaybeRef<T>,
    name: string,
    valueMin: number,
    valueMax: number,
    suffix: string,
    renderToCanvasGradient: (
      gradient: CanvasGradient,
      data: ShaderDataEntry<T>
    ) => void,
  ) {
    this.data = isRef(data) ? data.value : data
    this.ref = isRef(data) ? data : null
    this.name = name
    this.valueMin = valueMin
    this.valueMax = valueMax
    this.suffix = suffix
    this.renderToCanvasGradient = renderToCanvasGradient
  }
}

export class ShaderDataEntryTresColorGradient extends ShaderDataEntry<GradientTresColor> {
  constructor(
    data: MaybeRef<GradientTresColor>,
    name = 'color',
    valueMin = 0,
    valueMax = 1,
    suffix = 'rgba',
    renderToCanvasGradient = GradientTresColorRenderToCanvasGradient,
  ) {
    super(data, name, valueMin, valueMax, suffix, renderToCanvasGradient)
  }
}

export class ShaderDataEntryScalarGradient extends ShaderDataEntry<GradientScalar> {
  constructor(
    data: MaybeRef<GradientScalar>,
    name = 'scalar',
    valueMin = 0,
    valueMax = 1,
    suffix = 'x',
    renderToCanvasGradient = GradientScalarRenderToCanvasGradient,
  ) {
    super(data, name, valueMin, valueMax, suffix, renderToCanvasGradient)
  }
}

export class ShaderDataEntryXyzGradient extends ShaderDataEntry<GradientVectorFlexibleParams> {
  constructor(
    data: MaybeRef<GradientVectorFlexibleParams>,
    name = 'scalar3',
    valueMin = 0,
    valueMax = 1,
    suffix = 'xyz',
    renderToCanvasGradient = GradientXyzRenderToCanvasGradient,
  ) {
    super(data, name, valueMin, valueMax, suffix, renderToCanvasGradient)
  }
}

class ShaderDataTexture {
  private entries: ShaderDataEntry<any>[]
  private size: number
  private dirty = shallowRef(0)
  private context: CanvasRenderingContext2D

  constructor(entries: ShaderDataEntry<any>[], resolution: number) {
    this.entries = entries
    this.size = Math.max(resolution, entries.length)

    const canvas = document.createElement('canvas')
    canvas.height = this.size
    canvas.width = this.size
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D
  }

  use() {
    const texture = this.build()
    const textureRef = shallowRef(texture)

    for (const entry of this.entries) {
      if (entry.ref) {
        watch(entry.ref, () => {
          entry.data = entry.ref?.value
          triggerRef(this.dirty)
        })
      }
    }

    watchThrottled(
      this.dirty,
      () => {
        this.build(texture)
        textureRef.value = texture
      },
      { throttle: 1000 / 60 },
    )

    return {
      texture: textureRef,
      dispose: () => texture.dispose(),
      yFor: this.entries.reduce((obj, entry, i) => {
        obj[entry.name] = (i + 0.5) / this.size
        return obj
      }, {} as Record<string, number>),
    }
  }

  private build(recycledTexture?: DataTexture) {
    this.entries.forEach((entry: ShaderDataEntry<any>, i) => {
      const gradient = this.context.createLinearGradient(0, i, this.size, i)
      entry.renderToCanvasGradient(gradient, entry)
      this.context.fillStyle = gradient
      this.context.fillRect(0, i, this.size, 1)
    })

    if (recycledTexture) {
      recycledTexture.source.data = this.context.getImageData(
        0,
        0,
        this.size,
        this.size,
      )
    }

    const texture
      = recycledTexture
      ?? new DataTexture(
        this.context.getImageData(0, 0, this.size, this.size).data,
        this.size,
        this.size,
        RGBAFormat,
        UnsignedByteType,
        UVMapping,
        ClampToEdgeWrapping,
        ClampToEdgeWrapping,
      )

    texture.needsUpdate = true

    return texture
  }
}

function clampedMapLinear(
  v: number,
  minIn: number,
  maxIn: number,
  minOut: number,
  maxOut: number,
) {
  return mapLinear(clamp(v, minIn, maxIn), minIn, maxIn, minOut, maxOut)
}

function GradientTresColorRenderToCanvasGradient(
  g: CanvasGradient,
  entry: ShaderDataEntryTresColorGradient,
) {
  return normalizeColorGradient(entry.data).forEach(([offset, color]) =>
    g.addColorStop(
      offset,
      `rgb(${color.r * 255}, ${color.g * 255}, ${color.b * 255})`,
    ),
  )
}

function GradientScalarRenderToCanvasGradient(
  g: CanvasGradient,
  entry: ShaderDataEntryScalarGradient,
) {
  return normalizeScalarGradient(entry.data).forEach(([offset, scalar]) => {
    g.addColorStop(
      offset,
      `rgb(${clampedMapLinear(
        scalar,
        entry.valueMin,
        entry.valueMax,
        0,
        255,
      )}, 0, 0)`,
    )
  })
}

function GradientXyzRenderToCanvasGradient(
  g: CanvasGradient,
  entry: ShaderDataEntryXyzGradient,
) {
  return normalizeFlexibleVector3Gradient(entry.data).forEach(([offset, xyz]) =>
    g.addColorStop(
      offset,
      `rgb(${xyz.map(v =>
        clampedMapLinear(v, entry.valueMin, entry.valueMax, 0, 255),
      )})`,
    ),
  )
}
