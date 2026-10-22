import type { UniformNode } from 'three/webgpu'
import { Color, MeshBasicNodeMaterial, Vector3 } from 'three/webgpu'
import {
  abs,
  Discard,
  distance,
  float,
  Fn,
  fract,
  fwidth,
  If,
  min,
  mix,
  modelWorldMatrix,
  modelWorldMatrixInverse,
  positionGeometry,
  pow,
  uniform,
  vec4,
} from 'three/tsl'
import type { GridMaterialUniforms } from './props'
import { gridDefaults } from './props'

export class GridNodeMaterial extends MeshBasicNodeMaterial implements GridMaterialUniforms {
  private readonly gridUniforms = {
    cellSize: uniform(gridDefaults.cellSize),
    sectionSize: uniform(gridDefaults.sectionSize),
    fadeDistance: uniform(gridDefaults.fadeDistance),
    fadeStrength: uniform(gridDefaults.fadeStrength),
    fadeFrom: uniform(gridDefaults.fadeFrom),
    cellThickness: uniform(gridDefaults.cellThickness),
    sectionThickness: uniform(gridDefaults.sectionThickness),
    cellColor: uniform(new Color(gridDefaults.cellColor)),
    sectionColor: uniform(new Color(gridDefaults.sectionColor)),
    // 0/1 floats, not bools: WGSL does not allow bool in a uniform buffer. The GLSL `if`s on
    // them become `mix` and `mul`.
    infiniteGrid: uniform(Number(gridDefaults.infiniteGrid)),
    followCamera: uniform(Number(gridDefaults.followCamera)),
    worldCamProjPosition: uniform(new Vector3()),
    worldPlanePosition: uniform(new Vector3()),
  }

  constructor() {
    super()
    this.transparent = true
    // ShaderMaterial has fog off and NodeMaterial has it on.
    this.fog = false

    const u = this.gridUniforms

    // positionNode is local, so the world-space camera offset goes back through the inverse.
    const scaled = positionGeometry.xzy.mul(mix(float(1), u.fadeDistance.add(1), u.infiniteGrid))
    const cameraOffset = u.worldCamProjPosition.sub(u.worldPlanePosition).mul(u.followCamera)
    const world = modelWorldMatrix.mul(vec4(scaled, 1)).xyz.add(cameraOffset)
    const local = modelWorldMatrixInverse.mul(vec4(world, 1)).xyz

    this.positionNode = local

    const localPosition = local.toVarying()
    const worldPosition = world.toVarying()

    const getGrid = (size: UniformNode<'float', number>, thickness: UniformNode<'float', number>) => {
      const r = localPosition.xz.div(size)
      const grid = abs(fract(r.sub(0.5)).sub(0.5)).div(fwidth(r))
      const line = min(grid.x, grid.y).add(1).sub(thickness)
      return float(1).sub(min(line, 1))
    }

    this.colorNode = Fn(() => {
      const g1 = getGrid(u.cellSize, u.cellThickness).toVar()
      const g2 = getGrid(u.sectionSize, u.sectionThickness).toVar()

      const from = u.worldCamProjPosition.mul(u.fadeFrom)
      const d = float(1).sub(min(distance(from, worldPosition).div(u.fadeDistance), 1))
      const color = mix(u.cellColor, u.sectionColor, min(1, u.sectionThickness.mul(g2)))

      const alpha = g1.add(g2).mul(pow(d, u.fadeStrength)).toVar()
      alpha.assign(mix(alpha.mul(0.75), alpha, g2))
      If(alpha.lessThanEqual(0), () => {
        Discard()
      })

      return vec4(color, alpha)
    })()
  }

  get cellSize() { return this.gridUniforms.cellSize.value }
  set cellSize(value: number) { this.gridUniforms.cellSize.value = value }

  get sectionSize() { return this.gridUniforms.sectionSize.value }
  set sectionSize(value: number) { this.gridUniforms.sectionSize.value = value }

  get fadeDistance() { return this.gridUniforms.fadeDistance.value }
  set fadeDistance(value: number) { this.gridUniforms.fadeDistance.value = value }

  get fadeStrength() { return this.gridUniforms.fadeStrength.value }
  set fadeStrength(value: number) { this.gridUniforms.fadeStrength.value = value }

  get fadeFrom() { return this.gridUniforms.fadeFrom.value }
  set fadeFrom(value: number) { this.gridUniforms.fadeFrom.value = value }

  get cellThickness() { return this.gridUniforms.cellThickness.value }
  set cellThickness(value: number) { this.gridUniforms.cellThickness.value = value }

  get sectionThickness() { return this.gridUniforms.sectionThickness.value }
  set sectionThickness(value: number) { this.gridUniforms.sectionThickness.value = value }

  // Colors have only a getter: Tres calls `.set()` on the returned uniform `Color`.
  get cellColor() { return this.gridUniforms.cellColor.value }

  get sectionColor() { return this.gridUniforms.sectionColor.value }

  get infiniteGrid() { return this.gridUniforms.infiniteGrid.value === 1 }
  set infiniteGrid(value: boolean) { this.gridUniforms.infiniteGrid.value = value ? 1 : 0 }

  get followCamera() { return this.gridUniforms.followCamera.value === 1 }
  set followCamera(value: boolean) { this.gridUniforms.followCamera.value = value ? 1 : 0 }

  get worldCamProjPosition(): Vector3 { return this.gridUniforms.worldCamProjPosition.value }

  get worldPlanePosition(): Vector3 { return this.gridUniforms.worldPlanePosition.value }
}
