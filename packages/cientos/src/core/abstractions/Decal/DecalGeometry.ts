/**
 * Builder for the projected decal mesh and a helper to recover a stable
 * texture name for `v-model:data` round-trips.
 */
import { Box3, BufferAttribute, BufferGeometry, Matrix4, Mesh, Vector3 } from 'three'
import type { Euler, Texture } from 'three'
import { DecalGeometry } from 'three-stdlib'
import type { MeshBVH } from 'three-mesh-bvh'
import type { DecalEntry } from './useDecalEditor'

const tmpInverse = new Matrix4()
const tmpNormal = new Vector3()
const tmpLocalNormal = new Vector3()
const tmpParentInv = new Matrix4()
const tmpBox = new Box3()
const tmpCorners: Vector3[] = Array.from({ length: 8 }, () => new Vector3())
const cullA = new Vector3()
const cullB = new Vector3()
const cullC = new Vector3()
const cullEdge1 = new Vector3()
const cullEdge2 = new Vector3()
const cullFaceNormal = new Vector3()
const FORWARD = Object.freeze(new Vector3(0, 0, 1))

// Reused across builds — DecalGeometry only reads matrixWorld + geometry.
const bvhProxyMesh = (() => {
  const m = new Mesh()
  m.matrixAutoUpdate = false
  m.matrixWorldAutoUpdate = false
  return m
})()

/** Geometry with the optional three-mesh-bvh field surfaced for TS. */
type GeometryMaybeBVH = BufferGeometry & { boundsTree?: MeshBVH }

interface BuildOptions {
  /** Distance along the surface normal to avoid z-fighting. */
  baseOffset?: number
  /** Extra distance per zIndex layer. */
  layerGap?: number
  /**
   * Minimum dot product between a triangle's normal and the decal's
   * projector forward axis required to keep that triangle. Mitigates the
   * three-stdlib `DecalGeometry` wrap-around bug (three.js#21187): faces
   * facing away from the projector are otherwise pulled into the decal and
   * stretched across the silhouette. Default `0.2` (≈78°). Pass `0` or a
   * negative number to disable culling.
   */
  cullThreshold?: number
}

interface GeometryCacheEntry {
  position: Vector3
  orientation: Euler
  size: Vector3
  zIndex: number
  flipX: boolean
  flipY: boolean
}

const cache = new WeakMap<Mesh, GeometryCacheEntry>()

/**
 * Force the next `updateDecalGeometry` call to rebuild from scratch.
 * Use when the parent mesh has been moved or swapped (decals are baked
 * in their parent's frame).
 */
export function invalidateDecalGeometry(target: Mesh) {
  cache.delete(target)
}

/**
 * Build the decal geometry on `target` so it conforms to `parent`'s surface.
 * Mutates `target.geometry` in place (the previous geometry is disposed).
 *
 * Dirty-checked against {@link cache}: identical inputs short-circuit.
 */
