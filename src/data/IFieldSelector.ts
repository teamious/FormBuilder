import { IField } from './IField';

export interface IFieldSelectorItemProps {
    field: IField;
}

export interface IFieldSelectorComponent extends React.ComponentClass<IFieldSelectorItemProps> {
}