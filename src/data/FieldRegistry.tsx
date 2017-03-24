import { IField } from './IField';
import { IFieldBuilderComponent } from './IFieldBuilder'
import { IFieldOptionEditorComponent } from './IFieldOptionEditor'
import { IFieldRenderComponent } from './IFieldRender'

// FieldRegistry maps field types to the class responsible for rendering the field and the class responsible for editing the field.
export interface FieldRegistry {
    [key: string]: { field: IField, builder: IFieldBuilderComponent, render: IFieldRenderComponent, editor?: IFieldOptionEditorComponent };
}