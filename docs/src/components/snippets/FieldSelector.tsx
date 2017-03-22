import * as React from 'react';
import { FieldSelector, FormBuilderContext, IField } from 'form-builder';

const fields: IField[] = [
    {
        label: 'Short text',
        type: 'ShortText',
    },
    {
        label: 'Long text',
        type: 'LongText'
    },
    {
        label: 'Date',
        type: 'DatePicker'
    },
];

export default function MyApp() {
    return (
        <FormBuilderContext>
            <FieldSelector fields={fields}/>
        </FormBuilderContext>
    )
}