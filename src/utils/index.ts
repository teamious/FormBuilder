import * as assign from 'object-assign';
import { IField } from '../data';

export function updateField(oldField: IField, newField: IField, fields: Array<IField>): Array<IField> {
    let index = fields.indexOf(oldField);
    if (index < 0) {
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].fields) {
                let nestedFields = updateField(oldField, newField, fields[i].fields);
                if (nestedFields) {
                    index = i;
                    newField = assign({}, fields[i], {
                        fields: nestedFields
                    });
                    break;
                }
            }
        }
    }

    if (index >= 0) {
        const newFields = fields.slice();
        newFields[index] = newField;
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