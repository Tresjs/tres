import type { DocChunk } from '../types'

export async function generateEmbedding(
  ai: Ai,
  text: string,
): Promise<number[]> {
  const result = await ai.run('@cf/baai/bge-base-en-v1.5', {
    text: [text],
  })

  if (!('data' in result) || !result.data || result.data.length === 0) {
    throw new Error('Failed to generate embedding')
  }

  return result.data[0]
}

export async function generateEmbeddingsBatch(
  ai: Ai,
  texts: string[],
): Promise<number[][]> {
  if (texts.length === 0) return []

  // Workers AI supports batching - process up to 100 at once
  const batchSize = 100
  const allEmbeddings: number[][] = []

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize)
    const result = await ai.run('@cf/baai/bge-base-en-v1.5', {
      text: batch,
    })

    if (!('data' in result) || !result.data) {
      throw new Error('Failed to generate embeddings batch')
    }

    allEmbeddings.push(...result.data)
  }

  return allEmbeddings
}

export async function searchDocs(
  db: D1Database,
  ai: Ai,
  query: string,
  limit: number = 5,
): Promise<DocChunk[]> {
  const queryEmbedding = await generateEmbedding(ai, query)

  // D1 doesn't have native vector search, so we fetch a capped subset and compute in-memory
  // For production scale, consider Vectorize or external vector DB
  const { results } = await db
    .prepare('SELECT * FROM doc_chunks LIMIT 1000')
    .all<DocChunk>()

  if (!results || results.length === 0) {
    return []
  }

  // Compute cosine similarity
  const scored = results.map((chunk) => {
    const embedding = JSON.parse(chunk.embedding) as number[]
    const similarity = cosineSimilarity(queryEmbedding, embedding)
    return { chunk, similarity }
  })

  // Sort by similarity descending
  scored.sort((a, b) => b.similarity - a.similarity)

  return scored.slice(0, limit).map(s => s.chunk)
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0

  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }

  const magnitude = Math.sqrt(normA) * Math.sqrt(normB)
  return magnitude === 0 ? 0 : dotProduct / magnitude
}
