# v-log

### Problem

Wenn du deine Instanz loggen möchtest, musst du normalerweise die Template-Referenz verwenden und diese dann loggen:

<DirectiveVLogCode />

Das ist VIEL Code nur für ein einfaches Log, oder?

## Benutzung

Mit der neuen Direktive v-log, die von **TresJS** bereitgestellt wird, kannst du das gleiche tun, indem du einfach `v-log` zur Instanz hinzufügst.

<DirectiveVLogUsageCode />

Du kannst auch einen Modifikator mit dem Namen einer Eigenschaft übergeben. Zum Beispiel `v-log:material`, damit direkt die `material` Eigenschaft gelogged wird 😍.
