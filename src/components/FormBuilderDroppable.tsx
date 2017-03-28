import * as React from 'react';
import * as data from '../data';
import { DropTarget, DropTargetSpec, DropTargetCollector, ConnectDropTarget } from 'react-dnd';

export interface IFormBuilderDroppableProps {
    index: number;
    field: data.IField;
    onDrop: (target: data.IDropTargetItem, source: data.IDragSourceItem, didDrop: boolean) => void;
}

interface IState {
}

interface IDNDProps {
    isOver: boolean;
    connectDropTarget: ConnectDropTarget;
}

// FormBuilderDroppable provides a droppable container that can be used to wrap a field.
// When a field is dropped into the component, it will call the onDrop method and pass
// the field and index of the source field as well as the current field.
// Since the FormBuilder inserts at the index, an insertion line is displayed
// at the top of the droppable space (or above the field).
class FormBuilderDroppableComponent extends React.Component<IFormBuilderDroppableProps & IDNDProps, IState> {
    render() {
        const { connectDropTarget } = this.props;
        return connectDropTarget(
            <div className='form-builder-droppable'>
                 {/*<div className='form-builder-droppable-indicator'/>*/}
                {this.props.isOver && <div className='form-builder-droppable-indicator'/>}
                {this.props.children}
            </div>
        );
    }
}

const spec: DropTargetSpec<IFormBuilderDroppableProps> = {
    drop(props, monitor) {
        const { index, field } = props;
        const source: data.IDragSourceItem = monitor.getItem() as any;
        const target: data.IDropTargetItem = { field, index };
        const didDrop = monitor.didDrop();
        props.onDrop(target, source, didDrop);
    },
}

const collect: DropTargetCollector = (connect, monitor): IDNDProps => {
    return {
        isOver: monitor.isOver({ shallow: true }),
        connectDropTarget: connect.dropTarget(),
    }
}

export const FormBuilderDroppable = DropTarget([data.FIELD_SELECTOR_FIELD, data.FORM_BUILDER_FIELD], spec, collect)(FormBuilderDroppableComponent) as React.ComponentClass<IFormBuilderDroppableProps>