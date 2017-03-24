import { IField } from './IField';

export interface IFieldOptionEditorProps {
    field: IField;
    onChange: (field: IField) => void;
}

export interface IFieldOptionEditorComponent extends React.ComponentClass<IFieldOptionEditorProps> {
}