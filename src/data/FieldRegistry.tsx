import { IField } from './IField';
import { IFieldBuilderComponent } from './IFieldBuilder'
import { IFieldOptionEditorComponent } from './IFieldOptionEditor'
import { IFieldRenderComponent } from './IFieldRender'
import { IFieldDisplayComponent } from './IFieldDisplay'

// FieldRegistry maps field types to the class responsible for rendering the field and the class responsible for editing the field.
export interface FieldRegistry {
    [type: string]: {
        field: IField,
        displayName: string,
        builder: IFieldBuilderComponent,
        render: IFieldRenderComponent,
        editor?: IFieldOptionEditorComponent,
	    display: IFieldDisplayComponent
    };
}