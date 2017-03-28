import * as React from 'react';
import Snippet from '../Snippet';
import Example from '../Example';
import { FieldSelector, FormBuilderContext } from '../../../../src/components';
import * as data from '../../../../src/data';
import * as constants from '../constants';
import PropsTable, { IPropRow } from '../PropsTable';
const code = require('!!raw!../snippets/FieldSelector.tsx');

const propsData: Array<IPropRow> = [
    {
        name: 'fields',
        type: <a href='#ifield'>{'Array<IField'}></a>,
        default: '[]',
        required: true,
        description: 'An array of field definitions that the end user can use to build a form.'
    }
];

export default function () {
    const body = (
        <div>
            <FormBuilderContext>
                <FieldSelector registry={constants.registry} />
            </FormBuilderContext>
        </div>
    );

    const snippet = <Snippet code={code} lang='typescript' />

    return (
        <div>
            <h3>
                <a href='#field-selector' name='field-selector'>
                    FieldSelector
                </a>
            </h3>
            <p>
                The <strong>FieldSelector</strong> component is used to add new fields to the form definition. You must
                supply the <strong>FieldSelector</strong> component a list of Fields via the <strong>fields</strong> prop.
                Each field you supply must satisfy the <strong><a href='#ifield'>IField interface</a></strong>. To add a field
                to the form defintion, you can drag a field from the <strong>FieldSelector</strong> and drop it into the <strong>FormBuilder</strong>
            </p>

            <Example body={body} footer={snippet} />

            <PropsTable data={propsData} />
        </div>
    )
}