# Devtools

Una delle cose più difficili che uno sviluppatore deve affrontare quando crea esperienze 3D nel browser è il debug. Il browser `canvas` è una scatola nera, ed è difficile sapere cosa sta succedendo all'interno. Uno sviluppatore potrebbe fare affidamento su una serie di strumenti `console.log`o di terze parti solo per ispezionare la scena.

Non farmi iniziare a controllare la tua scena. 😱

![developer debugging 3D](/debug-3D.png)

Uno dei nostri obiettivi con TresJS è offrire **la migliore DX (Developer Experience)** quando si tratta di scene 3D sul browser. Grazie alla natura dichiarativa dell'ecosistema e alla varietà di soluzioni offerte dall'ecosistema Vue, come Vue Devtools, Nuxt e Vite, possiamo offrire agli sviluppatori una migliore attrezzatura per il debug delle loro scene.

## Introduzione ai Devtools

Da <Badge text=" 3.7.0" /> presentiamo TresJS Devtools, una scheda di ispezione personalizzata per [Official Vue Chrome Devtools](https://devtools.vuejs.org/guide/installation.html) che consente di ispezionare le scene e i componenti TresJS.

![TresJS Devtools](/vue-chrome-devtools.png)

### Features

- **Ispettore di scena**: Ispeziona la scena attuale e i suoi componenti usando una vista ad albero simile a quella dell'ispettore di componenti Vue Devtools.
- **Allocazione della memoria**: Verificare la quantità di memoria consumata dai componenti.
- **Object Inspector**: Controlla le proprietà dell'oggetto selezionato nella scena, inclusi i suoi figli.
- **Proprietà modificabili**: E sì, è possibile modificare le proprietà dell'oggetto selezionato e vedere le modifiche in tempo reale.

![](/devtools-scene-inspector.png)

Godetevi i nuovi Devtools e fateci sapere cosa ne pensate! 🎉
