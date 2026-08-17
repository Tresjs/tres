/**
 * Collider intent read off node names, so an artist authors physics in Blender and the
 * generated component needs no hand-editing.
 *
 * The vocabulary is Godot's, deliberately: a level already named for its importer generates
 * bodies here unchanged, and the convention is one plenty of artists have in their fingers.
 *
 * @see https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/node_type_customization.html
 */

/** The shapes `RigidBody` can derive from a mesh on its own, and no others. */
export type PhysicsShape = 'cuboid' | 'ball' | 'capsule' | 'cone' | 'cylinder' | 'convexHull' | 'trimesh'

export type PhysicsBody = 'fixed' | 'dynamic' | 'kinematic' | 'kinematicVelocity'

export interface IRPhysics {
  kind: 'collider'
  body: PhysicsBody
  shape: PhysicsShape
  /** Collides but never draws: a proxy standing in for a visual sibling. */
  hidden?: true
  sensor?: true
  /** What matched, for the record and for warnings: `col-onlyu` reads better than a token list. */
  suffix: string
}

/**
 * A name that reads like a physics suffix but is not one — nearly always a typo. Silence is
 * the worst answer available: the artist gets a level with no collision and no clue why.
 */
export interface IRPhysicsMisread {
  kind: 'misread'
  suffix: string
  reason: string
}

export type IRNodePhysics = IRPhysics | IRPhysicsMisread

type Intent = Omit<IRPhysics, 'kind' | 'suffix'>

/**
 * Godot's four collision suffixes and its `rigid`. `only` in the name is what decides
 * whether the mesh still draws, rather than a default nobody can remember.
 */
const INTENTS: Record<string, Intent> = {
  col: { body: 'fixed', shape: 'trimesh' },
  colonly: { body: 'fixed', shape: 'trimesh', hidden: true },
  convcol: { body: 'fixed', shape: 'convexHull' },
  convcolonly: { body: 'fixed', shape: 'convexHull', hidden: true },
  rigid: { body: 'dynamic', shape: 'convexHull' },
}

/** `rb` is ours: Godot has one rigid body, rapier has four kinds. */
const BODIES: Record<string, PhysicsBody> = {
  fixed: 'fixed',
  static: 'fixed',
  dynamic: 'dynamic',
  kinematic: 'kinematic',
  kinematicvelocity: 'kinematicVelocity',
}

const SHAPES: Record<string, PhysicsShape> = {
  cuboid: 'cuboid',
  ball: 'ball',
  capsule: 'capsule',
  cone: 'cone',
  cylinder: 'cylinder',
  hull: 'convexHull',
  convexhull: 'convexHull',
  trimesh: 'trimesh',
}

/**
 * A body with no interior volume tumbles badly in rapier, so a trimesh is only ever the
 * default for something that never moves. Godot picks convex for `-rigid` for the same reason.
 */
function defaultShape(body: PhysicsBody): PhysicsShape {
  return body === 'fixed' ? 'trimesh' : 'convexHull'
}

/** Godot accepts all three, and a Blender artist reaches for whichever their rig uses. */
const SEPARATOR = /[-_$]+/

/**
 * Blender appends `.001` to a duplicate, and it lands *after* the suffix: duplicate a
 * `Can-rigid` and the second one is `Can-rigid.001`. Every repeated prop in a level hits
 * this, so a counter has to be readable through.
 */
const COUNTER = /[.\s]*\d+$/

/** Numbering by hand puts the counter past the suffix and behind a separator: `Wall-col-2`. */
const COUNTER_TOKEN = /^\d+$/

const PRIMARY = new Set([...Object.keys(INTENTS), 'rb'])

function isKeyword(token: string): boolean {
  return token in INTENTS || token in SHAPES || token in BODIES || PRIMARY.has(token) || token === 'sensor'
}

/** The token as the grammar sees it, reading through a Blender duplicate counter. */
function keyword(raw: string): string | undefined {
  const lower = raw.toLowerCase()
  if (isKeyword(lower)) {
    return lower
  }
  const stripped = lower.replace(COUNTER, '')
  return stripped !== lower && isKeyword(stripped) ? stripped : undefined
}

