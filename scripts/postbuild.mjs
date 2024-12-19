import { readdir, readFile, writeFile } from 'node:fs/promises'

/**
 * Adds `.js` when importing the ./src/index.js in the dts
 *
 * @return {Promise<void>}
 */
async function patchRootDts() {
  const dts = 'dist/index.d.ts'
  const content = await readFile(dts, 'utf8')
  await writeFile(dts, content.replaceAll('./src/index\'', './src/index.js\''))
}

/**
 * Fix node16 issue: https://www.typescriptlang.org/tsconfig/#allowArbitraryExtensions
 * - node10 and bundler will check for d.vue.ts and vue.d.ts file when importing a vue file in a dts
 * - node16 will check only for d.vue.ts file, this function will just copy/paste the content of vue.d.ts to d.vue.ts
 *
 * @param path {String}
 * @return {Promise<void>}
 */
async function patchVueDts(path) {
  const files = await readdir(path, { recursive: false })
  for (const file of files) {
    if (file.endsWith('.vue.d.ts')) {
      await writeFile(`${path}/${file.replace('.vue.d.ts', '.d.vue.ts')}`, await readFile(`${path}/${file}`, 'utf-8'), 'utf-8')
    }
  }
}

async function fixNode16() {
  await Promise.all([
    patchRootDts(),
    patchVueDts('dist/src/components'),
    patchVueDts('dist/src/composables/useLoader'),
    patchVueDts('dist/src/composables/useTexture'),
  ])
}

fixNode16()
