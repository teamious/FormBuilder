import * as React from 'react';
import * as data from '../data';
import { DropTarget, DropTargetSpec, ConnectDropTarget, DropTargetCollector } from 'react-dnd';
import {default as Draggable} from './FormBuilderDraggable';
import {default as Editable} from './FormBuilderEditable';
import {default as Droppable} from './FormBuilderDroppable';

// IRegistry maps field types to the class responsible for rendering the field.
interface IRegistry {
    [key:string]: React.ComponentClass<any>;
}

interface IProps {
    fields: data.IField[];

    // onChange is called whenever the user has reordered or added
    // fields to the editor via drag and drop.
    onChange: (fields: data.IField[]) => void;

    // registry contains a map of field types to classes. FormBuilder
    // uses this map to render the control.
    registry: IRegistry;

    // onEditField is called whenever the user
    onEditField: (field: data.IField) => void;

    // onDeleteField is called whenever the user has deleted a field.
    // it returns the list of fields after the field has been removed.
    onDeleteField: (fields: data.IField[]) => void;

    // onBeforeDeleteField is called before calling the onDeleteField method.
    // If this method returns false, onDeleteField will not be called.
    onBeforeDeleteField?: (field: data.IField) => boolean;

    // onBeforeEditField is called before calling the onEditField method.
    // If this method returns false, onEditField will not be called.
    onBeforeEditField?: (field: data.IField) => boolean;

    // editButtonText is consumed by the FormBuilderEditable so that
    // i18n strings can be displayed. If not provided, it defaults to English "edit".
    editButtonText?: string;

    // deleteButtonText is consumed by the FormBuilderEditable so that
    // i18n strings can be displayed. If not provided, it defaults to English "delete".
    deleteButtonText?: string;
}

interface IState {
}

interface IDNDProps {
    connectDropTarget: ConnectDropTarget;
}

class FormBuilder extends React.Component<IProps & IDNDProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.renderField = this.renderField.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onEditField = this.onEditField.bind(this);
        this.onDeleteField = this.onDeleteField.bind(this);
        this.state = {};
    }

    private onEditField(field: data.IField) {
        this.props.onEditField(field);
    }

    private onDeleteField(index: number) {
        let fields = this.props.fields.concat([]);
        fields.splice(index, 1);
        this.props.onDeleteField(fields);
    }

    private onDrop(target: data.IDropTargetItem, source: data.IDragSourceItem) {
        if (target.index === source.index) {
            return;
        }
        let fields = this.props.fields.concat([]);
        if (source.index == null) {
            fields.splice(target.index, 0, source.field)
        } else if (source.index < target.index) {
            fields.splice(target.index, 0, source.field)
            fields.splice(source.index, 1);
        } else {
            fields.splice(source.index, 1);
            fields.splice(target.index, 0, source.field)
        }
        this.props.onChange(fields);
    }

    private renderField(field: data.IField, index: number) {
        const componentClass = this.props.registry[field.type];
        if (!componentClass) {
            console.warn('Component not registered: ' + field.type);
            return;
        }
        const component = React.createElement(componentClass, field);

        return (
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
                    <Droppable
                        index={index}
                        onDrop={this.onDrop}
                        field={field}
                    >
                        {component}
                    </Droppable>
                </Draggable>
            </Editable>
        )
    }

    render() {
        const {connectDropTarget} = this.props;
        return connectDropTarget(
            <div>
                {this.props.fields.map(this.renderField)}
                <Droppable index={this.props.fields.length} field={null} onDrop={this.onDrop}>
                    <div style={{padding: 25}}/>
                </Droppable>
            </div>
        );
    }
}

const spec: DropTargetSpec<IProps> = {
    drop(props, monitor) {
        const item: data.IDragSourceItem = monitor.getItem() as any;
        props.onChange([item.field]);
    },

    canDrop(props): boolean {
        return props.fields.length == 0;
    }
}

const collect: DropTargetCollector = (connect, monitor): IDNDProps => {
    return {
        connectDropTarget: connect.dropTarget(),
    }
}

export default DropTarget(data.FIELD_SELECTOR_FIELD, spec, collect)(FormBuilder) as React.ComponentClass<IProps>;
