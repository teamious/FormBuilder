import * as data from '../../../src/data';
import StandardEditor from './StandardEditor';
import ShortText from './ShortText';
import LongText from './LongText';

export const registry: data.FieldRegistry = {
    ShortText: { render: ShortText, editor: StandardEditor },
    LongText: { render: LongText, editor: StandardEditor },
};

export const noop = () => {};


export const fields: data.IField[] = [
    {
        label: 'Short text',
        type: 'ShortText',
        options: {
            label: 'Label',
            required: false,
            placeholder: 'Placeholder',
        }
    },
    {
        label: 'Long text',
        type: 'LongText',
        options: {
            label: 'Label',
            required: false,
            placeholder: 'Placeholder',
        }
    }
];
