/**
 * Decides which meshes get collapsed into an `InstancedMesh` batch. Both emitted files
 * derive their view from this one plan: the provider allocates a batch per key, the
 * consumer renders `<Instance :batch>` against the same key.
 */
import type { GLTFIR, IRNode } from '../gltf/ir'

export interface InstanceBatch {
  /** What `<Merged :meshes>` keys the batch by, and what `<Instance batch>` refers to. */
  key: string
  material: string
  /** Nodes joining this batch, in traversal order. */
  nodes: string[]
}

export interface InstancePlan {
  batches: InstanceBatch[]
  /** Node name → the key of the batch it joins. */
  assignment: Map<string, string>
}

export const NO_INSTANCING: InstancePlan = { batches: [], assignment: new Map() }

/**
 * Skinning and morph targets are per-mesh state an `InstancedMesh` has nowhere to put,
 * so those meshes keep rendering as themselves however loudly `--instanceall` asks.
 */
function isBatchable(node: IRNode | undefined): boolean {
  return node?.type === 'Mesh' && !node.morphTargets
}

function index(root: IRNode): Map<string, IRNode> {
  const byName = new Map<string, IRNode>()
  const walk = (node: IRNode): void => {
    if (node.name) {
      byName.set(node.name, node)
    }
    node.children.forEach(walk)
  }
  walk(root)
  return byName
}

/**
 * `all` batches every eligible mesh, including the ones that appear once — worth it only
 * when several copies of the whole model share a scene. Without it a bucket has to hold
 * at least two meshes before batching pays for the extra file.
 */
export function planInstancing(ir: GLTFIR, root: IRNode, all: boolean): InstancePlan {
  const byName = index(root)
  const batches: InstanceBatch[] = []
  const assignment = new Map<string, string>()

  for (const bucket of ir.instances) {
    const nodes = bucket.nodes.filter(name => isBatchable(byName.get(name)))
    if (nodes.length === 0 || (!all && nodes.length < 2)) {
      continue
    }

    const key = nodes[0]
    batches.push({ key, material: bucket.material, nodes })
    nodes.forEach(name => assignment.set(name, key))
  }

  return { batches, assignment }
}
