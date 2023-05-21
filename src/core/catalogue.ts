import { Ref, ref } from 'vue'
import { TresCatalogue } from '../types'

export const catalogue: Ref<TresCatalogue> = ref({})

export const extend = (objects: any) => void Object.assign(catalogue.value, objects)

export default { catalogue, extend }
