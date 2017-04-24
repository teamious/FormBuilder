import { IField } from './IField';
import { IFieldState } from './IFormState';

export interface IFieldInjector {
    // The event will be triggered when form values has been changed.
    // The corresponding values update can be preformed here.
    onValuesChanged?: (field: IField, values: { [id: string]: any }) => IFieldState;
}