<script setup>
import { hyphenate } from '@vueuse/core'
import { truncate as lodashTruncate } from 'lodash'
import { data } from './cientosProps.data.ts'

const props = defineProps(['componentPath', 'columns', 'skipEmptyCols', 'onFinishColRow', 'hyphenateNames', 'patch'])
let columns = props.columns || ['name', 'type', 'description', 'default', 'required']
const skipEmptyCols = props.skipEmptyCols ?? true
const noop = (colName, rowName, value, getRowValue = colName => getAndFormatColValue(colName, row)) => value
const onFinishColRow = props.onFinishColRow ?? noop
const hyphenateNames = props.hyphenateNames ?? false
const patch = props.patch ?? {}

if (!props.componentPath) {
  throw new Error('CientosPropsTable - component-path must be a non-empty string.')
}
else if (!data.data.hasOwnProperty(props.componentPath)) {
  throw new Error(`CientosPropsTable - could not find ${props.componentPath}`)
}

const componentDoc = data.data[props.componentPath]
const prps = componentDoc.props
if (skipEmptyCols) {
  const emptyCols = new Set(columns)
  for (const p of prps) {
    for (const col of emptyCols) {
      if (getValue(p, col, patch) !== '') {
        emptyCols.delete(col)
      }
    }
  }
  columns = columns.filter(c => !emptyCols.has(c))
}

function truncate(str, options = { length: 15 }) {
  const s = lodashTruncate(str, options)
  if (s !== str) {
    return `<span style="cursor:help" title=${str}>${s}</span>`
  }
  return s
}

function capitalize(str) {
  if (str.length === 0) {
    return ''
  }
  else if (str.length === 1) {
    return str.toLocaleUpperCase()
  }
  else if (str.length > 1) {
    return str[0].toLocaleUpperCase() + str.slice(1)
  }
}

function wrapInTag(tagOrTags, value) {
  if (Array.isArray(tagOrTags)) {
    while (tagOrTags.length > 0) {
      value = wrapInTag(tagOrTags.pop(), value)
    }
    return value
  }
  return `<${tagOrTags}>${value}</${tagOrTags}>`
}

function formatColValue(colName, value) {
  if (colName === 'name') {
    if (!value) {
      return ''
    }
    return wrapInTag(['strong', 'nobr'], hyphenateNames ? hyphenate(value) : value)
  }
  if (colName === 'type') return value ? wrapInTag('code', value) : ''
  if (colName === 'default') return value ? wrapInTag('code', truncate(value, { length: 15 })) : ''
  if (colName === 'required') return (!value || value === 'false') ? 'No' : 'Yes'
  if (colName === 'description') return value ? pToBr(value) : ''
  return value
}

function pToBr(htmlString) {
  return htmlString.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br />')
}

function getAndFormatColValue(colName, row) {
  const value = getValue(row, colName, patch)
  const formatted = formatColValue(colName, value)
  const callbackFn = colName0 => getAndFormatColValue(colName0, row)
  return onFinishColRow(colName, row.name, formatted, callbackFn)
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="col, i in columns" :key="`header${i}`">
          {{ capitalize(col) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row, i in prps" :key="`row${i}`">
        <td v-for="col, ii in columns" :key="`cell${ii}`" v-html="getAndFormatColValue(col, row)" />
      </tr>
    </tbody>
  </table>
</template>

<script>
export function getType(propObject) {
  const typeObject = propObject.type
  function recur(typeObject) {
    if (typeObject && 'name' in typeObject) {
      const name = typeObject.name
      const fns = {
        Partial: () => `${name}&lt;${typeObject.elements.map(recur).join(' ')}&gt;`,
        Array: () => `${typeObject.elements.map(recur).join(' ')}[]`,
        union: () => typeObject.elements.map(recur).join(' | '),
        Record: () => `${name}&lt;${typeObject.elements.map(recur).join(', ')}&gt;`,
        WithElements: () => `${name}&lt;${typeObject.elements.map(recur).join(' | ')}&gt;`,
        TSTupleType: () => console.error(`TSTupleType does not contain specific type information. Supply the type with \`:patch={${propObject.name}: {type: [...]}}\``)
      }
      if (name in fns) {
        return fns[name]()
      } else if (typeObject.hasOwnProperty('elements')) {
        return fns['WithElements']()
      }
      return name
    }
    return ''
  }
  return recur(typeObject)
}

export function unwrapFunctionString(maybeFn) {
  const arrow = '() => '
  if (maybeFn.startsWith(arrow)) {
    return maybeFn.slice(arrow.length)
  }
  return maybeFn
}

export function getDefaultValue(defaultValueObj) {
  if (typeof defaultValueObj === 'undefined' || typeof defaultValueObj.value === 'undefined') {
    return ''
  }
  if (defaultValueObj.func === false) {
    return unwrapFunctionString(defaultValueObj.value)
  }
  return defaultValueObj.value
}

export function getValue(propObj, fieldName, patchObj = {}) {
  if (propObj.name && propObj.name in patchObj && fieldName in patchObj[propObj.name]) {
    return patchObj[propObj.name][fieldName]
  }
  if (fieldName === 'description') return propObj.description ?? ''
  if (fieldName === 'default') return propObj.defaultValue ? getDefaultValue(propObj.defaultValue) : ''
  if (fieldName === 'type') return getType(propObj)
  return propObj[fieldName] ?? ''
}
</script>