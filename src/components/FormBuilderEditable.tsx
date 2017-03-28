import * as React from 'react';
import * as data from '../data';

export interface IFormBuilderEditableProps {
    field: data.IField;
    index: number;
    editButtonText?: string;
    deleteButtonText?: string;
    onEdit: (field: data.IField) => void;
    onDelete: (index: number) => void;
}

export interface IFormBuilderEditableState {
}

// FormBuilderEditable is a wrapper component that will wrap a field and display controls
// for editing and deleting a field.
export class FormBuilderEditable extends React.Component<IFormBuilderEditableProps, IFormBuilderEditableState> {
    constructor() {
        super();
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    private onEdit() {
        this.props.onEdit(this.props.field);
    }

    private onDelete() {
        this.props.onDelete(this.props.index);
    }

    render() {
        const editButtonText = this.props.editButtonText || 'Edit';
        const deleteButtonText = this.props.deleteButtonText || 'Delete';
        return (
            <div className='form-builder-editable-controls'>
                <button className='form-builder-editable-button form-builder-editable-edit-button' type='button' onClick={this.onEdit}>
                    {editButtonText}
                </button>
                <button className='form-builder-editable-button form-builder-editable-delete-button' type='button' onClick={this.onDelete}>
                    {deleteButtonText}
                </button>
                {this.props.children}
            </div>
        );
    }
}