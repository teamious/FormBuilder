import * as React from 'react';
import {
    FieldSelector,
    IField,
    FieldRegistry
} from 'react-dynamic-formbuilder';

const registry: FieldRegistry = new FieldRegistry();
registry.register({
    field: {
        key: '',
        label: 'Please select:',
        type: 'SingleSelector',
        options: {
            selectOpts: ['a', 'b', 'c'],
        }
    },
    type: 'SingleSelector',
    displayName: '单选(selector)',
    input: null,
    builder: null,
    editor: null,
    display: null,
});

registry.register({
    field: {
        key: '',
        label: 'Name',
        type: 'SingleLineTextField',
        options: {
            hint: 'Please enter your name',
            required: true,
            unique: false,
        }
    },
    type: 'SingleLineTextField',
    displayName: '单行输入(input)',
    input: null,
    builder: null,
    editor: null,
    display: null,
});

export default function() {
    return (
        <FieldSelector registry={registry}/>
    )
}