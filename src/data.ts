export interface IDragSourceItem {
    index: number;
    field: IField;
}

export interface IDropTargetItem {
    index: number;
    field: IField;
}

export interface IField {
    label: string;
    type: string;
    hint?: string;
    options?: any;
}

// FieldRegistry maps field types to the class responsible for rendering the field and the class responsible for editing the field.
export interface FieldRegistry {
    [key:string]: {render: React.ComponentClass<any>, editor?: React.ComponentClass<any>};
}

export const FORM_BUILDER_FIELD = 'FORM_BUILDER_FIELD'
export const FIELD_SELECTOR_FIELD = 'FIELD_SELECTOR_FIELD';