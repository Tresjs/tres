<script setup>
import { hyphenate } from '@vueuse/core'
import { truncate as lodashTruncate } from 'lodash'
import { data } from './cientosProps.data.ts'
import { getValue } from './CientosPropsTable.vue';

const props = defineProps(['componentPath', 'hyphenateNames', 'patch'])
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
    if (colName === 'type') return value ? `<code>${value}</code>` : ''
    if (colName === 'default') return value ? `default: <code>${value}</code>` : ''
    if (colName === 'required') return (!value || value === 'false') ? '<span class="text-xs px-2 py-1 rounded-full outline outline-1 outline-white/[0.25] mr-1">Optional</span>' : ''
    if (colName === 'description') return value ? `<div class="text-sm">${value}</div>` : ''
    return value
}


function getAndFormatColValue(colName, row) {
    const value = getValue(row, colName, patch)
    const formatted = formatColValue(colName, value)
    return formatted
}

function get(colName, row) {
    return getAndFormatColValue(colName, row)
}

function getTitle(row) {
    const name = get('name', row)
    const anchor = hyphenate(name)
    const type = get('type', row)
    const required = get('required', row)
    return `<h3 id="${anchor}">${name}<span class="font-normal">: ${type} ${required}</span></h3>`
}

function getDescription(row) {
    const defaultValue = get('default', row)
    const typeInfo = `<div class="mt-4 mb-2">${defaultValue}</div>`
    const descriptionText = `<div>${get('description', row)}</div>`
    return typeInfo + descriptionText
}
</script>

<template>
    <dl>
        <template v-for="row, i in prps" :key="`row${i}`">
        <dt v-html="getTitle(row)"></dt>
        <dd v-html="getDescription(row)" class="ml-12"></dd>
        </template>
    </dl>
</template>
