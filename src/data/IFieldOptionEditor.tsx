import { IField, IGenericField } from './IField';

export interface IFieldOptionEditorProps {
    field: IField;
    onChange: (field: IField) => void;
}

export interface IGenericFieldOptionEditorProps<T> extends IFieldOptionEditorProps {
    field: IGenericField<T>;
}

export interface IFieldOptionEditorComponent extends React.ComponentClass<IFieldOptionEditorProps> {
}