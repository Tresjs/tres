# v-always-look-at 👀

Con la nueva directiva `v-always-look-at` proporcionada por **TresJS**, puedes agregar fácilmente un comando [Object3D](https://tresjs.org/docs/index.html?q=object#api/en /core/Object3D) para mirar siempre una posición específica, esto podría pasarse como Vector3 o Array.

## Uso

<DirectiveVAlwaysLookAtUsageCode />

No importa dónde se mueva la caja, siempre se observará la posición [0,0,0]

### ¿Por qué no utilizar el método integrado de revisión?

Podrías preguntar, esto está bien, pero puedo usar el método `:look-at` directamente en el componente, ¿por qué debería necesitar esto?

La respuesta es que con el método `:look-at` se te indicará mirar esa posición solo una vez, cuando la instancia esté montada, luego si el objeto cambia esto no se actualizará.

### ¡Puedes observar otra instancia también!

Otra ventaja es que puedes observar una instancia en movimiento, por ejemplo con la cámara, así:

<DirectiveVAlwaysLookAtExampleCode />
