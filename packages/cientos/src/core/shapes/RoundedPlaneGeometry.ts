import { BufferAttribute, BufferGeometry } from 'three'

/**
 * A plane geometry with rounded corners.
 *
 * Vendored from pmndrs/maath (MIT) to avoid an extra dependency.
 * @see https://github.com/pmndrs/maath/blob/main/packages/maath/src/geometry.ts
 * @see https://discourse.threejs.org/t/roundedrectangle-squircle/28645/20
 */
export class RoundedPlaneGeometry extends BufferGeometry {
  parameters: {
    width: number
    height: number
    radius: number
    segments: number
  }

  constructor(width = 1, height = 1, radius = 0.2, segments = 16) {
    super()
    this.parameters = { width, height, radius, segments }

    // helper consts
    const wi = width / 2 - radius // inner width
    const hi = height / 2 - radius // inner height
    const ul = radius / width // u left
    const ur = (width - radius) / width // u right
    const vl = radius / height // v low
    const vh = (height - radius) / height // v high

    const positions = [wi, hi, 0, -wi, hi, 0, -wi, -hi, 0, wi, -hi, 0]
    const uvs = [ur, vh, ul, vh, ul, vl, ur, vl]

    const n = [
      3 * (segments + 1) + 3,
      3 * (segments + 1) + 4,
      segments + 4,
      segments + 5,
      2 * (segments + 1) + 4,
      2,
      1,
      2 * (segments + 1) + 3,
      3,
      4 * (segments + 1) + 3,
      4,
      0,
    ]

    const indices = [
      n[0],
      n[1],
      n[2],
      n[0],
      n[2],
      n[3],
      n[4],
      n[5],
      n[6],
      n[4],
      n[6],
      n[7],
      n[8],
      n[9],
      n[10],
      n[8],
      n[10],
      n[11],
    ]

    let phi, cos, sin, xc, yc, uc, vc, idx
    for (let i = 0; i < 4; i++) {
      xc = i < 1 || i > 2 ? wi : -wi
      yc = i < 2 ? hi : -hi
      uc = i < 1 || i > 2 ? ur : ul
      vc = i < 2 ? vh : vl
      for (let j = 0; j <= segments; j++) {
        phi = (Math.PI / 2) * (i + j / segments)
        cos = Math.cos(phi)
        sin = Math.sin(phi)
        positions.push(xc + radius * cos, yc + radius * sin, 0)
        uvs.push(uc + ul * cos, vc + vl * sin)
        if (j < segments) {
          idx = (segments + 1) * i + j + 4
          indices.push(i, idx, idx + 1)
        }
      }
    }

    this.setIndex(new BufferAttribute(new Uint32Array(indices), 1))
    this.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3))
    this.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2))
  }
}
