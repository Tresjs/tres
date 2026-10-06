# AGENTS.md

Docs site for `@tresjs/leches`, built with Nuxt 4, Nuxt UI and Nuxt Content. Deployed to https://leches.tresjs.org. The Nx project name is `tresleches-docs` (from `package.json`), not the folder name.

## Vocabulary

Write prose with the terms in `packages/leches/CONTEXT.md` and treat its _Avoid_ lists as banned. The real API still uses `uuid` for the Panel id: keep `uuid` in code, props and option names, and say "panel id" in prose.

## Live demos

Every control example in `content/` pairs a code block with a live demo from `app/components/content/demos/`, used in markdown as `::demo-<name>`. Each demo:

- Registers its controls with a panel id unique to that demo (`{ uuid: 'demo-<name>' }`). Demos share one page and one controls store, so a reused id merges their controls.
- Renders through `DemoPanel`, which mounts `<TresLeches>` inline with `:float="false"`. Only multi-panel demos (`DemoPanels`, `DemoThemeCompare`) mount `<TresLeches>` directly, still with `:float="false"`, so the panel stays inside the page and does not float over it.

## Adding a content section

`nuxt.config.ts` lists each content folder under `llms.sections` by path. A new top-level folder in `content/` needs a matching entry there, or it is missing from `/llms.txt` and `/llms-full.txt`.
