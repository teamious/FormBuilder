import * as data from '../../../src/data';
import StandardEditor from './StandardEditor';

import SingleSelector from './fields/SingleSelector';
import SingleSelectorOptionEditor from './fields/SingleSelectorOptionEditor';
import SingleLineTextField from './fields/SingleLineTextField';
import SingleLineTextFieldOptionEditor from './fields/SingleLineTextFieldOptionEditor';
import KeyValueDisplay from './fields/KeyValueDisplay';

export const registry: data.FieldRegistry = {
    'SingleSelector': {
        field: {
            key: '',
            label: 'Please select:',
            type: 'SingleSelector',
            options: {
                selectOpts: ['a', 'b', 'c'],
            }
        },
        displayName: '单选(selector)',
        render: SingleSelector,
        builder: SingleSelector,
        editor: SingleSelectorOptionEditor,
        display: KeyValueDisplay,
    },
    'SingleLineTextField': {
        field: {
            key: '',
            label: 'Name',
            type: 'SingleLineTextField',
            options: {
                hint: 'Please enter your name',
                required: true,
                unique: false,
            }
        },
        displayName: '单行输入(input)',
        render: SingleLineTextField,
        builder: SingleLineTextField,
        editor: SingleLineTextFieldOptionEditor,
        display: KeyValueDisplay,
    },
};

export const noop = () => { };

export const fields: data.IField[] = [
    {
        key: '',
        label: 'Single selector',
        type: 'SingleSelector',
        options: {
            selectOpts: ['a', 'b', 'c'],
        }
    },
    {
        key: '',
        label: 'Name',
        type: 'SingleLineTextField',
        options: {
            hint: 'Please enter your name',
            required: true,
            unique: false,
        }
    },
];
