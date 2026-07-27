import {
  AdditiveBlending,
  BufferGeometry,
  DoubleSide,
  DynamicDrawUsage,
  InstancedMesh,
  Mesh,
  MeshBasicNodeMaterial,
  PlaneGeometry,
  SpriteNodeMaterial,
  StorageBufferAttribute,
  StorageInstancedBufferAttribute,
} from 'three/webgpu'
import {
  atan,
  color,
  cos,
  deltaTime,
  float,
  Fn,
  hash,
  hue,
  If,
  instanceIndex,
  Loop,
  max,
  min,
  mix,
  mx_fractal_noise_float,
  mx_fractal_noise_vec3,
  PI,
  pcurve,
  sin,
  step,
  storage,
  time,
  TWO_PI,
  uv,
  vec2,
  vec3,
} from 'three/tsl'
import * as U from './uniforms'

export interface Plexus {
  initCompute: any
  updateParticles: any
  spawnParticles: any
  particleMesh: InstancedMesh
  linksMesh: Mesh
}

export function createPlexus(): Plexus {
  const nb = U.NB_PARTICLES

  // Storage buffers. Position packs xyz + life in .w (life <= 0 means dead).
  const particlePositions = storage(new StorageInstancedBufferAttribute(nb, 4), 'vec4', nb)
  const particleVelocities = storage(new StorageInstancedBufferAttribute(nb, 4), 'vec4', nb)

  // Per-index hue: rotates with colorOffset, varied by fractal noise on the index.
  const getInstanceColor = Fn(([i]: any) =>
    hue(
      color(0x0000FF),
      U.colorOffset.add(mx_fractal_noise_float(i.toFloat().mul(0.1), 2, 2.0, 0.5, U.colorVariance)),
    ),
  )

  // Init: park every particle far away and mark it dead.
  const initCompute = Fn(() => {
    particlePositions.element(instanceIndex).xyz.assign(vec3(10000.0))
    particlePositions.element(instanceIndex).w.assign(float(-1.0))
  })().compute(nb)

  // Particle render material (billboarded sprites, additive).
  const particleMaterial = new SpriteNodeMaterial()
  particleMaterial.blending = AdditiveBlending
  particleMaterial.depthWrite = false
  particleMaterial.positionNode = particlePositions.toAttribute()
  particleMaterial.scaleNode = vec2(U.particleSize)
  particleMaterial.rotationNode = atan(
    particleVelocities.toAttribute().y,
    particleVelocities.toAttribute().x,
  )
  particleMaterial.colorNode = Fn(() => {
    const life = particlePositions.toAttribute().w
    const modLife = pcurve(life.oneMinus(), 8.0, 1.0)
    const pulse = pcurve(
      sin(hash(instanceIndex).mul(TWO_PI).add(time.mul(0.5).mul(TWO_PI))).mul(0.5).add(0.5),
      0.25,
      0.25,
    ).mul(10.0).add(1.0)
    return getInstanceColor(instanceIndex).mul(pulse.mul(modLife))
  })()
  particleMaterial.opacityNode = Fn(() => {
    const circle = step(uv().xy.sub(0.5).length(), 0.5)
    const life = particlePositions.toAttribute().w
    return circle.mul(life)
  })()

  const particleGeom = new PlaneGeometry(0.05, 0.05)
  const particleMesh = new InstancedMesh(particleGeom, particleMaterial, nb)
  particleMesh.instanceMatrix.setUsage(DynamicDrawUsage)
  particleMesh.frustumCulled = false

  // Links: 2 quads per particle, fixed index buffer.
  const linksIndices: number[] = []
  for (let i = 0; i < nb; i++) {
    const baseIndex = i * 8
    for (let j = 0; j < 2; j++) {
      const offset = baseIndex + j * 4
      linksIndices.push(offset, offset + 1, offset + 2, offset, offset + 2, offset + 3)
    }
  }
  const nbVertices = nb * 8
  const linksVerticesSBA = new StorageBufferAttribute(nbVertices, 4)
  const linksColorsSBA = new StorageBufferAttribute(nbVertices, 4)

  const linksGeom = new BufferGeometry()
  linksGeom.setAttribute('position', linksVerticesSBA)
  linksGeom.setAttribute('color', linksColorsSBA)
  linksGeom.setIndex(linksIndices)

  const linksMaterial = new MeshBasicNodeMaterial()
  linksMaterial.vertexColors = true
  linksMaterial.side = DoubleSide
  linksMaterial.transparent = true
  linksMaterial.depthWrite = false
  linksMaterial.depthTest = false
  linksMaterial.blending = AdditiveBlending
  linksMaterial.opacityNode = storage(linksColorsSBA, 'vec4', linksColorsSBA.count).toAttribute().w

  const linksMesh = new Mesh(linksGeom, linksMaterial)
  linksMesh.frustumCulled = false

  // Update kernel: integrate turbulence, decay life, find 2 nearest neighbors, write link quads.
  const updateParticles = Fn(() => {
    const position = particlePositions.element(instanceIndex).xyz
    const life = particlePositions.element(instanceIndex).w
    const velocity = particleVelocities.element(instanceIndex).xyz
    const dt = deltaTime.mul(0.1).mul(U.timeScale)

    If(life.greaterThan(0.0), () => {
      const localVel = mx_fractal_noise_vec3(
        position.mul(U.turbFrequency),
        U.turbOctaves,
        U.turbLacunarity,
        U.turbGain,
        U.turbAmplitude,
      ).mul(life.add(0.01))
      velocity.addAssign(localVel)
      velocity.mulAssign(U.turbFriction.oneMinus())
      position.addAssign(velocity.mul(dt))

      life.subAssign(dt.mul(U.particleLifetime.reciprocal()))

      const closestDist1 = float(10000.0).toVar()
      const closestPos1 = vec3(0.0).toVar()
      const closestLife1 = float(0.0).toVar()
      const closestDist2 = float(10000.0).toVar()
      const closestPos2 = vec3(0.0).toVar()
      const closestLife2 = float(0.0).toVar()

      Loop(U.NB_PARTICLES, ({ i }: any) => {
        const otherPart = particlePositions.element(i)
        If(i.notEqual(instanceIndex).and(otherPart.w.greaterThan(0.0)), () => {
          const otherPosition = otherPart.xyz
          const dist = position.sub(otherPosition).lengthSq()
          const moreThanZero = dist.greaterThan(0.0)
          If(dist.lessThan(closestDist1).and(moreThanZero), () => {
            closestDist1.assign(dist)
            closestPos1.assign(otherPosition.xyz)
            closestLife1.assign(otherPart.w)
          }).ElseIf(dist.lessThan(closestDist2).and(moreThanZero), () => {
            closestDist2.assign(dist)
            closestPos2.assign(otherPosition.xyz)
            closestLife2.assign(otherPart.w)
          })
        })
      })

      const linksPositions = storage(linksVerticesSBA, 'vec4', linksVerticesSBA.count)
      const linksColors = storage(linksColorsSBA, 'vec4', linksColorsSBA.count)
      const firstLinkIndex = instanceIndex.mul(8)
      const secondLinkIndex = firstLinkIndex.add(4)

      linksPositions.element(firstLinkIndex).xyz.assign(position)
      linksPositions.element(firstLinkIndex).y.addAssign(U.linksWidth)
      linksPositions.element(firstLinkIndex.add(1)).xyz.assign(position)
      linksPositions.element(firstLinkIndex.add(1)).y.addAssign(U.linksWidth.negate())
      linksPositions.element(firstLinkIndex.add(2)).xyz.assign(closestPos1)
      linksPositions.element(firstLinkIndex.add(2)).y.addAssign(U.linksWidth.negate())
      linksPositions.element(firstLinkIndex.add(3)).xyz.assign(closestPos1)
      linksPositions.element(firstLinkIndex.add(3)).y.addAssign(U.linksWidth)

      linksPositions.element(secondLinkIndex).xyz.assign(position)
      linksPositions.element(secondLinkIndex).y.addAssign(U.linksWidth)
      linksPositions.element(secondLinkIndex.add(1)).xyz.assign(position)
      linksPositions.element(secondLinkIndex.add(1)).y.addAssign(U.linksWidth.negate())
      linksPositions.element(secondLinkIndex.add(2)).xyz.assign(closestPos2)
      linksPositions.element(secondLinkIndex.add(2)).y.addAssign(U.linksWidth.negate())
      linksPositions.element(secondLinkIndex.add(3)).xyz.assign(closestPos2)
      linksPositions.element(secondLinkIndex.add(3)).y.addAssign(U.linksWidth)

      const linkColor = getInstanceColor(instanceIndex)
      const l1 = max(0.0, min(closestLife1, life)).pow(0.8)
      const l2 = max(0.0, min(closestLife2, life)).pow(0.8)

      Loop(4, ({ i }: any) => {
        linksColors.element(firstLinkIndex.add(i)).xyz.assign(linkColor)
        linksColors.element(firstLinkIndex.add(i)).w.assign(l1)
        linksColors.element(secondLinkIndex.add(i)).xyz.assign(linkColor)
        linksColors.element(secondLinkIndex.add(i)).w.assign(l2)
      })
    })
  })().compute(nb)

  // Spawn kernel: revive SPAWN_COUNT particles at the (lerped) cursor position.
  const spawnParticles = Fn(() => {
    const particleIndex = U.spawnIndex.add(instanceIndex).mod(U.NB_PARTICLES).toInt()
    const position = particlePositions.element(particleIndex).xyz
    const life = particlePositions.element(particleIndex).w
    const velocity = particleVelocities.element(particleIndex).xyz

    life.assign(1.0)

    const rRange = float(0.01)
    const rTheta = hash(particleIndex).mul(TWO_PI)
    const rPhi = hash(particleIndex.add(1)).mul(PI)
    const rx = sin(rTheta).mul(cos(rPhi))
    const ry = sin(rTheta).mul(sin(rPhi))
    const rz = cos(rTheta)
    const rDir = vec3(rx, ry, rz)

    const pos = mix(
      U.previousSpawnPosition,
      U.spawnPosition,
      instanceIndex.toFloat().div(U.nbToSpawn.sub(1).toFloat()).clamp(),
    )
    position.assign(pos.add(rDir.mul(rRange)))
    velocity.assign(rDir.mul(5.0))
  })().compute(U.SPAWN_COUNT)

  return { initCompute, updateParticles, spawnParticles, particleMesh, linksMesh }
}
