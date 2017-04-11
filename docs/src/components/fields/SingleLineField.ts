import { IField, IFieldDef } from 'react-dynamic-formbuilder';
import SingleLineTextField from './SingleLineTextField';
import KeyValueDisplay from './KeyValueDisplay';
import SingleLineTextFieldOptionEditor from './SingleLineTextFieldOptionEditor';

const Type = "Teamious.SingleLineText";
const Field: IField = {
    key: '',
    label: '单行输入(input)',
    type: Type,
    options: {
        hint: 'Please enter your hint',
        required: true,
    }
};

export const SingleLineField: IFieldDef = {
    type: Type,
    field: Field,
    displayName: '单行输入(input)',
    builder: SingleLineTextField,
    input: SingleLineTextField,
    display: KeyValueDisplay,
    editor: SingleLineTextFieldOptionEditor,
};