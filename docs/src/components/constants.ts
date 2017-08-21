import { SingleSelectorField } from './fields/SingleSelectorField';
import { SingleLineField } from './fields/SingleLineField';
import { RadioGroupField } from './fields/RadioGroupField';
import {
    NestedFormBuilderWrapper,
    NestedFormInput,
    NestedFormDisplay,
    NestedForm,
    IField,
    FieldRegistry as _FieldRegistry,
} from 'react-dynamic-formbuilder';

export const FieldRegistry = new _FieldRegistry();
FieldRegistry.register(SingleLineField);
FieldRegistry.register(SingleSelectorField);
FieldRegistry.register(RadioGroupField);
FieldRegistry.register({
    field: NestedForm.FieldTemplate,
    displayName: '明细(NestForm)',
    type: NestedForm.Type,
    input: NestedFormInput,
    builder: NestedFormBuilderWrapper,
    display: NestedFormDisplay,
});

export const fields: IField[] = [
    SingleSelectorField.field,
    SingleLineField.field,
];