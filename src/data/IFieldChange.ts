import { IField } from './IField';

export enum FieldAction {
    Change,
    Add,
    Delete
}

export interface IFieldChange {
    action: FieldAction,
    source: IField,
}