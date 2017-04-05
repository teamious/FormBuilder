import { IField, IGenericField } from './IField';
import { IFieldError } from './IFieldError';
import { FieldRegistry } from './FieldRegistry';

export interface IFieldRenderProps {
    registry: FieldRegistry;
    index: number;
    field: IField;
    value: any;
    attempt: boolean;
    onValueChange: (field: IField, value: any, error: IFieldError) => void;
}

export interface IGenericFieldRenderProps<T> extends IFieldRenderProps {
    field: IGenericField<T>;
}

export interface IFieldRenderComponent extends React.ComponentClass<IFieldRenderProps> {
}