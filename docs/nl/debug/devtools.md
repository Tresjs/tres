# Devtools

Een van de moeilijkste dingen waarmee een ontwikkelaar wordt geconfronteerd bij het maken van 3D-ervaringen in de browser, is het debuggen. Het browser `canvas` is een zwarte doos en het is moeilijk om te weten wat er binnenin gebeurt. Het imperatieve karakter van [ThreeJS](https://threejs.org/) maakt het ongelooflijk moeilijk om fouten op te sporen, omdat je afhankelijk bent van `console.log` om te zien wat er aan de hand is, of van een derde partij om de scène te verfijnen en te inspecteren.

Laat me niet beginnen met het controleren van de uitvoering van uw scène. 😱

![developer debugging 3D](/debug-3D.png)

Een van onze doelen met TresJS is om **de beste DX (Developer Experience)** te bieden bij het omgaan met 3D-scènes in de browser. Dankzij het declaratieve karakter van het ecosysteem plus de verscheidenheid aan oplossingen die het Vue-ecosysteem biedt, zoals de Vue Devtools, Nuxt en Vite, kunnen we ontwikkelaars een betere tool bieden om hun scènes te debuggen.

## Introductie van de Devtools

Vanaf <Badge text="^3.7.0" /> introduceren we TresJS Devtools, een aangepast infotabblad voor de [Official Vue Chrome Devtools](https://devtools.vuejs.org/guide/installation.html) Hiermee kunt u uw TresJS-scènes en componenten inspecteren.

![TresJS Devtools](/vue-chrome-devtools.png)

### Functionaliteiten

- **Scene Inspector**: inspecteer de huidige scène en de componenten ervan met behulp van een boomstructuur vergelijkbaar met de componentinspecteur van Vue Devtools.
- **Memory Allocation**: zie hoeveel geheugen door de componenten wordt verbruikt.
- **Object Inspector**: inspecteer de eigenschappen van het geselecteerde object in de scène, inclusief de onderliggende objecten.
- **Editable Properties**: En ja, u kunt de eigenschappen van het geselecteerde object bewerken en de wijzigingen in realtime bekijken.

![](/devtools-scene-inspector.png)

Geniet van de nieuwe Devtools en laat ons weten wat je ervan vindt! 🎉
