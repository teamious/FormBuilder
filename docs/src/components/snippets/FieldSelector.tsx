import * as React from 'react';
import {
    FieldSelector,
    FormBuilderContext,
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
        render: null,
        builder: null,
        editor: null,
    },
    SingleLineTextField: {
        field: {
            key: '',
            label: 'Name',
            type: 'SingleLineTextField',
        },
        displayName: '单行输入(input)',
        render: null,
        builder: null,
        editor: null
    },
};

export default function() {
    return (
        <FormBuilderContext>
            <FieldSelector registry={registry}/>
        </FormBuilderContext>
    )
}