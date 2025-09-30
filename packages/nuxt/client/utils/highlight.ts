import * as THREE from 'three'

export class HighlightMesh extends THREE.Mesh {
  override type = 'HighlightMesh'
  createTime: number
  constructor(...args: ConstructorParameters<typeof THREE.Mesh>) {
    super(...args)
    this.createTime = Date.now()
  }

  override onBeforeRender() {
    const currentTime = Date.now()
    const time = (currentTime - this.createTime) / 1000
    // Pulsing effect parameters
    const scaleAmplitude = 0.07 // Amplitude of the scale pulsation
    const pulseSpeed = 2.5 // Speed of the pulsation

    // Calculate the scale factor with a sine function for pulsing effect
    const scaleFactor = 1 + scaleAmplitude * Math.sin(pulseSpeed * time)

    // Apply the scale factor
    this.scale.set(scaleFactor, scaleFactor, scaleFactor)
  }
}
