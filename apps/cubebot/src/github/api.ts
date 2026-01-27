import type { Octokit } from 'octokit'

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

export async function convertToDiscussion(
  octokit: Octokit,
  owner: string,
  repo: string,
  issueNumber: number,
): Promise<string | null> {
  try {
    // First get the issue node ID
    const { data: issue } = await octokit.rest.issues.get({
      owner,
      repo,
      issue_number: issueNumber,
    })

    // Get discussion categories via GraphQL
    const categoriesQuery = `
      query($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          discussionCategories(first: 10) {
            nodes {
              id
              name
            }
          }
        }
      }
    `

    const categoriesResult = await octokit.graphql<{
      repository: {
        discussionCategories: {
          nodes: Array<{ id: string, name: string }>
        }
      }
    }>(categoriesQuery, { owner, repo })

    const categories = categoriesResult.repository.discussionCategories.nodes
    const ideasCategory = categories.find(c =>
      c.name.toLowerCase().includes('idea'),
    ) ?? categories[0]

    if (!ideasCategory) {
      console.error('No discussion category found')
      return null
    }

    // Convert issue to discussion
    const convertQuery = `
      mutation($issueId: ID!, $categoryId: ID!) {
        convertIssueToDiscussion(input: {
          issueId: $issueId,
          categoryId: $categoryId
        }) {
          discussion {
            url
          }
        }
      }
    `

    const result = await octokit.graphql<{
      convertIssueToDiscussion: { discussion: { url: string } }
    }>(convertQuery, {
      issueId: issue.node_id,
      categoryId: ideasCategory.id,
    })

    return result.convertIssueToDiscussion.discussion.url
  }
  catch (error) {
    console.error('Failed to convert issue to discussion:', error)
    return null
  }
}
