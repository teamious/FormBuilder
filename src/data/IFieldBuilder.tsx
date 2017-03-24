import { IField } from './IField';
import { FieldRegistry } from './FieldRegistry';

export interface IFieldBuilderProps {
    field: IField;
    index: number;
    registry: FieldRegistry;
    onChange: (field: IField, index: number) => void;
    onFieldEditing: (field: IField, done: (field: IField) => void) => void;
}

export interface IFieldBuilderComponent extends React.ComponentClass<IFieldBuilderProps> {
}