export function updateDecalGeometry(
  target: Mesh,
  parent: Mesh,
  entry: Pick<DecalEntry, 'position' | 'orientation' | 'size' | 'zIndex' | 'flipX' | 'flipY'>,
  options: BuildOptions = {},
) {
  if (!target || !parent) { return }

  const flipX = !!entry.flipX
  const flipY = !!entry.flipY

  const cached = cache.get(target)
  if (
    target.geometry
    && cached
    && cached.zIndex === entry.zIndex
    && cached.flipX === flipX
    && cached.flipY === flipY
    && cached.position.equals(entry.position)
    && cached.orientation.equals(entry.orientation)
    && cached.size.equals(entry.size)
  ) {
    return
  }

  const { baseOffset = 0.01, layerGap = 0.001, cullThreshold = 0.2 } = options

  // `updateWorldMatrix(true, …)` refreshes the ancestor chain first —
  // `updateMatrixWorld` only walks down, so a parent nested under
  // not-yet-resolved ancestors (e.g. a loaded model under an offset
  // group) would bake against a stale world matrix on first mount.
  parent.updateWorldMatrix(true, false)
  target.geometry?.dispose()

  // If `useBVH` is wired on the parent, pre-filter triangles intersecting
  // the decal OBB — otherwise three-stdlib scans the whole mesh.
  const projector = (parent.geometry as GeometryMaybeBVH | undefined)?.boundsTree
    ? buildBVHCandidateMesh(parent, entry)
    : parent
  const geometry = new DecalGeometry(projector, entry.position, entry.orientation, entry.size)
  if (projector !== parent) { projector.geometry.dispose() }

  // Bake into the target's local space; the caller must ensure
  // `target.parent === parent` so the decal inherits transforms via
  // the scene graph.
  tmpInverse.copy(parent.matrixWorld).invert()
  geometry.applyMatrix4(tmpInverse)

  tmpNormal.copy(FORWARD).applyEuler(entry.orientation)
  tmpLocalNormal.copy(tmpNormal).transformDirection(tmpInverse).normalize()

  if (cullThreshold > 0) {
    cullTrianglesByProjectionAngle(geometry, tmpLocalNormal, cullThreshold)
  }

  const parentScale = parent.scale.x || 1
  const totalOffset = (baseOffset + entry.zIndex * layerGap) / parentScale
  geometry.translate(
    tmpLocalNormal.x * totalOffset,
    tmpLocalNormal.y * totalOffset,
    tmpLocalNormal.z * totalOffset,
  )

  // Flip via UV inversion — `Texture.matrix` is shared, mutating would alias.
  if (flipX || flipY) {
    const uv = geometry.attributes.uv as BufferAttribute | undefined
    if (uv) {
      for (let i = 0; i < uv.count; i++) {
        let u = uv.getX(i)
        let v = uv.getY(i)
        if (flipX) { u = 1 - u }
        if (flipY) { v = 1 - v }
        uv.setXY(i, u, v)
      }
      uv.needsUpdate = true
    }
  }

  target.geometry = geometry

  if (cached) {
    cached.position.copy(entry.position)
    cached.orientation.copy(entry.orientation)
    cached.size.copy(entry.size)
    cached.zIndex = entry.zIndex
    cached.flipX = flipX
    cached.flipY = flipY
  }
  else {
    cache.set(target, {
      position: entry.position.clone(),
      orientation: entry.orientation.clone(),
      size: entry.size.clone(),
      zIndex: entry.zIndex,
      flipX,
      flipY,
    })
  }
}

/**
 * BVH-accelerated projection pre-pass.
 *
 * Builds a temporary Mesh whose geometry contains ONLY the triangles of
 * `parent` that intersect the decal's oriented bounding box (OBB),
 * resolved via `parent.geometry.boundsTree` (set by `useBVH`). The
 * resulting mesh masquerades as the parent for `three-stdlib`'s
 * `DecalGeometry`: same world matrix, smaller triangle set.
 *
 * The OBB → AABB enclosing transform is conservative (over-collects a
 * few neighbouring triangles); precise filtering is delegated to the
 * downstream clipper, which is robust on any candidate set.
 */
