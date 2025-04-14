import type { Ref } from 'vue'
import type { TresCatalogue } from '../types'
import { ref } from 'vue'

// TODO: This should be a composable and not a global ref
export const catalogue: Ref<TresCatalogue> = ref({})

export const extend = (objects: any) => Object.assign(catalogue.value, objects)

export default { catalogue, extend }
