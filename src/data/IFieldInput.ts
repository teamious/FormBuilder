import { IField } from './IField';
import { IFieldState } from './IFormState';
import { FieldRegistry } from './FieldRegistry';

export interface IFieldInputProps {
    registry: FieldRegistry;
    // The current field index of the current form.
    index: number;
    // The field definition.
    field: IField;
    // The current value of this field in the form.
    value: any;
    // It indicates whether user has tried to submit.
    attempt: boolean;

    // The callback when the value has been changed.
    onValueChange: (field: IField, value: any, fieldStatus: IFieldState) => void;
}

export interface IGenericFieldInputProps<T extends IField, V> extends IFieldInputProps {
    field: T;
    value: V;
}

export interface IFieldInputComponent extends React.ComponentClass<IFieldInputProps> {
}