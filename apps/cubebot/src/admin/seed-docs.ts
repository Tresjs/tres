import type { Context } from 'hono'
import { generateEmbedding } from '../ai/rag'

interface Env {
  DB: D1Database
  AI: Ai
  ADMIN_SECRET?: string
}

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
  const sections = text.split(/(?=^#{1,2}\s)/m)

  for (const section of sections) {
    if (section.trim().length < 50) continue

    const titleMatch = section.match(/^#{1,2}\s+(.+)$/m)
    const title = titleMatch?.[1] ?? 'Untitled'

    // Extract URL if present in the section
    const urlMatch = section.match(/https?:\/\/[^\s)]+/)
    const url = urlMatch?.[0] ?? baseUrl

    chunks.push({
      source,
      url,
      title: title.trim(),
      content: section.slice(0, 2000),
    })
  }

  return chunks
}

export async function handleSeedDocs(
  c: Context<{ Bindings: Env }>,
): Promise<Response> {
  // Optional: protect with secret
  const authHeader = c.req.header('Authorization')
  if (c.env.ADMIN_SECRET && authHeader !== `Bearer ${c.env.ADMIN_SECRET}`) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const results: string[] = []

  // Clear existing docs
  await c.env.DB.prepare('DELETE FROM doc_chunks').run()
  results.push('Cleared existing docs')

  // Fetch and process each source
  for (const source of DOC_SOURCES) {
    const chunks = await fetchDocs(source)
    results.push(`Fetched ${chunks.length} chunks from ${source.name}`)

    // Generate embeddings and insert
    for (const chunk of chunks) {
      try {
        const embedding = await generateEmbedding(c.env.AI, `${chunk.title} ${chunk.content}`)

        await c.env.DB.prepare(
          'INSERT INTO doc_chunks (source, url, title, content, embedding) VALUES (?, ?, ?, ?, ?)',
        )
          .bind(
            chunk.source,
            chunk.url,
            chunk.title,
            chunk.content,
            JSON.stringify(embedding),
          )
          .run()
      }
      catch (error) {
        console.error(`Failed to embed chunk: ${chunk.title}`, error)
      }
    }

    results.push(`Embedded ${chunks.length} chunks from ${source.name}`)
  }

  // Get total count
  const { results: countResult } = await c.env.DB.prepare('SELECT COUNT(*) as count FROM doc_chunks').all()
  const totalCount = (countResult?.[0] as { count: number })?.count ?? 0

  return c.json({
    success: true,
    results,
    totalChunks: totalCount,
  })
}
