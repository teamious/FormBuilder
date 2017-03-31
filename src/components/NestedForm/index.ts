import { IField } from '../../data';

export * from './NestedFormBuilder';
export * from './NestedFormDisplay';
export * from './NestedFormInput';
export const Type = 'NestedForm';
export const FieldTemplate = {
    key: '',
    label: 'Detail',
    type: Type,
    fields: Array<IField>()
};
