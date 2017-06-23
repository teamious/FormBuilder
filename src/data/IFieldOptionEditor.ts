import { IField } from './IField';
import { IFieldContext } from './IFieldContext';

export interface IFieldOptionEditorProps {
    field: IField;
    fieldContext: IFieldContext;
    onChange: (field: IField, error?: any) => void;
    onError?: (field: IField, error: any) => void;
}

export interface IGenericFieldOptionEditorProps<T extends IField> extends IFieldOptionEditorProps {
    field: T;
}

export interface IFieldOptionEditorComponent extends React.ComponentClass<IFieldOptionEditorProps> {
}