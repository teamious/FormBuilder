import { IField } from './IField';

export interface IFieldOptionEditorProps {
    field: IField;
    onChange: (field: IField) => void;
}

export interface IGenericFieldOptionEditorProps<T extends IField> extends IFieldOptionEditorProps {
    field: T;
}

export interface IFieldOptionEditorComponent extends React.ComponentClass<IFieldOptionEditorProps> {
}