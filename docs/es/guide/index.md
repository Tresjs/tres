# Introduccion

<ClientOnly>
    <div style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;">
      <FirstScene />
    </div>
</ClientOnly>

<GuideInstall />

## Typescript

TresJS está escrito en Typescript y está completamente tipado. Si estás utilizando Typescript, obtendrás todos los beneficios de los tipos. Solo asegúrate de instalar los tipos para three.

<GuideInstallTypescript />

## Vite

Si estás utilizando Vite, debes agregar lo siguiente a tu `vite.config.ts`:

<GuideVite />

Esto es necesario para que el compilador de plantillas funcione con el renderizador personalizado y no lance advertencias en la consola. Para obtener más información, consulta [aquí](/guide/troubleshooting.html).

## Pruébalo en línea

### Sandbox

Puedes probar TresJS en línea utilizando el [sandbox](https://play.tresjs.org/) oficial. ¡Échale un vistazo:

<iframe src="https://play.tresjs.org/" class="w-full rounded shadow-lg outline-none border-none aspect-4/3"></iframe>

### StackBlitz

Tenemos un nuevo inicio de [StackBlitz](https://stackblitz.com/) para probar TresJS en línea. ¡Échale un vistazo:

![](/stackblitz-starter.png)

<StackBlitzEmbed projectId="tresjs-basic" />

## Playground

También tenemos un playground donde puedes probar TresJS en línea. Échale un vistazo [aquí](https://playground.tresjs.org/).

![](/playground.png)

## Motivación

[ThreeJS](https://threejs.org/) es una maravillosa biblioteca para crear increíbles sitios web 3D con WebGL. También es una biblioteca constantemente actualizada que dificulta a los mantenedores de envoltorios como [TroisJS](https://troisjs.github.io/) mantenerse al día con todas las mejoras.

El ecosistema de React tiene una solución impresionante de **renderizado personalizado** llamada [React-three-fiber](https://docs.pmnd.rs/react-three-fiber) que te permite construir tus escenas de forma declarativa con componentes reutilizables y autocontenidos que reaccionan al estado.

En mi búsqueda de algo similar en el ecosistema de VueJS, encontré esta increíble biblioteca llamada [Lunchbox](https://github.com/breakfast-studio/lunchboxjs) que funciona con el mismo concepto que R3F, proporciona un [renderizador personalizado de Vue3](https://vuejs.org/api/custom-renderer.html). También estoy contribuyendo para mejorar esta biblioteca y que sea tan madura y rica en características como R3F.

El único problema es que mezclar compiladores y renderizadores en Vue 3 es algo en lo que la comunidad de Vue todavía está trabajando. Puedes ver más información [aquí](https://github.com/vuejs/vue-loader/pull/1645).

<GuideLunchbox />

Así que me inspiré en ambas bibliotecas para crear un renderizador personalizado de Vue para ThreeJS. Eso es **TresJS v2**.

