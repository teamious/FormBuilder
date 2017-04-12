import { IField, IFieldDef } from 'react-dynamic-formbuilder';
import SingleSelector from './SingleSelector';
import KeyValueDisplay from './KeyValueDisplay';
import SingleSelectorOptionEditor from './SingleSelectorOptionEditor';

const Type = "Teamious.SingleSelector";
const Field: IField = {
    id: '',
    label: '单选(selector)',
    type: Type,
    options: {
        hint: 'Please enter your hint',
        required: true,
    }
};

export const SingleSelectorField: IFieldDef = {
    type: Type,
    field: Field,
    displayName: '单选(selector)',
    builder: SingleSelector,
    input: SingleSelector,
    display: KeyValueDisplay,
    editor: SingleSelectorOptionEditor,
};