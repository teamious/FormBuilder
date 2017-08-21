import { IField, IFieldDef } from 'react-dynamic-formbuilder';
import { RadioGroupTextField, RadioGroupTextBuilder } from './RadioGroupTextField';
import KeyValueDisplay from './KeyValueDisplay';
import RadioGroupOptionEditor from './RadioGroupOptionEditor';

const Type = "Teamious.radioButton";
const Field: IField = {
    id: '',
    label: '单选按钮',
    type: Type,
    fields: [
        {
            id: '001',
            label: 'JAVA',
            type: 'ABCDEFG',
        },
        {
            id: '002',
            label: 'WEB',
            type: 'ABCDEFG',
        },
        {
            id: '003',
            label: 'IOS',
            type: 'ABCDEFG',
        }
    ],
    options: {
        required: true,
        others: {
            checked: false,
            label: 'Others',
            value: ''
        }
    }
};

export const RadioGroupField: IFieldDef = {
    type: Type,
    field: Field,
    displayName: '单选按钮',
    builder: RadioGroupTextBuilder,
    input: RadioGroupTextField,
    display: KeyValueDisplay,
    editor: RadioGroupOptionEditor,
};

