import type { Octokit } from 'octokit'

const TRESJS_ORG = 'Tresjs'

export async function isOrgMember(
  octokit: Octokit,
  username: string,
): Promise<boolean> {
  try {
    await octokit.rest.orgs.checkMembershipForUser({
      org: TRESJS_ORG,
      username,
    })
    return true
  }
  catch {
    return false
  }
}

export async function addComment(
  octokit: Octokit,
  owner: string,
  repo: string,
  issueNumber: number,
  body: string,
): Promise<void> {
  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body,
  })
}

export async function addLabels(
  octokit: Octokit,
  owner: string,
  repo: string,
  issueNumber: number,
  labels: string[],
): Promise<void> {
  if (labels.length === 0) return

  await octokit.rest.issues.addLabels({
    owner,
    repo,
    issue_number: issueNumber,
    labels,
  })
}

export async function closeIssueAsFeatureRequest(
  octokit: Octokit,
  owner: string,
  repo: string,
  issueNumber: number,
): Promise<string> {
  // Close the issue with "not planned" reason
  await octokit.rest.issues.update({
    owner,
    repo,
    issue_number: issueNumber,
    state: 'closed',
    state_reason: 'not_planned',
  })

  // Return the discussions URL for the repo
  return `https://github.com/${owner}/${repo}/discussions/new?category=ideas`
}
