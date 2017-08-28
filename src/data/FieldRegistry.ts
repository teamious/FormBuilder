import { IField } from './IField';
import { IFieldBuilderComponent } from './IFieldBuilder';
import { IFieldOptionEditorComponent } from './IFieldOptionEditor';
import { IFieldInputComponent, IFieldInputInjector } from './IFieldInput';
import { IFieldDisplayComponent } from './IFieldDisplay';
import { IFieldSelectorComponent } from './IFieldSelector';

export interface IFieldDef {
    type: string;
    displayName: string;
    field: IField;
    builder: IFieldBuilderComponent;
    input: IFieldInputComponent;
    inputInjector?: IFieldInputInjector;
    display: IFieldDisplayComponent;
    editor?: IFieldOptionEditorComponent;
    selector?: IFieldSelectorComponent;
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
        for (let key in this) {
            if (typeof this[key] !== "function") {
                fields.push(this[key]);
            }
        }
        return fields;
    }
}