import { readdirSync, statSync } from 'fs'
import path from 'path'
import type { ComponentDoc } from 'vue-docgen-api'
import { parse as vueDocsParse } from 'vue-docgen-api'
import MarkdownIt from 'markdown-it'

function walkDirSync(dir: string): string[] {
  try {
    if (!statSync(dir).isDirectory()) {
      return []
    }
  }
  catch {
    console.error(`${dir} was not found`)
    return []
  }

  const dirs: string[] = [dir]
  const files: string[] = []
  while (dirs.length) {
    const dir = dirs.pop()
    if (!dir) continue
    readdirSync(dir).forEach((dirOrFile) => {
      const p = path.join(dir, dirOrFile)
      if (statSync(p).isDirectory()) {
        dirs.push(p)
      }
      else {
        files.push(p)
      }
    })
  }
  return files
}

function getVueFilesInDir(dir: string) {
  return walkDirSync(dir).filter(s => s.endsWith('.vue'))
}

const filePaths = getVueFilesInDir('src')
const propsInfos: Record<string, ComponentDoc> = {}
const md = new MarkdownIt()
for (const filePath of filePaths) {
  const ci: ComponentDoc = await vueDocsParse(filePath)
  ci.props?.map(p => p.description = md.render(p.description || ''))
  propsInfos[filePath] = ci
}

export default {
  load() {
    return {
      data: propsInfos,
    }
  },
}
