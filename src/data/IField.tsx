export interface IField {
    label: string;
    type: string;
    hint?: string;
    options?: any;
    fields?: Array<IField>
};