function buildBVHCandidateMesh(parent: Mesh, entry: Pick<DecalEntry, 'position' | 'orientation' | 'size'>): Mesh {
  const bvh = (parent.geometry as GeometryMaybeBVH).boundsTree as MeshBVH
  const src = parent.geometry
  const srcPos = src.attributes.position as BufferAttribute | undefined
  if (!srcPos) { return parent }
  const srcNorm = src.attributes.normal as BufferAttribute | undefined
  const srcUv = src.attributes.uv as BufferAttribute | undefined
  const srcIndex = src.index

  tmpParentInv.copy(parent.matrixWorld).invert()
  computeDecalOBBLocalAABB(entry, tmpParentInv, tmpBox)

  const triangleIndices: number[] = []
  bvh.shapecast({
    intersectsBounds: (box: Box3) => tmpBox.intersectsBox(box),
    intersectsTriangle: (_triangle: unknown, triangleIndex: number) => {
      triangleIndices.push(triangleIndex)
      return false
    },
  } as Parameters<MeshBVH['shapecast']>[0])

  // Degenerate decal (no candidates): fall back to the parent so the
  // downstream clipper returns its usual empty geometry.
  if (triangleIndices.length === 0) { return parent }

  const vertexCount = triangleIndices.length * 3
  const posArr = new Float32Array(vertexCount * 3)
  const normArr = srcNorm ? new Float32Array(vertexCount * 3) : null
  const uvArr = srcUv ? new Float32Array(vertexCount * 2) : null

  for (let t = 0; t < triangleIndices.length; t++) {
    const tri = triangleIndices[t]
    for (let v = 0; v < 3; v++) {
      const srcVertex = srcIndex ? srcIndex.getX(tri * 3 + v) : tri * 3 + v
      const dst = (t * 3 + v)
      posArr[dst * 3 + 0] = srcPos.getX(srcVertex)
      posArr[dst * 3 + 1] = srcPos.getY(srcVertex)
      posArr[dst * 3 + 2] = srcPos.getZ(srcVertex)
      if (normArr && srcNorm) {
        normArr[dst * 3 + 0] = srcNorm.getX(srcVertex)
        normArr[dst * 3 + 1] = srcNorm.getY(srcVertex)
        normArr[dst * 3 + 2] = srcNorm.getZ(srcVertex)
      }
      if (uvArr && srcUv) {
        uvArr[dst * 2 + 0] = srcUv.getX(srcVertex)
        uvArr[dst * 2 + 1] = srcUv.getY(srcVertex)
      }
    }
  }

  const candidate = new BufferGeometry()
  candidate.setAttribute('position', new BufferAttribute(posArr, 3))
  if (normArr) { candidate.setAttribute('normal', new BufferAttribute(normArr, 3)) }
  if (uvArr) { candidate.setAttribute('uv', new BufferAttribute(uvArr, 2)) }

  // Release the previous candidate geometry — the proxy is a singleton
  // reused across every BVH build, so every assignment would otherwise
  // strand a BufferGeometry on the GPU.
  bvhProxyMesh.geometry?.dispose()
  bvhProxyMesh.geometry = candidate
  bvhProxyMesh.matrixWorld.copy(parent.matrixWorld)
  return bvhProxyMesh
}

/**
 * Project the 8 corners of the decal's OBB into the parent's local
 * frame and reduce them to a single axis-aligned `Box3` — used as the
 * coarse predicate for BVH `shapecast`. Slightly over-conservative but
 * fast and never under-collects.
 */
function computeDecalOBBLocalAABB(
  entry: Pick<DecalEntry, 'position' | 'orientation' | 'size'>,
  parentInverseWorld: Matrix4,
  out: Box3,
): void {
  const sx = entry.size.x * 0.5
  const sy = entry.size.y * 0.5
  const sz = entry.size.z * 0.5
  const signs = [-1, 1]
  let k = 0
  for (const dx of signs) {
    for (const dy of signs) {
      for (const dz of signs) {
        tmpCorners[k++].set(dx * sx, dy * sy, dz * sz)
      }
    }
  }
  out.makeEmpty()
  for (let c = 0; c < 8; c++) {
    tmpCorners[c].applyEuler(entry.orientation).add(entry.position).applyMatrix4(parentInverseWorld)
    out.expandByPoint(tmpCorners[c])
  }
}

/**
 * Drop triangles whose face normal makes too steep an angle with the
 * projector forward axis. Mitigates `three.js#21187` (the stdlib
 * `DecalGeometry` does not filter back-facing geometry, so decals near a
 * silhouette wrap around onto opposite faces and stretch). Works on the
 * non-indexed buffer that `DecalGeometry` returns: 3 consecutive vertices
 * per triangle, face normal recomputed from the edges (more reliable than
 * the interpolated vertex normals it copies from the parent mesh).
 */
