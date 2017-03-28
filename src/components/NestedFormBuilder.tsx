import * as React from 'react';
import * as assign from 'object-assign';
import * as data from '../data';
import { FormBuilder } from './FormBuilder';

export interface IFieldBuilderState { }

export class NestedFormBuilder extends React.PureComponent<data.IFieldBuilderProps, IFieldBuilderState> {
    static type = 'NestedForm';
    constructor() {
        super();
        this.onChangeFields = this.onChangeFields.bind(this);
        this.onBeforeAddField = this.onBeforeAddField.bind(this);
    }

    private onChangeFields(fields: data.IField[]) {
        let field = assign({}, this.props.field);
        field.fields = fields;
        this.props.onChange(field, this.props.index);
    }

    private onBeforeAddField(field: data.IField): boolean {
        if (field.type === NestedFormBuilder.type) {
            console.warn('Nested Field cannot be added into another Nested Field.');
            return false;
        }

        return true;
    }

    render() {
        return (
            <div className='form-builder-nested'>
                <FormBuilder
                    registry={this.props.registry}
                    onFieldEditing={this.props.onFieldEditing}
                    onBeforeAddField={this.onBeforeAddField}
                    fields={this.props.field.fields}
                    onChange={this.onChangeFields}
                />
            </div>
        )
    }
}