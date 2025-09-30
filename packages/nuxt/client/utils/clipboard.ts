// Copy functionality

import type { InspectorNode } from '../types'

export const copyPath = async (path: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(path)
  }
  catch (error) {
    console.error('Failed to copy path:', error)
  }
}

export const copyProp = async (node: InspectorNode): Promise<void> => {
  try {
    const propString = `:${node.path.replace(/\./g, '-')}="${JSON.stringify(node.value)}"`
    await navigator.clipboard.writeText(propString)
  }
  catch (error) {
    console.error('Failed to copy prop:', error)
  }
}

export const copyPropAsArray = async (node: InspectorNode): Promise<void> => {
  try {
    const arrayValue = node.children?.map(child => child.value) || []
    const propString = `:${node.path.replace(/\./g, '-')}='[${arrayValue.map(v => (typeof v === 'string' ? `"${v}"` : v)).join(', ')}]'`
    await navigator.clipboard.writeText(propString)
  }
  catch (error) {
    console.error('Failed to copy prop as array:', error)
  }
}

export const copyValue = async (value: unknown): Promise<void> => {
  try {
    const stringValue = JSON.stringify(value)
    await navigator.clipboard.writeText(stringValue)
  }
  catch (error) {
    console.error('Failed to copy value:', error)
  }
}

export const copyValueAsVector3 = async (node: InspectorNode): Promise<void> => {
  try {
    if (!node.children || node.children.length < 3) return
    await navigator.clipboard.writeText(`new Vector3(${node.children[0].value}, ${node.children[1].value}, ${node.children[2].value})`)
  }
  catch (error) {
    console.error('Failed to copy prop as Vector3:', error)
  }
}

export const copyValueAsArray = async (node: InspectorNode): Promise<void> => {
  try {
    const arrayValue = node.children?.map(child => child.value) || []
    const propString = `[${arrayValue.map(v => (typeof v === 'string' ? `"${v}"` : v)).join(', ')}]`
    await navigator.clipboard.writeText(propString)
  }
  catch (error) {
    console.error('Failed to copy prop as array:', error)
  }
}

export const copyValueAsJSON = async (node: InspectorNode): Promise<void> => {
  try {
    let object = {}
    if (node.children && node.children.length > 0) {
      object = node.children.reduce((acc, child) => {
        acc[child.label] = child.value
        return acc
      }, {} as Record<string, unknown>)
    }
    await navigator.clipboard.writeText(JSON.stringify(object, null, 2))
  }
  catch (error) {
    console.error('Failed to copy value as JSON:', error)
  }
}

export const copyValueAsEuler = async (node: InspectorNode): Promise<void> => {
  try {
    const xChild = node.children?.find(child => child.label === 'x')
    const yChild = node.children?.find(child => child.label === 'y')
    const zChild = node.children?.find(child => child.label === 'z')
    const orderChild = node.children?.find(child => child.label === 'order')

    const x = xChild?.value || 0
    const y = yChild?.value || 0
    const z = zChild?.value || 0
    const order = orderChild?.value || 'XYZ'

    await navigator.clipboard.writeText(`new Euler(${x}, ${y}, ${z}, '${order}')`)
  }
  catch (error) {
    console.error('Failed to copy value as Euler:', error)
  }
}

export const copyValueAsQuaternion = async (node: InspectorNode): Promise<void> => {
  try {
    const xChild = node.children?.find(child => child.label === 'x')
    const yChild = node.children?.find(child => child.label === 'y')
    const zChild = node.children?.find(child => child.label === 'z')
    const wChild = node.children?.find(child => child.label === 'w')

    const x = xChild?.value || 0
    const y = yChild?.value || 0
    const z = zChild?.value || 0
    const w = wChild?.value || 1

    await navigator.clipboard.writeText(`new Quaternion(${x}, ${y}, ${z}, ${w})`)
  }
  catch (error) {
    console.error('Failed to copy value as Quaternion:', error)
  }
}
