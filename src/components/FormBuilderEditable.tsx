import * as React from 'react';
import * as classNames from 'classnames'
import * as data from '../data';

export interface IFormBuilderEditableProps {
    field: data.IField;
    index: number;
    isEditing: boolean;
    showEditButton?: boolean;
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
        this.onClicked = this.onClicked.bind(this);
    }

    private onEdit() {
        this.props.onEdit(this.props.field);
    }

    private onDelete() {
        this.props.onDelete(this.props.index);
    }

    private onClicked() {
        this.props.onEdit(this.props.field);
    }

    render() {
        const editButtonText = this.props.editButtonText || 'Edit';
        const deleteButtonText = this.props.deleteButtonText || 'Delete';
        const css = classNames(
            'form-builder-editable-controls',
            {
                'form-builder-editing-controls': this.props.isEditing
            }
        );
        return (
            <div className={css} onClick={this.onClicked}>
                {
                    this.props.showEditButton && <button className='form-builder-editable-button form-builder-editable-edit-button' type='button' onClick={this.onEdit}>
                        {editButtonText}
                    </button>
                }
                <button className='form-builder-editable-button form-builder-editable-delete-button' type='button' onClick={this.onDelete}>
                    {deleteButtonText}
                </button>
                {this.props.children}
            </div>
        );
    }
}