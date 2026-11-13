import type { Ref } from 'vue'
import type { CatalogueEntry, TresCatalogue } from '../types'
import { ref } from 'vue'
import { isFunction, isObject } from '../utils/is'
import { setDefaultAttach } from './defaultAttach'

export const catalogue: Ref<TresCatalogue> = ref({})

const isCatalogueEntry = (value: unknown): value is CatalogueEntry =>
  isObject(value) && isFunction((value as CatalogueEntry).object)

/**
 * Adds classes to the catalogue. Pass a `CatalogueEntry` instead of a class to set
 * options for every Tres component of that class, such as a default `attach`.
 */
export const extend = (objects: Record<string, unknown>) => {
  for (const [name, value] of Object.entries(objects)) {
    const entry = isCatalogueEntry(value) ? value : undefined
    // Namespaces such as `three` also hold non-constructors; they were always stored unchecked.
    catalogue.value[name] = (entry?.object ?? value) as TresCatalogue[string]
    setDefaultAttach(name, entry?.attach)
  }
  return catalogue.value
}

export default { catalogue, extend }
