import * as React from 'react';
import * as classNames from 'classnames'
import * as data from '../data';

export interface IFormBuilderEditableProps {
    field: data.IField;
    index: number;
    isEditing: boolean;
    showEditButton?: boolean;
    editButton?: data.IEditableControlSource;
    deleteButton?: data.IEditableControlSource;
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

    private onEdit(event: React.MouseEvent<HTMLElement>) {
        event.stopPropagation();
        event.preventDefault();
        this.props.onEdit(this.props.field);
    }

    private onDelete(event: React.MouseEvent<HTMLElement>) {
        event.stopPropagation();
        event.preventDefault();
        this.props.onDelete(this.props.index);
    }

    private onClicked(event: any) {
        event.stopPropagation();
        event.preventDefault();
        this.props.onEdit(this.props.field);
    }

    private renderEditButton() {
        const source = this.props.editButton;

        if (!this.props.showEditButton) {
            return null;
        }

        if (!source || typeof source === 'string') {
            return (
                <button className='form-builder-editable-button form-builder-editable-edit-button' type='button' onClick={this.onEdit}>
                    {source || 'Edit'}
                </button>
            )
        }

        if (React.isValidElement(source)) {
            return React.cloneElement(source, {
                onClick: this.onEdit,
                className: classNames(source.props.className, 'form-builder-editable-button form-builder-editable-edit-button'),
            })
        }
    }

    private renderDeleteButton() {
        const source = this.props.deleteButton;

        if (!source || typeof source === 'string') {
            return (
                <button className='form-builder-editable-button form-builder-editable-delete-button' type='button' onClick={this.onEdit}>
                    {source || 'Delete'}
                </button>
            )
        }

        if (React.isValidElement(source)) {
            return React.cloneElement(source, {
                onClick: this.onDelete,
                className: classNames(source.props.className, 'form-builder-editable-button form-builder-editable-delete-button'),
            })
        }
    }

    render() {
        const css = classNames(
            'form-builder-editable-controls',
            {
                'form-builder-editing-controls': this.props.isEditing
            }
        );
        return (
            <div className={css} onClick={this.onClicked}>
                {this.renderEditButton()}
                {this.renderDeleteButton()}
                {this.props.children}
            </div>
        );
    }
}