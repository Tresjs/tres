/**
 * The `--physics rapier` half of the emitter: turns the collider intent parsed off node names
 * into `<RigidBody>` markup.
 *
 * Nothing here computes a size. `RigidBody` derives its colliders from the geometry of its
 * own mesh children at load time, so a re-export that changes a shape changes the collider
 * with it, and the numbers can never drift from the ones rapier would have picked.
 */
import type { IRNode } from '../gltf/ir'
import type { IRPhysics } from '../gltf/physics'
import { access } from './shared'

export const RAPIER_IMPORT = `import { RigidBody } from '@tresjs/rapier'`

/** A misread suffix is a warning and nothing else, so only a parsed collider emits. */
export function colliderOf(node: IRNode): IRPhysics | undefined {
  return node.physics?.kind === 'collider' ? node.physics : undefined
}

/**
 * Everything but the transform, which the caller owns: `:position` and `:rotation` belong on
 * the body (rapier seeds the simulation from them) while `:scale` stays on the mesh, because
 * rapier reads scale off the *child* to size the collider it derives from it.
 */
export function bodyAttributes(physics: IRPhysics): string[] {
  return [
    `type="${physics.body}"`,
    `collider="${physics.shape}"`,
    ...(physics.sensor ? ['sensor'] : []),
  ]
}

/**
 * A batched mesh renders as `<Instance>`, which is a geometry-less placeholder — so a body
 * wrapping one has nothing to derive a collider from. This hands it the geometry back without
 * drawing it twice: one draw call for the batch, one body per instance.
 *
 * `:scale` has to ride along, because rapier sizes the derived collider from the scale of the
 * child it read the geometry off — and here that child is this proxy, not the `<Instance>`.
 */
export function colliderProxy(node: IRNode, scale?: string): string {
  const attrs = [`:geometry="${access('nodes', node.name)}.geometry"`, ':visible="false"', ...(scale ? [scale] : [])]
  return `<TresMesh ${attrs.join(' ')} />`
}

/**
 * Everything the grammar can express that rapier then mishandles, plus the typos. Walks the
 * tree the emitter renders, which is the root's children: the root's own transform is dropped.
 */
export function physicsWarnings(root: IRNode): string[] {
  const warnings: string[] = []
  let colliders = 0

  function walk(node: IRNode, ancestors: IRNode[]): void {
    if (node.physics?.kind === 'misread') {
      warnings.push(
        `${node.name}: "-${node.physics.suffix}" reads like a collider suffix, but ${node.physics.reason}. `
        + `Nothing was generated for it.`,
      )
    }

    if (colliderOf(node)) {
      colliders++

      // Two bodies in one branch each own their group's transform, and the inner one inherits
      // the outer one's on top of what rapier writes into it.
      const outer = ancestors.find(ancestor => colliderOf(ancestor))
      if (outer) {
        warnings.push(
          `${node.name} is a body inside ${outer.name}, and rapier bodies do not nest: the inner one `
          + `simulates independently and drifts away from the outer. Make it a sibling, or drop the `
          + `suffix on ${outer.name}.`,
        )
      }

      // rapier seeds a body from its group's own position and writes the simulated pose back
      // into it, both in world terms, so an ancestor transform is applied twice.
      const transformed = ancestors.find(ancestor => ancestor.transform)
      if (transformed && !outer) {
        warnings.push(
          `${node.name} sits under ${transformed.name}, which carries a transform. rapier simulates in `
          + `world space, so this body will be placed as if that transform were not there. Apply `
          + `transforms on export, or move it to the scene root.`,
        )
      }
    }

    for (const child of node.children) {
      walk(child, [...ancestors, node])
    }
  }

  for (const child of root.children) {
    walk(child, [])
  }

  if (colliders === 0) {
    warnings.push(
      `No node in this model names a collider, so --physics rapier generated nothing. Suffix a mesh `
      + `with -col, -colonly, -convcol, -convcolonly, -rigid, -rb-<type> or -sensor.`,
    )
  }

  return warnings
}
