import { IField } from './IField';
import { IFieldContext } from './IFieldContext';
import { FieldRegistry } from './FieldRegistry';
import { IEditableControlSource } from './IEditableControlSource';
import { IFieldChange } from './IFieldChange';
import { IFieldState } from './IFormState';
import { IDropTargetItem, IDragSourceItem} from './IDragDrop';
import { FormBuilderIDGenerator } from './IFormBuilder';

export interface IFieldBuilderProps {
    field: IField;
    index: number;
    registry: FieldRegistry;
    editButton?: IEditableControlSource;
    deleteButton?: IEditableControlSource;
    editingFieldId: string;
    fields: IField[];
    onChange: (field: IField, index: number, change: IFieldChange) => void;
    onFieldEditing: (field: IField) => void;
    onBeforeAddField: (field: IField) => boolean;
    onError: (field: IField, index: number, error: any) => void;
    canDrag?: (field: IField) => boolean;
    idGenerator?: FormBuilderIDGenerator;
    canDrop?: (source: IDragSourceItem, target: IDropTargetItem) => boolean;
    parentId?: string;
}

export interface IFieldBuilderWrapperProps extends IFieldBuilderProps {
    onDrop: (target: IDropTargetItem, source: IDragSourceItem, didDrop: boolean) => void;
    onEditField: (field: IField) => void;
    onDeleteField: (index: number) => void;
}

export interface IGenericFieldBuilderProps<T extends IField> extends IFieldBuilderProps {
    field: T
}

export interface IFieldBuilderComponent extends React.ComponentClass<IFieldBuilderProps> {
}
