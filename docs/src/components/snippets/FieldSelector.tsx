import * as React from 'react';
import {
    FieldSelector,
    IField,
    FieldRegistry
} from 'react-dynamic-formbuilder';

const registry: FieldRegistry = {
    SingleSelector: {
        field: {
            key: '',
            label: 'Please select:',
            type: 'SingleSelector',
        },
        displayName: '单选(selector)',
        input: null,
        builder: null,
        editor: null,
        display: null,
    },
    SingleLineTextField: {
        field: {
            key: '',
            label: 'Name',
            type: 'SingleLineTextField',
        },
        displayName: '单行输入(input)',
        input: null,
        builder: null,
        editor: null,
        display: null,
    },
};

export default function() {
    return (
        <FieldSelector registry={registry}/>
    )
}