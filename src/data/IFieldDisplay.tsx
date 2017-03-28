import { IField } from './IField';
import { FieldRegistry } from './FieldRegistry';

export interface IFieldDisplayProps {
    registry: FieldRegistry;
    field: IField;
    index: number;
    value: any;
}

export interface IFieldDisplayComponent extends React.ComponentClass<IFieldDisplayProps> {
}