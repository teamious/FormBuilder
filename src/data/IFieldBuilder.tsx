import { IField } from './IField';
import { FieldRegistry } from './FieldRegistry';
import { IEditableControlSource } from './IClickSource';

export interface IFieldBuilderProps {
    field: IField;
    // The fields of the current form. Look up field key in order to build relationship with the current field.
    fields: IField[];
    index: number;
    registry: FieldRegistry;
    editButton?: IEditableControlSource;
    deleteButton?: IEditableControlSource;
    onChange: (field: IField, index: number) => void;
    onFieldEditing: (field: IField, done: (field: IField) => void) => void;
    onBeforeAddField: (field: IField) => boolean;
}

export interface IGenericFieldBuilderProps<T extends IField> extends IFieldBuilderProps {
    field: IField
}

export interface IFieldBuilderComponent extends React.ComponentClass<IFieldBuilderProps> {
}