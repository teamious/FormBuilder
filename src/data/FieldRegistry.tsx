import { IField } from './IField';
import { IFieldBuilderComponent } from './IFieldBuilder'
import { IFieldOptionEditorComponent } from './IFieldOptionEditor'
import { IFieldInputComponent } from './IFieldInput'
import { IFieldDisplayComponent } from './IFieldDisplay'

export interface IFieldDef {
    type: string;
    displayName: string;
    field: IField;
    builder: IFieldBuilderComponent;
    input: IFieldInputComponent;
    display: IFieldDisplayComponent;
    editor?: IFieldOptionEditorComponent;
}

// FieldRegistry maps field types to the class responsible for rendering the field and the class responsible for editing the field.
export class FieldRegistry {
    // NOTE(gaolw): 'any' here is to make typescript happy because the 'register' property is not IFieldDef.
    // More details: please refer to https://www.typescriptlang.org/docs/handbook/interfaces.html
    [type: string]: IFieldDef | any;

    public register(field: IFieldDef) {
        if (this[field.type]) {
            throw new Error('Field type [' + field.type + '] has been registered already.')
        }

        this[field.type] = field;
    }

    public getFields(): IFieldDef[] {
        const fields: IFieldDef[] = []
        for (var key in this) {
            if (typeof this[key] !== "function") {
                fields.push(this[key]);
            }
        }
        return fields;
    }
}