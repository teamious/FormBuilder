import * as React from 'react';
import Snippet from '../Snippet';
import Example from '../Example';
import { FieldSelector, FormBuilderContext } from 'react-dynamic-formbuilder'
import * as constants from '../constants';
import PropsTable, { IPropRow } from '../PropsTable';
import FieldSelectorSnippet from '../snippets/FieldSelector';
const code = require('!!raw!../snippets/FieldSelector.tsx');

const propsData: Array<IPropRow> = [
    {
        name: 'registry',
        type: <a href='#field-registry'>FieldRegistry</a>,
        default: '{}',
        required: true,
        description: 'A registry of fields to display in the FieldSelector. Although not required, it\'s strongly recommended to use the same registry for the FormBuilder.'
    }
];

export default function() {
    const snippet = <Snippet code={code} lang='typescript'/>
    const body = <FieldSelectorSnippet/>

    return (
        <div>
            <h3>
                <a href='#field-selector' name='field-selector'>
                    FieldSelector
                </a>
            </h3>
            <p>
                The <strong>FieldSelector</strong> component is used to add new fields to the form definition. You must
                supply the <a href='#field-registry'>registry</a> prop in order to display your fields. To add a field to the form
                definition you can drag it from the FieldSelector and drop it onto the <a href='#form-builder'>FormBuilder</a>
            </p>

            <Example body={body} footer={snippet} />

            <PropsTable data={propsData} />
        </div>
    )
}