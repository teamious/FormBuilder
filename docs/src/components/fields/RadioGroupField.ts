import { IField, IFieldDef } from 'react-dynamic-formbuilder';
import { RadioGroupTextField, RadioGroupTextBuilder } from './RadioGroupTextField';
import KeyValueDisplay from './KeyValueDisplay';
import RadioGroupOptionEditor from './RadioGroupOptionEditor';

const Type = "Teamious.radioButton";
const Field: IField = {
    id: '',
    label: '单选按钮',
    type: Type,
    fields: [],
    options: {
        labels: [{
            id: '001',
            name: 'check1',
            value: 'JAVA',
        },
        {
            id: '002',
            name: 'check1',
            value: 'WEB前端',
        },
        {
            id: '003',
            name: 'check1',
            value: 'IOS',
        }],
        required: true,
        others: {
            checked: false,
            label: 'Others',
            name: 'check1',
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

