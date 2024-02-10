# Nuxt module `@tresjs/nuxt`

![TresJS Nuxt Module](/nuxt-stones.png)

<a href="https://www.npmjs.com/package/@tresjs/nuxt"><img src="https://img.shields.io/npm/v/@tresjs/nuxt/latest?color=%2382DBCA" alt="npm package"></a>

Oficjalny moduł Nuxt dla TresJS jest już dostępny! 🎉.

Repozytorium znajduje się [tutaj](https://github.com/Tresjs/nuxt)

## Instalacja

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

## Zalety

- 🤓 Automatyczne importowanie komponentów i komponowalnych elementów z [ekosystemu TresJS](https://github.com/orgs/Tresjs/repositories)
- `TresCanvas` jest dostępny tylko po stronie klienta, nie trzeba dodawać .client do nazwy komponentu ani `<ClientOnly />`
- Automatyczna konfiguracja kompilatora Vue w celu obsługi komponentów TresJS, zobacz [dlaczego](/guide/troubleshooting.html#failed-resolve-component-trescomponent-%F0%9F%A4%94)?
- Cała magia związana z DX, która jest dostępna w Nuxt ✨

## Użycie

Dodaj `@tresjs/nuxt` do sekcji `modules` w pliku `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["@tresjs/nuxt"],
});
```

To wszystko! Teraz możesz korzystać z `@tresjs/nuxt` w swojej aplikacji Nuxt ✨

Jeśli chcesz używać pakietów z ekosystemu TresJS, możesz zainstalować wybrane pakiety, a moduł automatycznie je zaimportuje 🧙🏼‍♂️.

| Package                                                      | Version                                                                                                            |
| ------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------- |
| [Cientos](https://github.com/Tresjs/cientos)                 | ![cientos version](https://img.shields.io/npm/v/@tresjs/cientos/latest.svg?label=%20&color=%23f19b00)              |
| [Post-processing](https://github.com/Tresjs/post-processing) | ![post-processing version](https://img.shields.io/npm/v/@tresjs/post-processing/latest.svg?label=%20&color=ff69b4) |

```bash
# Usando pnpm
pnpm add @tresjs/cientos @tresjs/post-processing
```
