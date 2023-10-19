<script setup>
import { data } from './cientosProps.data.ts'
import { hyphenate } from '@vueuse/core';
import { truncate as lodashTruncate } from 'lodash';

const props = defineProps(['componentPath', 'columns', 'skipEmptyCols', 'onFinishColRow', 'hyphenateNames'])
let columns = props.columns || ['name', 'type', 'description', 'default', 'required']
const skipEmptyCols = props.skipEmptyCols ?? true;
const onFinishColRow = props.onFinishColRow ?? function (colName, rowName, value) { return value; }
const hyphenateNames = props.hyphenateNames ?? false

if (!props.componentPath) {
    throw new Error("CientosPropsTable - component-path must be a non-empty string.")
} else if (!data.data.hasOwnProperty(props.componentPath)) {
    throw new Error(`CientosPropsTable - could not find ${props.componentPath}`)
}

const componentDoc = data.data[props.componentPath]
const prps = componentDoc.props
if (skipEmptyCols) {
    const emptyCols = new Set(columns)
    for (const p of prps) {
        for (const col of emptyCols) {
            if (getValue(col, p) !== '') {
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
    } else if (str.length === 1) {
        return str.toLocaleUpperCase()
    } else if (str.length > 1) {
        return str[0].toLocaleUpperCase() + str.slice(1)
    }
}

function wrapInTag(tagname, value) {
    return `<${tagname}>${value}</${tagname}>`
}

function formatColValue(colName, value) {
    if (colName === 'name') return value ? wrapInTag('strong', wrapInTag('nobr', hyphenateNames ? hyphenate(value) : value)) : ''
    if (colName === 'type') return value ? wrapInTag('code', value) : ''
    if (colName === 'default') return value ? wrapInTag('code', truncate(value, { length: 15 })) : ''
    if (colName === 'required') return (!value || value === 'false') ? 'No' : 'Yes'
    return value
}

function getType(typeObject) {
    if (typeObject && 'name' in typeObject) {
        const name = typeObject.name;
        const fns = {
            'Partial': () => name + '&lt;' + typeObject.elements.map(getType).join(' ') + '&gt;',
            'Array': () => typeObject.elements.map(getType).join(' ') + '[]',
            'union': () => typeObject.elements.map(getType).join(' | '),
            'Record': () => name + '&lt;' + typeObject.elements.map(getType).join(', ') + '&gt;',
        }
        if (name in fns) {
            return fns[name]()
        }
        return name
    }
    return ''
}

function pToBr(htmlString) {
    return htmlString.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br />');
}

function getValue(colName, row) {
    if (colName === 'description') return pToBr(row.description ?? '')
    if (colName === 'default') return row.defaultValue?.value ?? ''
    if (colName === 'type') return getType(row.type)
    return row[colName] ?? ''
}

function getAndFormatColValue(colName, row) {
    const value = getValue(colName, row)
    return onFinishColRow(colName, row.name, formatColValue(colName, value), (colName) => getAndFormatColValue(colName, row))
}

</script>

<template>
    <table>
        <thead>
            <tr>
                <th v-for="col, i in columns" :key="'header' + i">
                    {{ capitalize(col) }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row, i in prps" :key="'row' + i">
                <td v-for="col, i in columns" v-html="getAndFormatColValue(col, row)" :key="'cell' + i" />
            </tr>
        </tbody>
    </table>
</template>
