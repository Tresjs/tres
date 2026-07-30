#!/usr/bin/env node
/**
 * prepublishOnly guard.
 *
 * `npm publish` does not understand pnpm's `catalog:`/`workspace:` protocols, so publishing
 * with it ships unresolved specifiers that break every consumer install.
 * (@tresjs/rapier@1.0.0 shipped `"@dimforge/rapier3d-compat": "catalog:"` this way.)
 *
 * Escape hatch: TRES_SKIP_PUBLISH_GUARD=1
 */

const userAgent = process.env.npm_config_user_agent ?? ''
const isPnpm = /^pnpm\//.test(userAgent)

if (!isPnpm && process.env.TRES_SKIP_PUBLISH_GUARD !== '1') {
  const pkg = process.env.npm_package_name ?? 'this package'
  console.error(`
✖ Refusing to publish ${pkg} with a non-pnpm client (user agent: ${userAgent || 'unknown'}).

  This workspace uses pnpm catalogs. Only \`pnpm publish\` rewrites \`catalog:\` and
  \`workspace:\` specifiers into real versions; \`npm publish\` ships them verbatim and
  every consumer install fails with:

    "<dep>@catalog:" isn't supported by any available resolver

  Use instead:
    pnpm --filter ${pkg} publish --access public
    # or, for a full release:
    pnpm nx release publish

  Override (you had better be sure): TRES_SKIP_PUBLISH_GUARD=1
`)
  process.exit(1)
}
