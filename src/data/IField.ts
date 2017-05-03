export interface IField {
    label: string;
    type: string;
    id: string;
    hint?: string;
    options?: any;
    fields?: Array<IField>;
    // This flag will decide whether the field will be on FieldSelector.
    // The field should be created by default in the form.
    isSystemField?: boolean;
};

export interface IGenericField<T> extends IField {
    options: T;
}