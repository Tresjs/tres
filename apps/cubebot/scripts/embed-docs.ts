import { execSync } from 'node:child_process'

const DOC_SOURCES = [
  { name: 'core', url: 'https://docs.tresjs.org/llms-full.txt' },
  { name: 'cientos', url: 'https://cientos.tresjs.org/llms-full.txt' },
  { name: 'postprocessing', url: 'https://post-processing.tresjs.org/llms-full.txt' },
]

interface DocChunk {
  source: string
  url: string
  title: string
  content: string
}

async function fetchDocs(source: { name: string; url: string }): Promise<DocChunk[]> {
  console.log(`Fetching ${source.name} docs from ${source.url}...`)

  try {
    const response = await fetch(source.url)
    if (!response.ok) {
      console.warn(`Failed to fetch ${source.url}: ${response.status}`)
      return []
    }

    const text = await response.text()
    return parseDocsIntoChunks(source.name, source.url, text)
  }
  catch (error) {
    console.warn(`Error fetching ${source.url}:`, error)
    return []
  }
}

function parseDocsIntoChunks(source: string, baseUrl: string, text: string): DocChunk[] {
  const chunks: DocChunk[] = []

  // Split by headers (## or #)
  const sections = text.split(/(?=^#{1,2}\s)/m)

  for (const section of sections) {
    if (section.trim().length < 50) continue // Skip tiny sections

    const titleMatch = section.match(/^#{1,2}\s+(.+)$/m)
    const title = titleMatch?.[1] ?? 'Untitled'

    // Extract URL if present in the section
    const urlMatch = section.match(/https?:\/\/[^\s)]+/)
    const url = urlMatch?.[0] ?? baseUrl

    chunks.push({
      source,
      url,
      title: title.trim(),
      content: section.slice(0, 2000), // Limit chunk size
    })
  }

  return chunks
}

async function main() {
  console.log('Starting docs embedding process...\n')

  const allChunks: DocChunk[] = []

  for (const source of DOC_SOURCES) {
    const chunks = await fetchDocs(source)
    allChunks.push(...chunks)
    console.log(`  → ${chunks.length} chunks from ${source.name}`)
  }

  console.log(`\nTotal chunks: ${allChunks.length}`)

  // Write chunks to a JSON file for manual D1 import
  // In production, this would call Workers AI for embeddings
  const outputPath = 'apps/cubebot/data/doc-chunks.json'

  // Create data directory
  execSync('mkdir -p apps/cubebot/data')

  const fs = await import('node:fs')
  fs.writeFileSync(outputPath, JSON.stringify(allChunks, null, 2))

  console.log(`\nChunks written to ${outputPath}`)
  console.log('\nNext steps:')
  console.log('1. Run wrangler d1 execute to create the database')
  console.log('2. Use a separate script to generate embeddings via Workers AI')
  console.log('3. Import the embeddings into D1')
}

main().catch(console.error)
