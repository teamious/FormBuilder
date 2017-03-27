import * as React from 'react';
import * as data from '../data';
import { DropTarget, DropTargetSpec, ConnectDropTarget, DropTargetCollector } from 'react-dnd';
import { default as Draggable } from './FormBuilderDraggable';
import { default as Editable } from './FormBuilderEditable';
import { default as Droppable } from './FormBuilderDroppable';

interface IProps {
    fields: data.IField[];

    // registry contains a map of field types to classes. FormBuilder
    // uses this map to render the control.
    registry: data.FieldRegistry;

    // onChange is called whenever the user has reordered or added
    // fields to the editor via drag and drop.
    onChange: (fields: data.IField[]) => void;

    // fieldEditing is called when the user want to edit field options.
    onFieldEditing: (field: data.IField, done: (field: data.IField) => void) => void;

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
    editButtonText?: React.ReactNode;

    // deleteButtonText is consumed by the FormBuilderEditable so that
    // i18n strings can be displayed. If not provided, it defaults to English "delete".
    deleteButtonText?: React.ReactNode;
}

interface IState {
}

// FormBuilder expects a list of field definitions and will wrap each field definition
// in utility components for editing, dragging, and dropping. The FormBuilder uses
// a registry to determine which class is responsible for rendering the field type.
class FormBuilder extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.renderField = this.renderField.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onEditField = this.onEditField.bind(this);
        this.onDeleteField = this.onDeleteField.bind(this);
        this.onFieldChanged = this.onFieldChanged.bind(this);
    }

    // onEditField is called when the user wants to edit a field.
    // If the `onBeforeEditField` hook is provided, it will be used
    // to determine if the field can be edited.
    private onEditField(field: data.IField) {
        const hook = this.props.onBeforeEditField;
        if (hook && !hook(field)) {
            return;
        }

        const editingIndex = this.props.fields.indexOf(field);
        this.props.onFieldEditing(field, function (field: data.IField) {
            // TODO: editingIndex may change due to re-order.
            let fields = this.props.fields.slice();
            fields[editingIndex] = field;
            this.props.onChange(fields);
        }.bind(this));
    }

    // onDeleteField is called when the user wants to delete a field.
    // If the `onBeforeDeleteField` hook is provided, it will be used
    // to determine if the field can be deleted.
    private onDeleteField(index: number) {
        let fields = this.props.fields.concat([]);
        const field = this.props.fields[index];
        const hook = this.props.onBeforeDeleteField;
        if (hook && !hook(field)) {
            return;
        }
        fields.splice(index, 1);
        this.props.onChange(fields);
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
        if (source.index === null) {
            // NOTE: If source is from the FieldSelector, we should create a clone field.
            sourceField = JSON.parse(JSON.stringify(sourceField));
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
        if (source.index === null) {
            fields.splice(target.index, 0, sourceField)
        } else if (source.index < target.index) {
            fields.splice(target.index, 0, sourceField)
            fields.splice(source.index, 1);
        } else {
            fields.splice(source.index, 1);
            fields.splice(target.index, 0, sourceField)
        }
        this.props.onChange(fields);
    }

    private onFieldChanged(field: data.IField, index: number) {
        let fields = this.props.fields.slice();
        fields[index] = field;
        this.props.onChange(fields);
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
        const component = React.createElement(fieldDef.builder, {
            field,
            index,
            registry: this.props.registry,
            onFieldEditing: this.props.onFieldEditing,
            onChange: this.onFieldChanged,
            onBeforeAddField: this.props.onBeforeAddField,
        });

        return (
            <div className='form-builder-field'>
                <Droppable
                    index={index}
                    onDrop={this.onDrop}
                    field={field}
                >
                    <Editable
                        onEdit={this.onEditField}
                        onDelete={this.onDeleteField}
                        index={index}
                        field={field}
                    >
                        <Draggable
                            index={index}
                            field={field}
                        >
                            {component}
                        </Draggable>
                    </Editable>
                </Droppable>
            </div>
        )
    }

    // render displays a list of fields that have been wrapped in components for
    // providing editing, dragging, and dropping functionality. At the end of the list
    // is a <Droppable> field.
    render() {
        return (
            <div className='form-builder'>
                {this.props.fields.map(this.renderField)}
                <Droppable index={this.props.fields.length} field={null} onDrop={this.onDrop}>
                    <div style={{ padding: 25 }} />
                </Droppable>
            </div>
        );
    }
}

export default FormBuilder;
