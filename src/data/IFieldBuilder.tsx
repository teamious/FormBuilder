import { IField } from './IField';
import { FieldRegistry } from './FieldRegistry';

export interface IFieldBuilderProps {
    field: IField;
    index: number;
    registry: FieldRegistry;
    editButtonText?: React.ReactNode;
    deleteButtonText?: React.ReactNode;
    onChange: (field: IField, index: number) => void;
    onFieldEditing: (field: IField, done: (field: IField) => void) => void;
    onBeforeAddField: (field: IField) => boolean;
}

export interface IGenericFieldBuilderProps<T extends IField> extends IFieldBuilderProps {
    field: IField
}

export interface IFieldBuilderComponent extends React.ComponentClass<IFieldBuilderProps> {
}