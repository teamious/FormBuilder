import { IField } from '../../data';

export * from './NestedFormBuilder';
export * from './NestedFormDisplayView';
export * from './NestedFormSubmissionView';
export const Type = 'NestedForm';
export const FieldTemplate = {
    key: '',
    label: 'Detail',
    type: Type,
    fields: Array<IField>()
};
