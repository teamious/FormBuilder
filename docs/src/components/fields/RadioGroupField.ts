import { IField, IFieldDef } from 'react-dynamic-formbuilder';
import { RadioGroupTextField, RadioGroupTextBuilder } from './RadioGroupTextField';
import KeyValueDisplay from './KeyValueDisplay';
import RadioGroupOptionEditor from './RadioGroupOptionEditor';

const Type = "Teamious.radioButton";
const Field: IField = {
    id: '01',
    label: '单选按钮',
    type: Type,
    fields: [],
    options: {
        labels: ['JAVA', 'WEB前端', 'IOS'],
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

