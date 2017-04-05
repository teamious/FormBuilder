import { IField, IGenericField } from './IField';
import { FieldRegistry } from './FieldRegistry';

export interface IFieldBuilderProps {
    field: IField;
    index: number;
    registry: FieldRegistry;
    onChange: (field: IField, index: number) => void;
    onFieldEditing: (field: IField, done: (field: IField) => void) => void;
    onBeforeAddField: (field: IField) => boolean;
}

export interface IGenericFieldBuilderProps<T> extends IFieldBuilderProps {
    field: IGenericField<T>
}

export interface IFieldBuilderComponent extends React.ComponentClass<IFieldBuilderProps> {
}