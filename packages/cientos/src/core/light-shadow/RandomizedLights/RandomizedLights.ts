import { DirectionalLight, Group, MathUtils, Vector3 } from 'three'

export default class RandomizedLights extends Group {
  /** Light position */
  position: Vector3 = new Vector3(0, 0, 0)
  /** Radius of the jiggle, higher values make softer light */
  radius = 1
  /** Light intensity */
  intensity = Math.PI
  /** Ambient occlusion, lower values mean less AO, hight more, you can mix AO and directional light */
  ambient = 0.5
  /** If the lights cast shadows */
  castShadow = true
  /** Default shadow bias */
  bias = 0

  private _mapSize = 512
  private _size = 10
  private _near = 0.5
  private _far = 500

  constructor(config: Partial<RandomizedLights> = {}) {
    super()
    Object.assign(this, config)
    if (this.count === 0) { this.count = 8 }
  }

  get length() {
    return this.position.length()
  }

  set count(n: number) {
    for (const light of this.lights) {
      light.dispose()
    }
    this.clear()
    for (let i = 0; i < n; i++) {
      this.add(new DirectionalLight('white', this.intensity))
    }
    this.configureShadows()
  }

  get count() {
    return this.children.filter(c => 'isDirectionalLight' in c).length
  }

  get mapSize() {
    return this._mapSize
  }

  set mapSize(n: number) {
    this._mapSize = n
    this.configureShadows()
  }

  get size() {
    return this._size
  }

  set size(n: number) {
    this._size = n
    this.configureShadows()
  }

  get near() {
    return this._near
  }

  set near(n: number) {
    this._near = n
    this.configureShadows()
  }

  get far() {
    return this._far
  }

  set far(n: number) {
    this._far = n
    this.configureShadows()
  }

  get lights(): DirectionalLight[] {
    return this.children.filter(c => 'isDirectionalLight' in c) as DirectionalLight[]
  }

  private configureShadows() {
    for (const light of this.lights) {
      // NOTE: Changing the map size requires 2 modifications.
      // https://discourse.threejs.org/t/change-resolution-of-shadows-dinamically/50744/6
      light.shadow.mapSize.set(this._mapSize, this._mapSize)
      light.shadow.map?.setSize(this._mapSize, this._mapSize)
      light.shadow.camera.left = -this._size
      light.shadow.camera.right = this._size
      light.shadow.camera.top = this._size
      light.shadow.camera.bottom = -this._size
      light.shadow.camera.near = this._near
      light.shadow.camera.far = this._far
      // NOTE: three only recomputes the shadow camera projection when it
      // allocates the shadow map, later frustum changes need it explicitly.
      light.shadow.camera.updateProjectionMatrix()
    }
  }

  update() {
    const lights = this.lights
    const lightIntensity = this.intensity / lights.length
    let ambientCount = Math.floor(this.ambient * lights.length)

    for (const light of lights) {
      light.castShadow = this.castShadow
      light.shadow.bias = this.bias

      light.intensity = lightIntensity

      if (ambientCount-- > 0) {
        const lambda = Math.acos(2 * Math.random() - 1) - Math.PI / 2.0
        const phi = 2 * Math.PI * Math.random()
        light.position.set(
          Math.cos(lambda) * Math.cos(phi) * this.length,
          Math.abs(Math.cos(lambda) * Math.sin(phi) * this.length),
          Math.sin(lambda) * this.length,
        )
      }
      else {
        if (Math.random() > this.ambient) {
          light.position.set(
            this.position.x + MathUtils.randFloatSpread(this.radius),
            this.position.y + MathUtils.randFloatSpread(this.radius),
            this.position.z + MathUtils.randFloatSpread(this.radius),
          )
        }
      }
    }
  }
}
