# Narzędzia deweloperskie

Jednym z najtrudniejszych wyzwań, przed którym stoi programista tworząc doświadczenia 3D w przeglądarce, jest debugowanie. Element `canvas` przeglądarki to czarna skrzynka, trudno jest zrozumieć, co się dzieje w środku. Imperatywny charakter [ThreeJS](https://threejs.org/) sprawia, że jest to niezwykle trudne do debugowania, trzeba polegać na `console.log` aby zobaczyć, co się dzieje, lub używać narzędzi zewnętrznych do dostrojenia i sprawdzenia sceny.

Niech mnie nie zaczynają od sprawdzania wydajności twojej sceny. 😱

![deweloper debugujący 3D](/debug-3D.png)

Jednym z naszych celów przy tworzeniu TresJS jest zaoferowanie **najlepszego DX (Developer Experience)** przy pracy ze scenami 3D w przeglądarce. Dzięki deklaratywnemu charakterowi ekosystemu, a także różnym rozwiązaniom oferowanym przez ekosystem Vue, takim jak Vue Devtools, Nuxt i Vite, możemy zapewnić lepsze narzędzia dla programistów do debugowania ich scen.

## Przedstawiamy narzędzia deweloperskie

Od wersji <Badge text="^3.7.0" />, wprowadzamy narzędzia deweloperskie TresJS, dostosowaną zakładkę inspektora dla [ Oficjalnych narzędzi deweloperskich Chrome dla Vue](https://devtools.vuejs.org/guide/installation.html), które umożliwiają inspekcję scen i komponentów TresJS.

![Narzędzia deweloperskie TresJS](/vue-chrome-devtools.png)

### Funkcje

- **Inspektor Sceny**: Sprawdź bieżącą scenę i jej komponenty, korzystając z widoku drzewa podobnego do inspektora komponentów Vue Devtools.
- **Przydzielanie Pamięci**: Zobacz, ile pamięci zużywają komponenty.
- **Inspektor Obiektów**: Sprawdź właściwości wybranego obiektu w scenie, w tym jego dzieci.
- **Edytowalne właściwości**: I tak, możesz edytować właściwości wybranego obiektu i zobaczyć zmiany w czasie rzeczywistym.

![](/devtools-scene-inspector.png)

Ciesz się nowymi narzędziami deweloperskimi i daj nam znać, co o nich myślisz! 🎉
