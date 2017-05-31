import * as React from 'react';
import { DropTarget, DropTargetSpec, ConnectDropTarget, DropTargetCollector } from 'react-dnd';
import * as classnames from 'classnames'

import * as data from '../data';
import { FormBuilderDraggable as Draggable } from './FormBuilderDraggable';
import { FormBuilderEditable as Editable } from './FormBuilderEditable';
import { FormBuilderDroppable as Droppable } from './FormBuilderDroppable';
import { FormBuilderContext } from './FormBuilderContext';
import { generateID } from '../utils'

export interface IFormBuilderProps {
    fields: data.IField[];

    // registry contains a map of field types to classes. FormBuilder
    // uses this map to render the control.
    registry: data.FieldRegistry;

    // onChange is called wheneven user changes any settings of fields.
    onChange: (fields: data.IField[], change: data.IFieldChange) => void;

    // onError is called when field builder validates options and gets an error,
    // or error has been resolved.
    onError?: (error: { [id: string]: any }) => void;

    // fieldEditing is called when the user want to edit field options.
    onFieldEditing: (field: data.IField) => void;

    // onBeforeAddField is called before add the new field into the array.
    // If this method returns false, onChange will not be called.
    onBeforeAddField?: (field: data.IField) => boolean;

    // onBeforeDeleteField is called before calling the onDeleteField method.
    // If this method returns false, onDeleteField will not be called.
    onBeforeDeleteField?: (field: data.IField) => boolean;

    // onBeforeEditField is called before calling the onEditField method.
    // If this method returns false, onEditField will not be called.
    onBeforeEditField?: (field: data.IField) => boolean;

    // editButtonText is consumed by the FormBuilderEditable so that
    // i18n strings can be displayed. If not provided, it defaults to English "edit".
    editButton?: data.IEditableControlSource;

    // deleteButtonText is consumed by the FormBuilderEditable so that
    // i18n strings can be displayed. If not provided, it defaults to English "delete".
    deleteButton?: data.IEditableControlSource;

    // idFunc is an optional hook for providing a function to generate ID's for
    // a field. This func will get called whenever a field is added to the formBuilder
    // without an existing ID.
    idGenerator?: data.FormBuilderIDGenerator;

    // canDrag determines whether or not the field can be dragged. If false, the field
    // will not be draggable. This method is called by ReactDnD before the drag operation begins.
    canDrag?: (field: data.IField) => boolean;

    // canDrop determines whether or not the source can be dropped onto target. Note,
    // this method is not called using the addField API on your FormBuilder instance.
    canDrop?: (source: data.IDragSourceItem, target: data.IDropTargetItem) => boolean;

    // editingField is the field that is currently being edited.
    editingFieldId: string;

    // parentId is the ID of the field to which this FormBuilder belongs.
    parentId?: string;

    // The layout will be rendered when there is no fields.
    emptyLayout?: React.ReactNode;
}

// FormBuilder expects a list of field definitions and will wrap each field definition
// in utility components for editing, dragging, and dropping. The FormBuilder uses
// a registry to determine which class is responsible for rendering the field type.
export class FormBuilder extends React.Component<IFormBuilderProps, {}> {
    private builderError: { [id: string]: any } = {};

    constructor(props: IFormBuilderProps) {
        super(props);

        this.renderField = this.renderField.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onEditField = this.onEditField.bind(this);
        this.onDeleteField = this.onDeleteField.bind(this);
        this.onFieldChanged = this.onFieldChanged.bind(this);
        this.onFieldError = this.onFieldError.bind(this);
        this.canDrop = this.canDrop.bind(this);
    }

    // NOTE(andrews): This is public API. Consumers should call this method
    // directly if they wish to add a field to the fields array. This encapsulates
    // all of the behavior surrounding adding a field such as cloning the field,
    // ensuring an ID exists, and running hooks. Internally this method calls onDrop.
    public addField(field: data.IField) {
        const targetIndex = this.props.fields.length;

        const target: data.IDropTargetItem = {
            field: this.props.fields[targetIndex],
            index: targetIndex,
        }

        const source: data.IDragSourceItem = {
            field,
            index: null,
        }

        this.onDrop(target, source, false);
    }

    // onEditField is called when the user wants to edit a field.
    // If the `onBeforeEditField` hook is provided, it will be used
    // to determine if the field can be edited.
    private onEditField(field: data.IField) {
        const hook = this.props.onBeforeEditField;
        if (hook && !hook(field)) {
            return;
        }

        this.props.onFieldEditing(field);
    }

    // onDeleteField is called when the user wants to delete a field.
    // If the `onBeforeDeleteField` hook is provided, it will be used
    // to determine if the field can be deleted.
    private onDeleteField(index: number) {
        const field = this.props.fields[index];
        const hook = this.props.onBeforeDeleteField;
        if (hook && !hook(field)) {
            return;
        }

        let fields = this.props.fields.concat([]);
        fields.splice(index, 1);
        this.props.onChange(fields, {
            action: data.FieldAction.Delete,
            source: field
        });

        if (this.builderError[field.id]) {
            // Resets the deleted field error.
            this.onFieldError(field, index, null);
        }
    }

