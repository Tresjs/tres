import type { TriageResult } from '../types'

export function formatMaintainerComment(result: TriageResult): string {
  const reproStatus = result.hasReproduction ? '✅ Provided' : '❌ Missing'
  const sysInfoStatus = result.hasSystemInfo ? '✅ Provided' : '❌ Missing'
  const expectedStatus = result.hasExpectedBehavior ? '✅ Provided' : '❌ Missing'

  return `<details>
<summary>🧊 CubeBot Analysis</summary>

**Issue Type:** ${result.issueType === 'bug' ? 'Bug Report' : result.issueType === 'feature' ? 'Feature Request' : 'Unknown'}
**Package:** ${result.package ? `@tresjs/${result.package}` : 'Not detected'}
**Reproduction:** ${reproStatus}
**System Info:** ${sysInfoStatus}
**Expected Behavior:** ${expectedStatus}

**Summary:**
${result.summary}

${result.labelsToAdd.length > 0 ? `**Labels added:** ${result.labelsToAdd.map(l => `\`${l}\``).join(', ')}` : ''}

</details>`
}

export function formatAuthorComment(
  authorUsername: string,
  result: TriageResult,
  authorMessage: string,
  isOrgMember = false,
): string {
  const missingItems: string[] = []

  // Skip reproduction request for org members
  if (!result.hasReproduction && !isOrgMember) {
    missingItems.push(
      '- [ ] **Reproduction:** Please add a [StackBlitz](https://stackblitz.com/edit/tresjs-minimal-reproduction) or GitHub repo link',
    )
  }
  if (!result.hasSystemInfo) {
    missingItems.push(
      '- [ ] **System info:** Run `npx envinfo --system --npmPackages \'{vite,@tresjs/*,three,vue}\' --binaries --browsers` and paste the output',
    )
  }
  if (!result.hasExpectedBehavior) {
    missingItems.push(
      '- [ ] **Expected behavior:** Please describe what you expected to happen',
    )
  }

  const docsSection = result.suggestedDocs.length > 0
    ? `\n\n**📚 While you wait, these might help:**\n${result.suggestedDocs.map(d => `- [${d.title}](${d.url}) — ${d.reason}`).join('\n')}`
    : ''

  const missingSection = missingItems.length > 0
    ? `\n\nBefore a maintainer can dig in, could you help with a few things?\n\n${missingItems.join('\n')}`
    : `\n\n${authorMessage}`

  return `Hey @${authorUsername}! 🧊 Thanks for taking the time to report this!
${missingSection}${docsSection}

> 🤖 I'm an AI assistant and can make mistakes. A human is on the way!`
}

export function formatFeatureRedirectComment(
  authorUsername: string,
  newDiscussionUrl: string,
): string {
  return `Hey @${authorUsername}! 🧊

This looks like a feature request — awesome ideas belong in [Discussions](${newDiscussionUrl}) where the community can upvote and discuss!

I'm closing this issue, but please [create a discussion](${newDiscussionUrl}) so the community can weigh in. Thanks for contributing! 💚

> 🤖 I'm an AI assistant and can make mistakes.`
}
