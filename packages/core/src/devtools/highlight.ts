import { Mesh } from 'three'

export class HightlightMesh extends Mesh {
  type = 'HightlightMesh'
  createTime: number
  constructor(...args: any[]) {
    super(...args)
    this.createTime = Date.now()
  }

  onBeforeRender() {
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
