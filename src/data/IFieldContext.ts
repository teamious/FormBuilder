import { IField } from './IField';

export interface IFieldContext {
    // The fields under the same context of the form.
    fields: IField[];
}