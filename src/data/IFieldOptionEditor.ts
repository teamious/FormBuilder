import { IField } from './IField';
import { IFieldContext } from './IFieldContext';

export interface IFieldOptionEditorProps {
    field: IField;
    fieldContext: IFieldContext;
    onChange: (field: IField) => void;
}

export interface IGenericFieldOptionEditorProps<T extends IField> extends IFieldOptionEditorProps {
    field: T;
}

export interface IFieldOptionEditorComponent extends React.ComponentClass<IFieldOptionEditorProps> {
}