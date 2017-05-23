import * as assign from 'object-assign';
import { IField } from '../data';

export function updateFieldInFieldTree(field: IField, fields: Array<IField>): Array<IField> {
    let items = fields.filter(f => f.id === field.id);
    let index = -1;
    if (items.length > 1) {
        throw new Error('impossible');
    }
    else if (items.length == 1) {
        index = fields.indexOf(items[0]);
    }
    else {
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].fields) {
                let nestedFields = updateFieldInFieldTree(field, fields[i].fields);
                if (nestedFields) {
                    index = i;
                    field = assign({}, fields[i], {
                        fields: nestedFields
                    });
                    break;
                }
            }
        }
    }

    if (index >= 0) {
        const newFields = fields.slice();
        newFields[index] = field;
        return newFields;
    }

    return null;
}

export function getFieldSiblings(field: IField, fields: Array<IField>): Array<IField> {
    const index = fields.indexOf(field);
    if (index >= 0) {
        return fields;
    }

    for (let f of fields) {
        if (f.fields) {
            let siblings = getFieldSiblings(field, f.fields);
            if (siblings) {
                return siblings;
            }
        }
    }

    return null;
}

// Attribution: http://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
export function generateID(len: number = 5) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}