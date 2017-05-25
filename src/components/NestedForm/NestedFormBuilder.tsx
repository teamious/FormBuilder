import * as React from 'react';
import * as assign from 'object-assign';

import * as data from '../../data';
import { NestedForm } from '.'
import { FormBuilder } from '../FormBuilder';
import { createFieldBuilderWrapper } from '../FieldBuilderWrapper';

export interface INestedFormBuilderProps {
    emptyLayout?: React.ReactNode;
}

export class NestedFormBuilder extends React.PureComponent<data.IFieldBuilderProps & INestedFormBuilderProps, void> {
    constructor() {
        super();
        this.onChangeFields = this.onChangeFields.bind(this);
        this.onBeforeAddField = this.onBeforeAddField.bind(this);
        this.onError = this.onError.bind(this);
        this.canDrop = this.canDrop.bind(this);
    }

    private onChangeFields(fields: data.IField[], change: data.IFieldChange) {
        let field = assign({}, this.props.field);
        field.fields = fields;
        this.props.onChange(field, this.props.index, change);
    }

    private onBeforeAddField(field: data.IField): boolean {
        field.parentId = this.props.field.id;

        const hook = this.props.onBeforeAddField;
        if (hook) {
            return hook(field);
        }

        return true;
    }

        // NOTE(andrews) canDrop holds the business logic for determining if the source item can
    // be dropped on the target item.
    private canDrop(source: data.IDragSourceItem, target: data.IDropTargetItem): boolean {
        // NOTE(andrews): Prohibit more than one layer of nested fields
        if (source.field.type === 'NestedForm' &&  target.parentId) {
            return false;
        }

        if (this.props.canDrop) {
            return this.props.canDrop(source, target);
        }

        return true;
    }

    private onError(error: any) {
        this.props.onError(this.props.field, this.props.index, error);
    }

    render() {
        return (
            <div className='form-builder-nested'>
                <div className='form-builder-nested-label'>{this.props.field.label}</div>
                <FormBuilder
                    editButton={this.props.editButton}
                    deleteButton={this.props.deleteButton}
                    registry={this.props.registry}
                    editingFieldId={this.props.editingFieldId}
                    onFieldEditing={this.props.onFieldEditing}
                    onBeforeAddField={this.onBeforeAddField}
                    fields={this.props.field.fields}
                    onChange={this.onChangeFields}
                    onError={this.onError}
                    canDrag={this.props.canDrag}
                    canDrop={this.canDrop}
                    idGenerator={this.props.idGenerator}
                    parentId={this.props.field.id}
                    emptyLayout={this.props.emptyLayout}
                />
            </div>
        )
    }
}

export const NestedFormBuilderWrapper: React.ComponentClass<data.IFieldBuilderProps & INestedFormBuilderProps> = createFieldBuilderWrapper()(NestedFormBuilder);