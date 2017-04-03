import { IField } from '../../data';

export * from './NestedFormBuilder';
export * from './NestedFormDisplay';
export * from './NestedFormInput';

const Type = 'NestedForm';
const FieldTemplate = {
    key: '',
    label: 'Detail',
    type: Type,
    fields: Array<IField>()
};

export const NestedForm = {
    FieldTemplate: FieldTemplate,
    Type: Type,
}
