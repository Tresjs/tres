import { stat } from 'node:fs/promises'
import { basename, dirname, relative, resolve, sep } from 'node:path'

export interface AssetURL {
  /** What the generated component passes to `useGLTF`. */
  url: string
  /** False when we guessed, which is worth telling the user about. */
  inferred: boolean
}

/** Vite and Nuxt both serve this directory from the site root. */
const PUBLIC_DIRS = ['public']

async function isDirectory(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isDirectory()
  }
  catch {
    return false
  }
}

/** The nearest served directory above a file, if it sits inside one. */
export async function findPublicRoot(path: string): Promise<string | null> {
  let dir = dirname(resolve(path))

  while (true) {
    if (PUBLIC_DIRS.includes(basename(dir)) && await isDirectory(dir)) {
      return dir
    }

    const parent = dirname(dir)
    if (parent === dir) {
      return null
    }
    dir = parent
  }
}

/**
 * Turn a filesystem path into the URL the model will be served from, by finding the
 * nearest `public/` above it. Nothing else can be derived reliably — a model outside
 * a served directory could end up anywhere — so that case falls back to the bare
 * filename and the caller is expected to say so.
 */
export async function inferAssetURL(path: string): Promise<AssetURL> {
  const absolute = resolve(path)
  const publicRoot = await findPublicRoot(absolute)

  return publicRoot
    ? { url: `/${relative(publicRoot, absolute).split(sep).join('/')}`, inferred: true }
    : { url: `/${basename(absolute)}`, inferred: false }
}
