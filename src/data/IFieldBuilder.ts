import { IField } from './IField';
import { IFieldContext } from './IFieldContext';
import { FieldRegistry } from './FieldRegistry';

export interface IFieldBuilderProps {
    field: IField;
    index: number;
    registry: FieldRegistry;
    onChange: (field: IField, index: number) => void;
    onFieldEditing: (field: IField, editingContext: IFieldContext, done: (field: IField) => void) => void;
    onBeforeAddField: (field: IField) => boolean;
}

export interface IGenericFieldBuilderProps<T extends IField> extends IFieldBuilderProps {
    field: T
}

export interface IFieldBuilderComponent extends React.ComponentClass<IFieldBuilderProps> {
}