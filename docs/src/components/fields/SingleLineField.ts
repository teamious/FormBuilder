import { IField, IFieldDef, IFieldState, IFieldInputInjector } from 'react-dynamic-formbuilder';
import { SingleLineTextField, SingleLineTextBuilder } from './SingleLineTextField';
import KeyValueDisplay from './KeyValueDisplay';
import SingleLineTextFieldOptionEditor from './SingleLineTextFieldOptionEditor';

const Type = "Teamious.SingleLineText";
const Field: IField = {
    id: '',
    label: '单行输入(input)',
    type: Type,
    options: {
        hint: 'Please enter your hint',
        required: true,
    }
};

function onValuesChanged(field: IField, values: { [id: string]: any; }): IFieldState {
    console.log('onValuesChanged', field, values);
    return null;
}

const inputInjector: IFieldInputInjector = {
    onValuesChanged: onValuesChanged
}

export const SingleLineField: IFieldDef = {
    type: Type,
    field: Field,
    displayName: '单行输入(input)',
    builder: SingleLineTextBuilder,
    input: SingleLineTextField,
    inputInjector: inputInjector,
    display: KeyValueDisplay,
    editor: SingleLineTextFieldOptionEditor,
};