    // onDrop is called whenever a field is dropped on a <Droppable> component.
    // The field being dropped can come from one of two places:
    //      1. The FieldSelector component
    //      2. A <Draggable/> component being reordered.
    // target and source both contain the index and the IField of the field
    // being dragged, and the field being dropped on.
    // If a field is being dragged from <FieldSelector> then it will not have an index
    // and should simply be inserted.
    // If the source field comes from a <Draggable> component then it must
    // go through removal and insertion. Removal and insertion depend
    // on the source index to keep the integrity of the target index.
    private onDrop(target: data.IDropTargetItem, source: data.IDragSourceItem, didDrop: boolean) {
        if (didDrop) {
            return;
        }

        if (target.index === source.index) {
            return;
        }

        let sourceField = source.field;
        const isAdd = (source.index === null);
        if (isAdd) {
            // NOTE: If source is from the FieldSelector, we should create a clone field.
            sourceField = JSON.parse(JSON.stringify(sourceField));
            this.ensureID(sourceField);
            let hook = this.props.onBeforeAddField;
            if (hook && !hook(sourceField)) {
                return;
            }
        }
        else if (this.props.fields.indexOf(target.field) !== target.index &&
            this.props.fields.indexOf(source.field) !== source.index) {
            // NOTE: For re-ordering, make sure the target & source are in the same level.
            return;
        }

        let fields = this.props.fields.concat([]);
        if (isAdd) {
            fields.splice(target.index, 0, sourceField)
        } else if (source.index < target.index) {
            fields.splice(target.index, 0, sourceField)
            fields.splice(source.index, 1);
        } else {
            fields.splice(source.index, 1);
            fields.splice(target.index, 0, sourceField)
        }
        this.props.onChange(fields, {
            action: isAdd ? data.FieldAction.Add : data.FieldAction.Change,
            source: sourceField
        });
    }

    private ensureID(field: data.IField) {
        if (!field.id) {
            const idFunc = this.props.idGenerator || generateID;
            field.id = idFunc();
        }
    }

    private onFieldChanged(field: data.IField, index: number, change: data.IFieldChange) {
        let fields = this.props.fields.slice();
        fields[index] = field;
        this.props.onChange(fields, change);
    }

    private onFieldError(field: data.IField, index: number, error: any) {
        if (error) {
            this.builderError[field.id] = error;
        }
        else {
            delete this.builderError[field.id];
        }

        const hasError = Object.keys(this.builderError).length > 0;
        this.props.onError(hasError ? this.builderError : null);
    }

    // NOTE(andrews) canDrop holds the business logic for determining if the source item can
    // be dropped on the target item.
    private canDrop(source: data.IDragSourceItem, target: data.IDropTargetItem): boolean {
        // NOTE(andrews): Prohibit moving non-new fields between parents
        // (eg. moving non-nested field into nested form)
        if (source.field.id && source.parentId !== target.parentId) {
            return false;
        }

        // NOTE(andrews): Prohibit the field from being dropped on itself.
        // This prevents the indicator from showing up.
        if (target.field && source.field.id === target.field.id) {
            return false;
        }

        // NOTE(andrews): Prohibit the field from dropped back into the same index.
        if (source.index !== undefined && source.index === target.index - 1) {
            return false;
        }

        if (this.props.canDrop) {
            return this.props.canDrop(source, target);
        }

        return true;
    }

    // renderField takes the field.type to be rendered and looks up the
    // appropriate component class in the registry that can render the component.
    // The rendered component is passed the field as a prop.
    private renderField(field: data.IField, index: number) {
        const fieldDef = this.props.registry[field.type];
        if (!fieldDef || !fieldDef.builder) {
            console.warn('Field defintion is not registered: ' + field.type);
            return;
        }

        const fieldBuilderProps: data.IFieldBuilderWrapperProps = {
            field,
            index,
            registry: this.props.registry,
            editButton: this.props.editButton,
            deleteButton: this.props.deleteButton,
            editingFieldId: this.props.editingFieldId,
            fields: this.props.fields,
            onFieldEditing: this.props.onFieldEditing,
            onChange: this.onFieldChanged,
            onError: this.onFieldError,
            onBeforeAddField: this.props.onBeforeAddField,
            canDrag: this.props.canDrag,
            canDrop: this.canDrop,
            parentId: this.props.parentId,
            onDeleteField: this.onDeleteField,
            onDrop: this.onDrop,
            onEditField: this.onEditField,
            idGenerator: this.props.idGenerator,
        }

        const component = React.createElement(fieldDef.builder, fieldBuilderProps);
        return (
            <div className='form-builder-field' key={field.id}>
                {component}
            </div>
        )
    }

    // render displays a list of fields that have been wrapped in components for
    // providing editing, dragging, and dropping functionality. At the end of the list
    // is a <Droppable> field.
    render() {
        const isEmpty = this.props.fields.length === 0;
        const emptyLayout = this.props.emptyLayout;
        return (
            <FormBuilderContext>
                <div className={classnames('form-builder', { 'form-builder-empty': isEmpty })}>
                    {this.props.fields.map(this.renderField)}
                    <Droppable parentId={this.props.parentId} canDrop={this.canDrop} index={this.props.fields.length} field={null} onDrop={this.onDrop}>
                        <div className='form-builder-default-droppable'>
                            {isEmpty && emptyLayout}
                        </div>
                    </Droppable>
                </div>
            </FormBuilderContext>
        );
    }
}

