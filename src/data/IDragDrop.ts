import { IField } from './IField';

export interface IDragSourceItem {
    index?: number;
    field: IField;
    parentId?: string;
}

export interface IDropTargetItem {
    index: number;
    field?: IField;
    parentId?: string;
}