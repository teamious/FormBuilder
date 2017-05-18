import * as React from 'react';
import * as assign from 'object-assign';

import * as data from '../../data';
import { NestedForm } from '.'
import { FormBuilder } from '../FormBuilder';
import { createFieldBuilderWrapper } from '../FieldBuilderWrapper';

export class NestedFormBuilder extends React.PureComponent<data.IFieldBuilderProps, {}> {
    constructor() {
        super();
        this.onChangeFields = this.onChangeFields.bind(this);
        this.onBeforeAddField = this.onBeforeAddField.bind(this);
        this.onError = this.onError.bind(this);
    }

    private onChangeFields(fields: data.IField[], change: data.IFieldChange) {
        let field = assign({}, this.props.field);
        field.fields = fields;
        this.props.onChange(field, this.props.index, change);
    }

    private onBeforeAddField(field: data.IField): boolean {
        if (field.type === NestedForm.Type) {
            console.warn('Nested Field cannot be added into another Nested Field.');
            return false;
        }

        const hook = this.props.onBeforeAddField;
        if (hook) {
            return hook(field);
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
                    canDrop={this.props.canDrop}
                />
            </div>
        )
    }
}

export const NestedFormBuilderWrapper = createFieldBuilderWrapper()(NestedFormBuilder);