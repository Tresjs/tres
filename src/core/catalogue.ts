import { ref } from 'vue'
import type { Ref } from 'vue'
import type { TresCatalogue } from '../types'

export const catalogue: Ref<TresCatalogue> = ref({})

export const extend = (objects: any) => Object.assign(catalogue.value, objects)

export default { catalogue, extend }
