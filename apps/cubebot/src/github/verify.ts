export async function verifyWebhookSignature(
  payload: string,
  signature: string | null | undefined,
  secret: string,
): Promise<boolean> {
  if (!signature) {
    return false
  }

  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payload),
  )

  const expectedSignature = `sha256=${Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')}`

  return signature === expectedSignature
}
