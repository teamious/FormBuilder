import * as React from 'react';

import { FormBuilderDraggable as Draggable } from './FormBuilderDraggable';
import { FormBuilderEditable as Editable } from './FormBuilderEditable';
import { FormBuilderDroppable as Droppable } from './FormBuilderDroppable';
import * as data from '../data';

export interface FieldBuilderCreator {
    (FieldBuilder: data.IFieldBuilderComponent): React.ComponentClass<data.IFieldBuilderProps>
}

export function createFieldBuilderWrapper(): FieldBuilderCreator {
    return (FieldBuilder: data.IFieldBuilderComponent) => {
        return class FieldBuilderWrapper extends React.PureComponent<data.IFieldBuilderWrapperProps, void> {
            public render() {
                const isEditing = (this.props.field.id === this.props.editingFieldId);
                const {onDrop, onEditField, onDeleteField, ...builderProps} = this.props;
                return (
                    <Droppable
                        canDrop={this.props.canDrop}
                        index={this.props.index}
                        onDrop={onDrop}
                        field={this.props.field}
                        parentId={builderProps.parentId}
                    >
                        <Editable
                            deleteButton={this.props.deleteButton}
                            showDeleteButton
                            editButton={this.props.editButton}
                            onEdit={onEditField}
                            onDelete={onDeleteField}
                            index={this.props.index}
                            field={this.props.field}
                            isEditing={isEditing}
                        >
                            <Draggable
                                canDrag={this.props.canDrag}
                                index={this.props.index}
                                field={this.props.field}
                                parentId={builderProps.parentId}
                            >
                                <FieldBuilder {...builderProps} />
                            </Draggable>
                        </Editable>
                    </Droppable>
                )
            }
        }
    }
}