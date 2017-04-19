import * as React from 'react';
import Snippet from '../Snippet';
import PropsTable, { IPropRow } from '../PropsTable';

const code = require('!!raw!../../../../src/data/IField.ts');

export default function() {

    return (
        <div>
            <h3>
                <a href='#ifield' name='ifield'>IField</a>
            </h3>

            <p>
                The <strong>IField</strong> interface represents the basic unit of the form definition.
                The IField interface contains all of the information necessary to:

            </p>

            <ul>
                <li>
                    Render your control as an option inside the <strong>FieldSelector</strong>
                </li>
                <li>
                    Render your control inside the <strong>FormBuilder</strong>
                </li>
                <li>
                    Edit options for your control in the <strong>FieldOptionEditor</strong>
                </li>
            </ul>

            <div>
                <Snippet code={code} lang='typescript'/>
            </div>

            <PropsTable data={propsData}/>
        </div>
    )
}

const propsData: IPropRow[] = [
    {
        name: 'label',
        type: 'string',
        default: null,
        required: true,
        description: 'The FieldSelector component uses this string to label your custom field as an option.'
    },

    {
        name: 'type',
        type: 'string',
        default: null,
        required: true,
        description: 'The FormBuilder and FieldOptionEditor use this key to lookup the component responsible for displaying the field or editing the field via the FieldRegistry.'
    },

    {
        name: 'key',
        type: 'string',
        default: null,
        required: true,
        description: 'TBD.'
    },

    {
        name: 'hint',
        type: 'string',
        default: null,
        required: false,
        description: 'TBD'
    },

    {
        name: 'options',
        type: 'any',
        default: null,
        required: false,
        description: 'This property should contain a list of options and their default values for your field type. The values can be changed via the FieldOptionEditor and can be used by your custom field class to determine rendering or behavior. Each field type carries their own copy of the options provided.'
    },

    {
        name: 'fields',
        type: 'Array<IField>',
        default: null,
        required: false,
        description: 'TBD'
    },
];