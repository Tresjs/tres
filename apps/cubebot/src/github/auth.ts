import { Octokit } from 'octokit'

interface TokenCache {
  token: string
  expiresAt: number
}

const tokenCache = new Map<number, TokenCache>()

function createJWT(appId: string, privateKey: string): string {
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iat: now - 60,
    exp: now + 600,
    iss: appId,
  }

  // For Workers, we need to use a simple JWT implementation
  // In production, consider using a proper JWT library
  const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const body = btoa(JSON.stringify(payload))

  // Note: This is a placeholder - actual RS256 signing requires
  // crypto.subtle with the private key imported
  return `${header}.${body}.signature`
}

export async function getInstallationOctokit(
  appId: string,
  privateKey: string,
  installationId: number,
): Promise<Octokit> {
  const cached = tokenCache.get(installationId)
  if (cached && cached.expiresAt > Date.now() + 60000) {
    return new Octokit({ auth: cached.token })
  }

  const jwt = createJWT(appId, privateKey)
  const appOctokit = new Octokit({ auth: jwt })

  const { data } = await appOctokit.rest.apps.createInstallationAccessToken({
    installation_id: installationId,
  })

  tokenCache.set(installationId, {
    token: data.token,
    expiresAt: new Date(data.expires_at).getTime(),
  })

  return new Octokit({ auth: data.token })
}
