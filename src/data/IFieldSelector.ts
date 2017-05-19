import { IField } from './IField';

export interface IFieldSelectorProps {
    field: IField;
}

export interface IFieldSelectorComponent extends React.ComponentClass<IFieldSelectorProps> {
}