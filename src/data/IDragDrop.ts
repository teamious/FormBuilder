import { IField } from './IField';

export interface IDragSourceItem {
    field: IField;

    // NOTE(andrews): parentId is undefined when the source
    // has not yet been inserted into the fields array OR
    // the source is a root level field.
    parentId?: string;

    // NOTE(andrews): index is undefined when the source
    // has not yet been inserted into the fields array.
    index?: number;
}

export interface IDropTargetItem {
    index: number;

    // NOTE(andrews): field is undefined when the target
    // is a non-existent field such as the placeholder droppable.
    field?: IField;

    // NOTE(andrews): parentId is undefined when the target
    // is a root level field.
    parentId?: string;
}