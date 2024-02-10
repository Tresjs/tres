# Nuxt module `@tresjs/nuxt`

![TresJS Nuxt Module](/nuxt-stones.png)

<a href="https://www.npmjs.com/package/@tresjs/nuxt"><img src="https://img.shields.io/npm/v/@tresjs/nuxt/latest?color=%2382DBCA" alt="npm package"></a>

Hier ist das offizielle Nuxt-Modul für TresJS! 🎉.

Das Repository findest du [hier](https://github.com/Tresjs/nuxt).

## Instalación

::: code-group

```bash [pnpm]
pnpm add three @tresjs/nuxt
```

```bash [npm]
npm install three @tresjs/nuxt
```

```bash [yarn]
yarn add three @tresjs/nuxt
```

:::

## Eigenschaften

- 🤓 Automatischer Import von Komponenten und Composables aus dem [TresJS-Ökosystem](https://github.com/orgs/Tresjs/repositories)
- `TresCanvas` ist nur auf dem Client verfügbar, es ist nicht notwendig, `.client` zum Namen der Komponente hinzuzufügen oder `<ClientOnly />` zu verwenden
- Konfiguriert automatisch den Vue-Compiler, um TresJS-Komponenten zu unterstützen, siehe [warum](/de/guide/troubleshooting.html#failed-resolve-component-trescomponent-%F0%9F%A4%94)?
- All die DX-Magie, die mit Nuxt kommt ✨

## Verwendung

Füge `@tresjs/nuxt` zum Abschnitt `modules` in `nuxt.config.ts` hinzu

```js
export default defineNuxtConfig({
  modules: ['@tresjs/nuxt'],
})
```

Das ist alles! Jetzt kannst du `@tresjs/nuxt` in deiner Nuxt-Anwendung verwenden ✨

Wenn du irgendwelche Pakete aus dem TresJS-Ökosystem verwenden möchtest, kannst du die gewünschten Pakete installieren und sie werden automatisch vom Modul importiert 🧙🏼‍♂️.

| Package                     | Version                                                                                            |
| --------------------------- | :------------------------------------------------------------------------------------------------- |
| [Cientos](https://github.com/Tresjs/cientos) | ![cientos version](https://img.shields.io/npm/v/@tresjs/cientos/latest.svg?label=%20&color=%23f19b00) |
| [Post-processing](https://github.com/Tresjs/post-processing) | ![post-processing version](https://img.shields.io/npm/v/@tresjs/post-processing/latest.svg?label=%20&color=ff69b4) |

```bash
# Usando pnpm
pnpm add @tresjs/cientos @tresjs/post-processing
```