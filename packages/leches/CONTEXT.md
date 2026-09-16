# Leches

The tweak-panel GUI for Vue apps. It turns a plain object of values into live inputs so a scene can be adjusted while it runs.

## Language

### Controls

**Control**:
One tweakable value in the panel, with a key, label, type and a writable ref the app binds to.
_Avoid_: field, blade, param, input

**Control type**:
The string that decides which input renders a control: `boolean`, `number`, `range`, `text`, `color`, `select`, `button`, `vector`, `graph` or `fpsgraph`.
_Avoid_: kind, widget, slider (say `range`)

**Type inference**:
Deriving a control's type from the shape of the value passed in, so users rarely declare one.
_Avoid_: smart fields, auto-detect, field recognition

**Graph control**:
A read-only control that plots a value over time as a rolling sparkline; the FPS graph is its built-in frame-rate variant.
_Avoid_: monitor, chart, performance monitor

**Number drag**:
The scrub interaction on numeric inputs where dragging changes the value in steps.
_Avoid_: knob, scrubber, guide

### Layout

**Panel**:
The root draggable, resizable and collapsible window that hosts folders and controls.
_Avoid_: pane, GUI, window, tweak bar

**Folder**:
A named, collapsible group of controls inside the panel; the reserved `default` folder renders its controls flat.
_Avoid_: group, section, category

**Panel id**:
The identifier that scopes a set of controls to one panel so several panels can coexist; defaults to `default`.
_Avoid_: uuid, instance id, namespace

**Compact layout**:
The dense sizing system where every control row is one unit high, so panel height is computed arithmetically from `--tl-*` CSS variables.
_Avoid_: dense mode, tight layout, Tweakpane sizing

### State

**Controls store**:
The single shared reactive registry of every control, keyed by panel id and then by control key.
_Avoid_: controls context, state, registry
