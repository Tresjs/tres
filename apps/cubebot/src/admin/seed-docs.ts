import type { Context } from 'hono'
import { generateEmbeddingsBatch } from '../ai/rag'

interface Env {
  DB: D1Database
  AI: Ai
  ADMIN_SECRET?: string
}

const DOC_SOURCES: Record<string, { name: string, url: string }> = {
  core: { name: 'core', url: 'https://docs.tresjs.org/llms-full.txt' },
  cientos: { name: 'cientos', url: 'https://cientos.tresjs.org/llms-full.txt' },
  postprocessing: { name: 'postprocessing', url: 'https://post-processing.tresjs.org/llms-full.txt' },
}

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

  // Get source from query param - seed one at a time to avoid subrequest limits
  const sourceKey = c.req.query('source')
  const clearAll = c.req.query('clear') === 'true'

  if (!sourceKey) {
    return c.json({
      error: 'Missing source param',
      usage: '/admin/seed-docs?source=core|cientos|postprocessing',
      hint: 'Add &clear=true on first call to clear existing docs',
    }, 400)
  }

  const source = DOC_SOURCES[sourceKey]
  if (!source) {
    return c.json({
      error: `Unknown source: ${sourceKey}`,
      available: Object.keys(DOC_SOURCES),
    }, 400)
  }

  const results: string[] = []

  // Only clear if explicitly requested
  if (clearAll) {
    await c.env.DB.prepare('DELETE FROM doc_chunks').run()
    results.push('Cleared all existing docs')
  }
  else {
    // Clear only this source
    await c.env.DB.prepare('DELETE FROM doc_chunks WHERE source = ?').bind(sourceKey).run()
    results.push(`Cleared existing ${sourceKey} docs`)
  }

  // Fetch the single source
  const chunks = await fetchDocs(source)
  results.push(`Fetched ${chunks.length} chunks from ${source.name}`)

  if (chunks.length === 0) {
    return c.json({ success: true, results, totalChunks: 0 })
  }

  // Generate all embeddings in batches (reduces subrequests)
  const texts = chunks.map(chunk => `${chunk.title} ${chunk.content}`)
  let embeddings: number[][] = []

  try {
    embeddings = await generateEmbeddingsBatch(c.env.AI, texts)
    results.push(`Generated ${embeddings.length} embeddings`)
  }
  catch (error) {
    console.error('Failed to generate embeddings:', error)
    return c.json({ success: false, error: 'Embedding generation failed', results }, 500)
  }

  // Insert all chunks with embeddings
  let insertedCount = 0
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]
    const embedding = embeddings[i]

    if (!embedding) continue

    try {
      await c.env.DB.prepare(
        'INSERT INTO doc_chunks (source, url, title, content, embedding) VALUES (?, ?, ?, ?, ?)',
      )
        .bind(chunk.source, chunk.url, chunk.title, chunk.content, JSON.stringify(embedding))
        .run()
      insertedCount++
    }
    catch (error) {
      console.error(`Failed to insert chunk: ${chunk.title}`, error)
    }
  }

  results.push(`Inserted ${insertedCount} chunks into database`)

  // Get total count
  const { results: countResult } = await c.env.DB.prepare('SELECT COUNT(*) as count FROM doc_chunks').all()
  const totalCount = (countResult?.[0] as { count: number })?.count ?? 0

  return c.json({
    success: true,
    results,
    totalChunks: totalCount,
  })
}
