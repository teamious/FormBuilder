import { IField } from './IField';

export interface IDragSourceItem {
    index: number;
    field: IField;
}

export interface IDropTargetItem {
    index: number;
    field: IField;
}