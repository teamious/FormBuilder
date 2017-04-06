import { IField, IGenericField } from './IField';
import { IFieldError } from './IFieldError';
import { FieldRegistry } from './FieldRegistry';

export interface IFieldInputProps {
    registry: FieldRegistry;
    // The current field index of the current form.
    index: number;
    // The field definition.
    field: IField;
    // The current value of this field in the form.
    value: any;
    // The values of the current form. Look up field key in order to depend on the other field value.
    values: Array<{}>;
    // It indicates whether user has tried to submit.
    attempt: boolean;

    // The callback when the value has been changed.
    onValueChange: (field: IField, value: any, error: IFieldError) => void;
}

export interface IGenericFieldInputProps<T> extends IFieldInputProps {
    field: IGenericField<T>;
}

export interface IFieldInputComponent extends React.ComponentClass<IFieldInputProps> {
}