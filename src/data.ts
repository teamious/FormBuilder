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
}
export const FORM_BUILDER_FIELD = 'FORM_BUILDER_FIELD'
export const FIELD_SELECTOR_FIELD = 'FIELD_SELECTOR_FIELD';