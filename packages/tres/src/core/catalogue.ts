export const catalogue: Record<string, any> = {}
export const extend = (objects: any) => void Object.assign(catalogue, objects)

export default { catalogue, extend }
