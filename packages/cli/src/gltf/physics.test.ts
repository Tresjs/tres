import { describe, expect, it } from 'vitest'
import { parsePhysics } from './physics'

describe('parsePhysics', () => {
  it('says nothing about a name that says nothing about physics', () => {
    expect(parsePhysics('Floor')).toBeUndefined()
    expect(parsePhysics('Cube_Prototype_Large_A')).toBeUndefined()
  })

  it('reads Godot\'s collision suffixes', () => {
    expect(parsePhysics('table_medium-col')).toMatchObject({ body: 'fixed', shape: 'trimesh' })
    expect(parsePhysics('Floor-convcol')).toMatchObject({ body: 'fixed', shape: 'convexHull' })
  })

  it('keeps the mesh visible for -col and hides it for -colonly', () => {
    expect(parsePhysics('Ramp-col')).not.toHaveProperty('hidden')
    expect(parsePhysics('Ramp-colonly')).toMatchObject({ hidden: true })
    expect(parsePhysics('Ramp-convcolonly')).toMatchObject({ shape: 'convexHull', hidden: true })
  })

  it('makes -rigid a dynamic body with a shape that has volume', () => {
    expect(parsePhysics('Can_A-rigid')).toMatchObject({ body: 'dynamic', shape: 'convexHull' })
  })

  it('reads through a Blender duplicate counter, which lands after the suffix', () => {
    expect(parsePhysics('Can_A-rigid.001')).toMatchObject({ body: 'dynamic' })
    // The loader sanitizes the dot away before the emitter ever sees the name.
    expect(parsePhysics('Can_A-rigid001')).toMatchObject({ body: 'dynamic' })
    expect(parsePhysics('Wall-convcol.012')).toMatchObject({ shape: 'convexHull' })
  })

  it('reads through a counter numbered by hand, which sits behind a separator', () => {
    expect(parsePhysics('Wall-col-2')).toMatchObject({ body: 'fixed', shape: 'trimesh' })
    expect(parsePhysics('Wall_col_2')).toMatchObject({ body: 'fixed' })
    expect(parsePhysics('Crate-rb-dynamic-3')).toMatchObject({ body: 'dynamic' })
    // Not a counter when there is no suffix in front of it: `Cube-2` is a mesh called Cube-2.
    expect(parsePhysics('Cube-2')).toBeUndefined()
  })

  it('accepts any of Godot\'s separators, in any case', () => {
    expect(parsePhysics('Floor_convcol')).toMatchObject({ shape: 'convexHull' })
    expect(parsePhysics('Floor$convcol')).toMatchObject({ shape: 'convexHull' })
    expect(parsePhysics('Floor-ConvCol')).toMatchObject({ shape: 'convexHull' })
  })

  it('takes an explicit shape over the suffix default', () => {
    expect(parsePhysics('Crate-col-cuboid')).toMatchObject({ body: 'fixed', shape: 'cuboid' })
    expect(parsePhysics('Ball-rigid-ball')).toMatchObject({ body: 'dynamic', shape: 'ball' })
    expect(parsePhysics('Ramp-colonly-hull')).toMatchObject({ shape: 'convexHull', hidden: true })
  })

  it('reads rapier\'s body types off -rb', () => {
    expect(parsePhysics('Lift-rb-kinematic')).toMatchObject({ body: 'kinematic', shape: 'convexHull' })
    expect(parsePhysics('Wall-rb-fixed')).toMatchObject({ body: 'fixed', shape: 'trimesh' })
    expect(parsePhysics('Wall-rb-static')).toMatchObject({ body: 'fixed' })
    expect(parsePhysics('Lift-rb-kinematicVelocity')).toMatchObject({ body: 'kinematicVelocity' })
    expect(parsePhysics('Crate-rb-dynamic-cuboid')).toMatchObject({ body: 'dynamic', shape: 'cuboid' })
  })

  it('makes a bare -sensor an invisible fixed trigger', () => {
    expect(parsePhysics('Exit-sensor')).toMatchObject({
      body: 'fixed',
      hidden: true,
      sensor: true,
    })
  })

  it('combines sensor with a collision suffix, which decides visibility', () => {
    expect(parsePhysics('Exit-colonly-cuboid-sensor')).toMatchObject({
      body: 'fixed',
      shape: 'cuboid',
      hidden: true,
      sensor: true,
    })
    expect(parsePhysics('Plate-col-sensor')).not.toHaveProperty('hidden')
  })

  it('needs a suffix to suffix something', () => {
    expect(parsePhysics('col')).toBeUndefined()
    expect(parsePhysics('Sensor')).toBeUndefined()
    expect(parsePhysics('Cone')).toBeUndefined()
  })

  it('ignores a shape with nothing to shape', () => {
    expect(parsePhysics('Wheel-cylinder')).toBeUndefined()
    expect(parsePhysics('Prop-ball')).toBeUndefined()
  })

  it('reports a recognized word trailed by something it cannot read', () => {
    expect(parsePhysics('Crate-rb-dynmic')).toMatchObject({
      kind: 'misread',
      reason: expect.stringContaining('"dynmic" is not a body type'),
    })
    expect(parsePhysics('Crate-rigid-fast')).toMatchObject({
      kind: 'misread',
      reason: expect.stringContaining('"fast" is not a shape or a body type'),
    })
    expect(parsePhysics('Crate-rb')).toMatchObject({
      kind: 'misread',
      reason: expect.stringContaining('rb needs a body type'),
    })
  })

  it('reports junk in front of a suffix it can read, instead of parsing past it', () => {
    // Scans clean as a bare `-sensor`, and the collision the artist asked for vanishes.
    expect(parsePhysics('Exit-colonly-cubiod-sensor')).toMatchObject({
      kind: 'misread',
      suffix: 'colonly-cubiod-sensor',
      reason: expect.stringContaining('"cubiod" is not a shape or a body type'),
    })
    expect(parsePhysics('Crate-rb-dynmic-cuboid')).toMatchObject({
      kind: 'misread',
      reason: expect.stringContaining('"dynmic" is not a body type'),
    })
  })

  it('records what matched, so a warning can quote it', () => {
    expect(parsePhysics('Ramp-convcolonly')).toMatchObject({ suffix: 'convcolonly' })
    expect(parsePhysics('Crate-rb-dynamic-cuboid')).toMatchObject({ suffix: 'rb-dynamic-cuboid' })
  })
})
