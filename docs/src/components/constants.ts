import * as data from '../../../src/data';

import { SingleSelectorField } from './fields/SingleSelectorField';
import { SingleLineField } from './fields/SingleLineField';
import {
    NestedFormBuilder,
    NestedFormInput,
    NestedFormDisplay,
    NestedForm,
} from 'react-dynamic-formbuilder';

export const FieldRegistry = new data.FieldRegistry();
FieldRegistry.register(SingleLineField);
FieldRegistry.register(SingleSelectorField);
FieldRegistry.register({
    field: NestedForm.FieldTemplate,
    displayName: '明细(NestForm)',
    type: NestedForm.Type,
    input: NestedFormInput,
    builder: NestedFormBuilder,
    display: NestedFormDisplay,
});

export const fields: data.IField[] = [
    SingleSelectorField.field,
    SingleLineField.field,
];