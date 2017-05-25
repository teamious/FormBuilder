export interface IField {
    label: string;
    type: string;
    id: string;
    hint?: string;
    options?: any;
    fields?: Array<IField>;
    parentId?: string;
};

export interface IGenericField<T> extends IField {
    options: T;
}