import { IField } from './IField';
import { FieldRegistry } from './FieldRegistry';

export interface IFieldRenderProps {
    registry: FieldRegistry;
    field: IField;
    index: number;
    value: any;
    onValueChange: (field: IField, value: any) => void;
}

export interface IFieldRenderComponent extends React.ComponentClass<IFieldRenderProps> {
}