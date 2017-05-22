import { IField } from './IField';

export interface IFieldSelectorItemProps {
    field: IField;
    onClick?: (field: IField) => void;
}

export interface IFieldSelectorComponent extends React.ComponentClass<IFieldSelectorItemProps> {
}