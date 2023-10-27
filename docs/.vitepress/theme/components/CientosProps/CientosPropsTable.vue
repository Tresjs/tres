<script setup lang="ts">
import type { ComponentDoc } from 'vue-docgen-api'
import { hyphenate } from '@vueuse/core'
import * as cientosProps from './cientosProps.data'

export interface PropHooksUnformattedArgument {
  propName: string
  fieldName: string
  value: string
  getFieldFormatted: (fieldName: string) => string
  getFieldUnformatted: (fieldName: string) => string
}

export type PropHooksFormattedArgument = PropHooksUnformattedArgument & {
  valueFormatted: string
}

export interface CientosPropsListerProps {
  /**
   * path to the component whose props will be displayed
   */
  componentPath: string
  /**
   * list of fields to display – will serve as headers for the table
   */
  fields?: string[]
  /**
   * callback to alter the unformatted value of a prop field
   * @example
   * // puts 'SPECIAL' in the entry having the header 'default' and row 'scale'.
   * :on-get-value="({value, propName, fieldName}) => propName === 'scale' && fieldName === 'default' ? 'SPECIAL' : value"
   * @example
   * // adds data from the `type` field to the `description`
   * :on-get-value="({value, fieldName, getFieldUnformatted}) => fieldName === 'description' ? getFieldUnformatted('type') + '–' + value : value
   */
  onGetValue?: (
    hooksArg: PropHooksUnformattedArgument
  ) => string | undefined

  /**
   * callback to alter the formatted value of a prop field
   * @example
   * // wraps all descriptions in h3 tag
   * :on-get-value="({value, fieldName}) => { if (fieldName === 'description') return '<h3>' + value + '</h3>' }"
   */
  onFormatValue?: (
    hooksFormattedArg: PropHooksFormattedArgument
  ) => string | undefined
  /**
   * whether to use kebab-case for props' 'name' field
   */
  hyphenateNames?: boolean
}

const props = withDefaults(defineProps<CientosPropsListerProps>(), {
  fields: () => ['name', 'type', 'description', 'default', 'required'],
  onGetValue: () => undefined,
  onFormatValue: () => undefined,
  hyphenateNames: false,
})

function getPropFieldFormatted(componentProp: ComponentDoc, fieldName: string): string {
  const getFieldUnformatted = (fieldName0: string) => getPropFieldUnformatted(componentProp, fieldName0)
  const getFieldFormatted = (fieldName0: string) => getPropFieldFormatted(componentProp, fieldName0)
  const propName = componentProp.name ?? ''

  const valueUnformattedDefault = getPropFieldUnformatted(componentProp, fieldName)
  const hookArgs0 = { propName, fieldName, value: valueUnformattedDefault, getFieldFormatted, getFieldUnformatted }
  const valueUnformattedUser = props.onGetValue(hookArgs0)
  const valueUnformatted = typeof valueUnformattedUser === 'string' ? valueUnformattedUser : valueUnformattedDefault

  const valueFormattedDefault = formatValue(valueUnformatted, fieldName, props.hyphenateNames)
  const hookArgs1 = {
    propName,
    fieldName,
    value: valueUnformatted,
    valueFormatted: valueFormattedDefault,
    getFieldFormatted,
    getFieldUnformatted,
  }
  const valueFormattedUser = props.onFormatValue(hookArgs1)

  return typeof valueFormattedUser === 'string' ? valueFormattedUser : valueFormattedDefault
}

function getPropFieldUnformatted(doc: ComponentDoc, fieldName: string) {
  if ('description' === fieldName) {
    return doc.description ?? ''
  }
  else if ('default' === fieldName) {
    return doc.defaultValue ? getDefaultValue(doc.defaultValue) : ''
  }
  else if ('type' === fieldName) {
    return getType(doc)
  }
  else {
    return fieldName in doc ? `${doc[fieldName]}` : ''
  }
}

