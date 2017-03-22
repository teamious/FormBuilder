export interface FieldRegistry {
    [key: string]: {
        render: React.ComponentClass<any>,
        editor?: IFieldOptionEditorComponent
    };
}
