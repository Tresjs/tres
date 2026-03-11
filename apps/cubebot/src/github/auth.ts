import { createAppAuth } from '@octokit/auth-app'
import { Octokit } from 'octokit'

interface TokenCache {
  token: string
  expiresAt: number
}

const tokenCache = new Map<number, TokenCache>()

export async function getInstallationOctokit(
  appId: string,
  privateKey: string,
  installationId: number,
): Promise<Octokit> {
  const cached = tokenCache.get(installationId)
  if (cached && cached.expiresAt > Date.now() + 60000) {
    return new Octokit({ auth: cached.token })
  }

  const auth = createAppAuth({
    appId,
    privateKey,
    installationId,
  })

  const { token, expiresAt } = await auth({ type: 'installation' })

  tokenCache.set(installationId, {
    token,
    expiresAt: new Date(expiresAt).getTime(),
  })

  return new Octokit({ auth: token })
}
