# Tres Leches docs

Documentation site for [`@tresjs/leches`](../../packages/leches), the tweak-panel GUI for Vue. Live at https://tresleches.tresjs.org.

Built with Nuxt 4, Nuxt UI and Nuxt Content. The pages use live demos of the local `@tresjs/leches` workspace package, so changes to the package show up in the docs during development.

## Development

From the repository root:

```bash
pnpm install
pnpm nx run tresleches-docs:dev
```

Other targets: `build`, `generate`, `preview`, `lint`, `typecheck`.

## Structure

- `content/`: markdown pages (Getting Started, Guide, API Reference). Numbered prefixes set the order.
- `app/components/content/demos/`: live demos used in markdown as `::demo-<name>`.
- `nuxt.config.ts`: modules, prerendering and the `/llms.txt` sections.

## License

MIT
