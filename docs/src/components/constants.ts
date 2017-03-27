import * as data from '../../../src/data';
import StandardEditor from './StandardEditor';

import SingleSelector from './fields/SingleSelector';
import SingleSelectorOptionEditor from './fields/SingleSelectorOptionEditor';
import SingleLineTextField from './fields/SingleLineTextField';
import SingleLineTextFieldOptionEditor from './fields/SingleLineTextFieldOptionEditor'

export const registry: data.FieldRegistry = {
    'SingleSelector': {
        field: {
            key: '',
            label: 'Single selector',
            type: 'SingleSelector',
            options: {
                selectOpts: ['a', 'b', 'c'],
            }
        },
        render: SingleSelector,
        builder: SingleSelector,
        editor: SingleSelectorOptionEditor
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
        render: SingleLineTextField,
        builder: SingleLineTextField,
        editor: SingleLineTextFieldOptionEditor
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
