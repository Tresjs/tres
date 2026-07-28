import { readFile, stat } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'

export interface ProjectInfo {
  /** Nearest dir up-tree containing package.json (or cwd, if none found). */
  root: string
  packageManager: 'pnpm' | 'npm' | 'yarn' | 'bun' | null
  framework: 'nuxt' | 'vite' | null
  configFiles: { vite?: string, nuxt?: string, tsconfig?: string }
  /** Declared ranges for `three` and `@tresjs/*` deps, as written in package.json. */
  versions: Record<string, string>
}

interface PackageJsonShape {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

const LOCKFILE_MANAGERS: Array<[file: string, manager: NonNullable<ProjectInfo['packageManager']>]> = [
  ['pnpm-lock.yaml', 'pnpm'],
  ['yarn.lock', 'yarn'],
  // `bun.lock` is the text lockfile Bun >=1.2 writes by default; `bun.lockb` is the legacy binary one.
  ['bun.lock', 'bun'],
  ['bun.lockb', 'bun'],
  ['package-lock.json', 'npm'],
]

const NUXT_CONFIG_CANDIDATES = ['nuxt.config.ts', 'nuxt.config.js', 'nuxt.config.mjs']
const VITE_CONFIG_CANDIDATES = ['vite.config.ts', 'vite.config.js', 'vite.config.mts', 'vite.config.mjs']

async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path)
    return true
  }
  catch {
    return false
  }
}

async function findRoot(cwd: string): Promise<string | null> {
  let dir = cwd

  while (true) {
    if (await fileExists(join(dir, 'package.json'))) {
      return dir
    }
    const parent = dirname(dir)
    if (parent === dir) {
      return null
    }
    dir = parent
  }
}

async function readPackageJson(root: string): Promise<PackageJsonShape> {
  try {
    const content = await readFile(join(root, 'package.json'), 'utf-8')
    return JSON.parse(content) as PackageJsonShape
  }
  catch {
    // A missing file and a malformed one both land here and are treated as empty.
    // `doctor` will likely want to tell those apart and surface "unparseable
    // package.json" as its own diagnostic instead of silently reporting "no deps".
    return {}
  }
}

async function detectPackageManager(root: string): Promise<ProjectInfo['packageManager']> {
  for (const [file, manager] of LOCKFILE_MANAGERS) {
    if (await fileExists(join(root, file))) {
      return manager
    }
  }
  return null
}

async function findFirstExisting(root: string, candidates: string[]): Promise<string | undefined> {
  for (const candidate of candidates) {
    const path = join(root, candidate)
    if (await fileExists(path)) {
      return path
    }
  }
  return undefined
}

async function detectConfigFiles(root: string): Promise<ProjectInfo['configFiles']> {
  const configFiles: ProjectInfo['configFiles'] = {}

  const nuxt = await findFirstExisting(root, NUXT_CONFIG_CANDIDATES)
  if (nuxt) {
    configFiles.nuxt = nuxt
  }

  const vite = await findFirstExisting(root, VITE_CONFIG_CANDIDATES)
  if (vite) {
    configFiles.vite = vite
  }

  const tsconfig = join(root, 'tsconfig.json')
  if (await fileExists(tsconfig)) {
    configFiles.tsconfig = tsconfig
  }

  return configFiles
}

function hasDependency(pkg: PackageJsonShape, name: string): boolean {
  return Boolean(pkg.dependencies?.[name] || pkg.devDependencies?.[name])
}

function detectFramework(pkg: PackageJsonShape, configFiles: ProjectInfo['configFiles']): ProjectInfo['framework'] {
  // Nuxt wins when both match, since a Nuxt project also has Vite underneath.
  if (hasDependency(pkg, 'nuxt') || configFiles.nuxt) {
    return 'nuxt'
  }
  if (configFiles.vite) {
    return 'vite'
  }
  return null
}

function detectVersions(pkg: PackageJsonShape): Record<string, string> {
  const versions: Record<string, string> = {}
  // On a name clash between blocks, the runtime dependency wins over devDependencies.
  const deps = { ...pkg.devDependencies, ...pkg.dependencies }

  for (const [name, range] of Object.entries(deps)) {
    if (name === 'three' || name.startsWith('@tresjs/')) {
      versions[name] = range
    }
  }

  return versions
}

export async function detectProject(cwd: string = process.cwd()): Promise<ProjectInfo> {
  const resolvedCwd = resolve(cwd)
  const root = await findRoot(resolvedCwd)

  if (!root) {
    return {
      root: resolvedCwd,
      packageManager: null,
      framework: null,
      configFiles: {},
      versions: {},
    }
  }

  const pkg = await readPackageJson(root)
  const configFiles = await detectConfigFiles(root)

  return {
    root,
    packageManager: await detectPackageManager(root),
    framework: detectFramework(pkg, configFiles),
    configFiles,
    versions: detectVersions(pkg),
  }
}
