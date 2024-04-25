import { REVISION } from 'three'

const getVersion = () => Number.parseInt(REVISION.replace(/\D+/g, ''))

export const version = /* @__PURE__ */ getVersion()
