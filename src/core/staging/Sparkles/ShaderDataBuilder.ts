import type { MaybeRef } from 'vue'
import type {
  GradientScalar,
  GradientTresColor,
  GradientVectorFlexibleParams,
} from './../../../utils/Gradient'
import type {
  CanvasGradientRenderer,
  ShaderDataEntry,
} from './ShaderData'
import {
  ShaderData,
  ShaderDataEntryScalarGradient,
  ShaderDataEntryTresColorGradient,
  ShaderDataEntryXyzGradient,
} from './ShaderData'

type rgbaSuffixes = ['r', 'rg', 'rgb', 'rgba']
type xyzwSuffixes = ['x', 'xy', 'xyz', 'xyzw']
type ShaderSuffix =
  | (rgbaSuffixes)[number]
  | (xyzwSuffixes)[number]

export default class ShaderDataBuilder {
  private entries: ShaderDataEntry<any>[]
  private resolution: number

  constructor(resolution = 256) {
    this.resolution = resolution
    this.entries = []
  }

  withResolution(resolution: number) {
    this.resolution = resolution
    return this
  }

  get add() {
    return new ShaderDataBuilderAdd((entry: ShaderDataEntry<any>) =>
      this.onAdd<any>(entry),
    )
  }

  build() {
    return new ShaderData(this.entries, this.resolution)
  }

  private onAdd<T>(entry: ShaderDataEntry<T>) {
    this.entries.push(entry)
    const entryBuilder = new ShaderDataEntryBuilder<T>(entry, this)
    return entryBuilder
  }
}
class ShaderDataEntryBuilder<T> {
  private entry: ShaderDataEntry<T>
  private parent: ShaderDataBuilder

  constructor(entry: ShaderDataEntry<T>, parent: ShaderDataBuilder) {
    this.entry = entry
    this.parent = parent
  }

  id(s: string) {
    this.entry.name = s
    return this
  }

  range(min: number, max: number) {
    this.entry.valueMin = min
    this.entry.valueMax = max
    return this
  }

  suffix(s: ShaderSuffix) {
    this.entry.suffix = s
    return this
  }

  canvasGradientRenderer(fn: CanvasGradientRenderer<T>) {
    this.entry.renderToCanvasGradient = fn
    return this
  }

  /**
   * Add another entry to the ShaderDataBuilder
   */
  get add() {
    return this.parent.add
  }

  /**
   * Finalize the ShaderDataBuilder
   * @returns ShaderData
   */
  build() {
    return this.parent.build()
  }
}

class ShaderDataBuilderAdd {
  private onAdd: (entry: ShaderDataEntry<any>) => ShaderDataEntryBuilder<any>

  constructor(
    onAdd: (entry: ShaderDataEntry<any>) => ShaderDataEntryBuilder<any>,
  ) {
    this.onAdd = onAdd
  }

  GradientTresColor(data: MaybeRef<GradientTresColor>) {
    return this.onAdd(new ShaderDataEntryTresColorGradient(data))
  }

  Gradient01(data: MaybeRef<GradientScalar>) {
    return this.onAdd(new ShaderDataEntryScalarGradient(data, 'zeroOne', 0, 1))
  }

  GradientScalar(data: MaybeRef<GradientScalar>, min: number, max: number) {
    return this.onAdd(
      new ShaderDataEntryScalarGradient(data, 'scalar', min, max),
    )
  }

  GradientXyz(
    data: MaybeRef<GradientVectorFlexibleParams>,
    min: number,
    max: number,
  ) {
    return this.onAdd(
      new ShaderDataEntryXyzGradient(data, 'position', min, max),
    )
  }
}
