# Outils de développement

L'une des tâches les plus difficiles auxquelles un développeur est confronté lors de la création d'expériences 3D dans le navigateur est le débogage. Le `canvas` du navigateur est une boite noire et il est difficile de savoir ce qui se passe à l’intérieur. La nature impérative de [ThreeJS](https://threejs.org/) rend le débogage incroyablement difficile, car il faut s'appuyer sur « console.log » pour voir ce qui se passe, ou sur des tiers pour ajuster et inspecter la scène.

Ne me demandez pas dans la vérification des performances de votre scène. 😱

![développeur débogage 3D](/debug-3D.png)

L'un de nos objectifs avec TresJS est d'offrir **la meilleure expérience de développement (DX)** lorsque vous travaillez avec des scènes 3D dans le navigateur. Grâce à la nature déclarative de l'écosystème et à la variété de solutions proposées par l'écosystème Vue, telles que Vue Devtools, Nuxt et Vite, nous pouvons offrir de meilleurs outils aux développeurs pour déboguer leurs scènes.

## Présentation des outils de développement

A partir de la version <Badge text="^3.7.0" />, nous introduisons TresJS Dev Tools, un onglet d'inspecteur personnalisé pour les [outils de développement officiels de Vue Chrome](https://devtools.vuejs.org/guide/installation.html) qui vous permet d'inspecter vos scènes et composants TresJS.

![Outils de développement TresJS](/vue-chrome-devtools.png)

### Caracteristique

- **Inspecteur de scène**: Inspectez la scène actuelle et ses composants à l'aide d'une arborescence similaire à l'inspecteur de composants de Vue Devtools.
- **Allocation de mémoire** : indique la quantité de mémoire utilisée par chaque composant.
- **Inspecteur d'objet** : Inspecte les propriétés de l'objet sélectionné dans la scène, y compris ses enfants.
- **Propriétés modifiables** : Et oui, vous pouvez modifier les propriétés de l'objet sélectionné et voir les modifications en temps réel.

![](/devtools-scene-inspector.png)

Profitez des nouveaux outils de développement et dites-nous ce que vous en pensez ! 🎉