function formatValue(valueUnformatted: string, fieldName: string, isHyphenate = false) {
  if (fieldName === 'name') {
    if (!valueUnformatted) {
      return ''
    }
    return wrapInTag(['strong', 'nobr'], isHyphenate ? hyphenate(valueUnformatted) : valueUnformatted)
  }
  if (fieldName === 'type') return valueUnformatted ? wrapInTag('code', valueUnformatted) : ''
  if (fieldName === 'default') return valueUnformatted ? wrapInTag('code', valueUnformatted) : ''
  if (fieldName === 'required') return (!valueUnformatted || valueUnformatted === 'false') ? 'No' : 'Yes'
  if (fieldName === 'description') return valueUnformatted ? pToBr(valueUnformatted) : ''
  return valueUnformatted
}

function getType(doc: ComponentDoc) {
  const typeObject = doc.type
  return getTypeHelper(typeObject)
}

function getTypeHelper(typeObject: ComponentDoc) {
  if (!typeObject || !('name' in typeObject)) {
    return ''
  }
  const name = typeObject.name
  const elements = ('elements' in typeObject) ? typeObject.elements : []
  if ('Partial' === name) {
    return `${name}&lt;${elements.map(getTypeHelper).join(' ')}&gt;`
  }
  else if ('Array' === name) {
    return `${elements.map(getTypeHelper).join(' ')}[]`
  }
  else if ('union' === name) {
    return elements.map(getTypeHelper).join(' | ')
  }
  else if ('Record' === name) {
    return `${name}&lt;${elements.map(getTypeHelper).join(', ')}&gt;`
  }
  else if ('WithElements' === name || typeObject.hasOwnProperty('elements')) {
    return `${name}&lt;${elements.map(getTypeHelper).join(' | ')}&gt;`
  }
  else if ('TSTupleType' === name) {
    return 'TSTupleType'
  }
  else {
    return name
  }
}

function getDefaultValue(defaultValueObj: ComponentDoc) {
  if (typeof defaultValueObj === 'undefined' || typeof defaultValueObj.value === 'undefined') {
    return ''
  }
  if (defaultValueObj.func === false) {
    return unwrapFunctionString(defaultValueObj.value)
  }
  return defaultValueObj.value
}

function pToBr(htmlString: string) {
  return htmlString.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br />')
}

function capitalize(str: string) {
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

function wrapInTag(tagOrTags: string | string[], value: string) {
  if (Array.isArray(tagOrTags)) {
    while (tagOrTags.length > 0) {
      value = wrapInTag(tagOrTags.pop() || '', value)
    }
    return value
  }
  return `<${tagOrTags}>${value}</${tagOrTags}>`
}

function unwrapFunctionString(maybeFn: string) {
  const arrow = '() => '
  if (maybeFn.startsWith(arrow)) {
    return maybeFn.slice(arrow.length)
  }
  return maybeFn
}

const componentProps = (() => {
  const data = cientosProps.data as Record<string, any>
  if (!data.hasOwnProperty(props.componentPath)) {
    const msg = `CientosPropsTable - could not find ${props.componentPath}`
    console.warn(msg)
    throw new Error(msg)
  }

  const componentDoc = data[props.componentPath]
  const componentProps = componentDoc.props
  return componentProps
})()
</script>

<template>
  <table>
    <thead>
      <tr class="row-header">
        <th
          v-for="field, i in fields"
          :key="`header-${i}`"
          :class="`col-${hyphenate(field)}`"
        >
          {{ capitalize(field) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="prop, i in componentProps"
        :key="`row-${i}`"
        :class="`row-${hyphenate(prop.name)}`"
      >
        <td
          v-for="field, ii in fields"
          :key="`cell-${ii}`"
          :class="`col-${hyphenate(field)}`"
          v-html="getPropFieldFormatted(prop, field)"
        />
      </tr>
    </tbody>
  </table>
</template>