function cullTrianglesByProjectionAngle(
  geometry: BufferGeometry,
  projectorDir: Vector3,
  threshold: number,
) {
  const position = geometry.attributes.position as BufferAttribute | undefined
  if (!position || position.count === 0) { return }
  const triCount = (position.count / 3) | 0
  if (triCount === 0) { return }

  const keep = new Uint8Array(triCount)
  let kept = 0
  for (let i = 0; i < triCount; i++) {
    const base = i * 3
    cullA.fromBufferAttribute(position, base + 0)
    cullB.fromBufferAttribute(position, base + 1)
    cullC.fromBufferAttribute(position, base + 2)
    cullEdge1.subVectors(cullB, cullA)
    cullEdge2.subVectors(cullC, cullA)
    cullFaceNormal.crossVectors(cullEdge1, cullEdge2)
    const len = cullFaceNormal.length()
    // Degenerate (zero area) — also drops on first pass.
    if (len === 0) { continue }
    cullFaceNormal.divideScalar(len)
    if (cullFaceNormal.dot(projectorDir) >= threshold) {
      keep[i] = 1
      kept++
    }
  }
  if (kept === triCount) { return }

  const normal = geometry.attributes.normal as BufferAttribute | undefined
  const uv = geometry.attributes.uv as BufferAttribute | undefined
  const newPos = new Float32Array(kept * 9)
  const newNorm = normal ? new Float32Array(kept * 9) : null
  const newUv = uv ? new Float32Array(kept * 6) : null

  let dst = 0
  for (let i = 0; i < triCount; i++) {
    if (!keep[i]) { continue }
    const srcBase = i * 3
    const dstBase = dst * 3
    for (let j = 0; j < 3; j++) {
      const s = srcBase + j
      const d = dstBase + j
      newPos[d * 3 + 0] = position.getX(s)
      newPos[d * 3 + 1] = position.getY(s)
      newPos[d * 3 + 2] = position.getZ(s)
      if (newNorm && normal) {
        newNorm[d * 3 + 0] = normal.getX(s)
        newNorm[d * 3 + 1] = normal.getY(s)
        newNorm[d * 3 + 2] = normal.getZ(s)
      }
      if (newUv && uv) {
        newUv[d * 2 + 0] = uv.getX(s)
        newUv[d * 2 + 1] = uv.getY(s)
      }
    }
    dst++
  }
  geometry.setAttribute('position', new BufferAttribute(newPos, 3))
  if (newNorm) { geometry.setAttribute('normal', new BufferAttribute(newNorm, 3)) }
  if (newUv) { geometry.setAttribute('uv', new BufferAttribute(newUv, 2)) }
}

/**
 * Normalised aspect ratio of a texture's source image, divided by its
 * diagonal so width² + height² = 1. Returned as `{ x: w/diag, y: h/diag }`.
 * Falls back to `{ 1, 1 }` (square) when the image isn't loaded yet.
 */
export function getTextureAspect(tex: Texture | null | undefined): { x: number, y: number } {
  const img = tex?.image as { width?: number, height?: number } | undefined
  if (!img) { return { x: 1, y: 1 } }
  const w = img.width ?? 1
  const h = img.height ?? 1
  const diag = Math.sqrt(w * w + h * h) || 1
  return { x: w / diag, y: h / diag }
}

/** Resolve a stable, serializable name for a texture. */
export function getTextureName(texture: Texture | null | undefined): string | null {
  if (!texture) { return null }
  if (texture.name) { return texture.name }
  const userDataName = (texture.userData as { name?: string } | undefined)?.name
  if (userDataName) { return userDataName }
  const src = (texture.image as { src?: string } | undefined)?.src
  if (!src) { return null }
  try {
    const filename = src.split('/').pop()?.split('?')[0]
    return filename ? decodeURIComponent(filename) : null
  }
  catch {
    return null
  }
}

/** Backfill missing `.name`s in-place so sibling UIs can key on them. */
export function ensureTextureNames(textures: Texture[]) {
  for (const tex of textures) {
    if (tex.name) { continue }
    const inferred = getTextureName(tex)
    if (inferred) { tex.name = inferred }
  }
}
