#!/usr/bin/env node
/**
 * Packs every publishable workspace package and asserts the resulting manifest contains no
 * local-only specifiers (`catalog:`, `workspace:`, `link:`, `file:`). Those must be rewritten
 * to real versions at pack/publish time; if any survive, the release would be installable
 * by nobody.
 *
 * Run: node tools/guards/check-tarball-specifiers.mjs
 */

import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, readdirSync, rmSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '../..')
const PACKAGE_DIRS = ['packages', 'tools']
const DEP_FIELDS = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']
const BAD_SPECIFIER = /^(?:catalog:|workspace:|link:|file:)/

function publishablePackages() {
  const found = []
  for (const parent of PACKAGE_DIRS) {
    const parentPath = join(ROOT, parent)
    if (!existsSync(parentPath)) { continue }
    for (const dir of readdirSync(parentPath)) {
      const manifestPath = join(parentPath, dir, 'package.json')
      if (!existsSync(manifestPath)) { continue }
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
      if (manifest.private) { continue }
      found.push({ name: manifest.name, dir: join(parentPath, dir) })
    }
  }
  return found.sort((a, b) => a.name.localeCompare(b.name))
}

function packedManifest(pkg, destination) {
  const stdout = execFileSync('pnpm', ['pack', '--pack-destination', destination], {
    cwd: pkg.dir,
    encoding: 'utf8',
  })
  const tarball = stdout.trim().split('\n').pop().trim()
  const raw = execFileSync('tar', ['-xzOf', tarball, 'package/package.json'], { encoding: 'utf8' })
  return JSON.parse(raw)
}

const packages = publishablePackages()
if (!packages.length) {
  console.error('✖ No publishable packages found — the check would pass vacuously.')
  process.exit(1)
}

const scratch = mkdtempSync(join(tmpdir(), 'tres-tarball-check-'))
const violations = []

try {
  for (const pkg of packages) {
    const manifest = packedManifest(pkg, scratch)
    for (const field of DEP_FIELDS) {
      for (const [dep, range] of Object.entries(manifest[field] ?? {})) {
        if (BAD_SPECIFIER.test(range)) {
          violations.push(`${pkg.name} → ${field}.${dep} = "${range}"`)
        }
      }
    }
    console.log(`${violations.length ? '·' : '✓'} ${pkg.name}`)
  }
}
finally {
  rmSync(scratch, { recursive: true, force: true })
}

if (violations.length) {
  console.error(`\n✖ Unresolved local specifiers in packed manifests:\n${violations.map(v => `  ${v}`).join('\n')}\n`)
  console.error('These would ship to npm as-is and break every consumer install.')
  process.exit(1)
}

console.log('\n✓ All publishable packages pack with resolved specifiers.')
