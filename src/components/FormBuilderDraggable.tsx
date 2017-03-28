import * as React from 'react';
import * as data from '../data';
import { DragSource, DragSourceCollector, ConnectDragSource, DragSourceSpec } from 'react-dnd';

export interface IFormBuilderDraggableProps {
    index: number;
    field: data.IField;
}

interface IState {}

interface IDNDProps {
    connectDragSource: ConnectDragSource;
}

// FormBuilderDraggable wraps a field in a draggable DOM node. When the user starts
// dragging this field, it will send the index and field to the drag and drop context
// that can be consumed by a drop target.
class FormBuilderDraggableComponent extends React.Component<IFormBuilderDraggableProps & IDNDProps, IState> {
    render() {
        const {connectDragSource} = this.props;
        return connectDragSource(
            <div>
                {this.props.children}
            </div>
        );
    }
}

const spec: DragSourceSpec<IFormBuilderDraggableProps> = {
    beginDrag(props): data.IDragSourceItem {
        return {
            index: props.index,
            field: props.field,
        }
    }
}

const collect: DragSourceCollector = (connect, monitor): IDNDProps => {
    return {
        connectDragSource: connect.dragSource(),
    }
}

export const FormBuilderDraggable = DragSource(data.FORM_BUILDER_FIELD, spec, collect)(FormBuilderDraggableComponent) as React.ComponentClass<IFormBuilderDraggableProps>;
