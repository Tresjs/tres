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

  constructor(config: Partial<RandomizedLights> = {}) {
    super()
    Object.assign(this, config)
    if (this.count === 0) { this.count = 8 }
    if (!config.mapSize) {
      this.mapSize = 512
    }
    if (!config.size) {
      this.size = 10
    }
    if (!config.near) {
      this.near = 0.5
    }
    if (!config.far) {
      this.far = 500
    }
  }

  get length() {
    return this.position.length()
  }

  set count(n: number) {
    this.clear()
    for (let i = 0; i < n; i++) {
      this.add(new DirectionalLight('white', this.intensity))
    }
  }

  get count() {
    return this.children.filter(c => 'isDirectionalLight' in c).length
  }

  get mapSize() {
    return this.lights[0].shadow.mapSize.width
  }

  set mapSize(n: number) {
    for (const light of this.lights) {
      // NOTE: Changing the map size requires 2 modifications.
      // https://discourse.threejs.org/t/change-resolution-of-shadows-dinamically/50744/6
      light.shadow.mapSize.set(n, n)
      light.shadow.map?.setSize(n, n)
    }
  }

  get size() {
    return this.lights[0].shadow.camera.right
  }

  set size(n: number) {
    for (const light of this.lights) {
      light.shadow.camera.left = -n
      light.shadow.camera.right = n
      light.shadow.camera.top = n
      light.shadow.camera.bottom = -n
    }
  }

  get near() {
    return this.lights[0].shadow.camera.near
  }

  set near(n: number) {
    for (const light of this.lights) {
      light.shadow.camera.near = n
    }
  }

  get far() {
    return this.lights[0].shadow.camera.far
  }

  set far(n: number) {
    for (const light of this.lights) {
      light.shadow.camera.far = n
    }
  }

  get lights(): DirectionalLight[] {
    return this.children.filter(c => 'isDirectionalLight' in c) as DirectionalLight[]
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
