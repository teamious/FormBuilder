import * as React from 'react';
import * as assign from 'object-assign';
import { Panel } from 'react-bootstrap';
import * as data from '../../../../src/data';
import FormBuilder from '../../../../src/components/FormBuilder';

interface IState { }

interface IProps {
    index: number;
    field: data.IField;
    registry: data.FieldRegistry;
    onFieldEditing: (field: data.IField, done: (field: data.IField) => void) => void;
    onChange: (field: data.IField, index: number) => void;
}

export default class NestedField extends React.PureComponent<IProps, IState> {
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
        if (field.type === NestedField.type) {
            console.warn('Nested Field cannot be added into another Nested Field.');
            return false;
        }

        return true;
    }

    render() {
        return (
            <Panel>
                <FormBuilder
                    registry={this.props.registry}
                    onFieldEditing={this.props.onFieldEditing}
                    onBeforeAddField={this.onBeforeAddField}
                    fields={this.props.field.fields}
                    onChange={this.onChangeFields}
                />
            </Panel>
        )
    }
}