function interpret(tail: string[]): IRPhysics | IRPhysicsMisread | undefined {
  const suffix = tail.join('-')
  let intent: Intent | undefined
  let shape: PhysicsShape | undefined
  let sensor = false

  for (let index = 0; index < tail.length; index++) {
    const token = tail[index]

    // The one form that reads its body type out of the name, so it consumes the next token.
    if (token === 'rb') {
      const declared = BODIES[tail[index + 1] ?? '']
      if (!declared) {
        return {
          kind: 'misread',
          suffix,
          reason: tail[index + 1]
            ? `"${tail[index + 1]}" is not a body type (${Object.keys(BODIES).join(', ')})`
            : `rb needs a body type, as in -rb-dynamic`,
        }
      }
      intent = { body: declared, shape: defaultShape(declared) }
      index++
      continue
    }

    if (token in INTENTS) {
      intent = INTENTS[token]
      continue
    }
    if (token in SHAPES) {
      shape = SHAPES[token]
      continue
    }
    if (token === 'sensor') {
      sensor = true
    }
  }

  // A trigger volume is the one thing `sensor` means on its own, and it never draws.
  if (!intent && sensor) {
    intent = { body: 'fixed', shape: 'convexHull', hidden: true }
  }
  // Only a shape was named, which declares nothing on its own: `Wheel-cylinder` is a wheel.
  if (!intent) {
    return undefined
  }

  return {
    kind: 'collider',
    ...intent,
    ...(shape ? { shape } : {}),
    ...(sensor ? { sensor: true } : {}),
    suffix,
  }
}

/**
 * A recognized word trailed by something the grammar cannot read. `Crate-rb-dynmic` is the
 * case worth catching: it looks right, and without this it generates nothing at all.
 *
 * `tail` is what the scan already read as a suffix, quoted back in the warning but never
 * searched: the junk is what sits between the keyword and it.
 */
function misread(tokens: string[], tail: string[] = []): IRPhysicsMisread | undefined {
  const index = tokens.findIndex(token => PRIMARY.has(token.toLowerCase()))
  // At 0 the whole name is the keyword, and a suffix has to suffix something.
  if (index <= 0) {
    return undefined
  }

  const junk = tokens.slice(index + 1)
  if (junk.length === 0) {
    return undefined
  }

  // `rb` reads the next token as a body type, so name the set it had to come from.
  const reason = tokens[index].toLowerCase() === 'rb'
    ? `"${junk.join('-')}" is not a body type (${Object.keys(BODIES).join(', ')})`
    : `"${junk.join('-')}" is not a shape or a body type`

  return {
    kind: 'misread',
    suffix: [...tokens.slice(index), ...tail].join('-'),
    reason,
  }
}

/**
 * Reads the trailing suffix off an authored node name. Undefined for every name that says
 * nothing about physics, which is nearly all of them.
 */
export function parsePhysics(name: string): IRNodePhysics | undefined {
  const words = name.split(SEPARATOR).filter(Boolean)
  // Only past a suffix, so `Cube-2` keeps its number: there the 2 is part of the name.
  if (words.length > 2 && COUNTER_TOKEN.test(words[words.length - 1])) {
    words.pop()
  }
  // A suffix has to suffix something: a mesh called `Cone` is a mesh, not a collider.
  if (words.length < 2) {
    return undefined
  }

  const tokens = [...words]
  const tail: string[] = []
  while (tokens.length > 1) {
    const token = keyword(tokens[tokens.length - 1])
    if (!token) {
      break
    }
    tail.unshift(token)
    tokens.pop()
  }

  // Checked before the tail is interpreted, because a suffix the grammar *can* read hides
  // everything in front of it: `Exit-colonly-cubiod-sensor` is a bare sensor otherwise, and
  // the collision the artist actually asked for is gone with no warning.
  return misread(tokens, tail)
    ?? (tail.length > 0 ? interpret(tail) : undefined)
    ?? misread(words)
}
