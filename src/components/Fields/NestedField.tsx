import * as React from 'react';
import * as assign from 'object-assign';
import * as data from '../../data';
import FormBuilder from '../FormBuilder';

interface IState { }

interface IProps {
    index: number;
    field: data.IField;
    registry: data.FieldRegistry;
    onFieldEditing: (field: data.IField, done: (field: data.IField) => void) => void;
    onChange: (field: data.IField, index: number) => void;
}

export default class NestedField extends React.PureComponent<IProps, IState> {
    constructor() {
        super();
        this.onChangeFields = this.onChangeFields.bind(this);
    }

    private onChangeFields(fields: data.IField[]) {
        let field = assign({}, this.props.field);
        field.fields = fields;
        this.props.onChange(field, this.props.index);
    }

    render() {
        return <FormBuilder
            registry={this.props.registry}
            onFieldEditing={this.props.onFieldEditing}
            fields={this.props.field.fields}
            onChange={this.onChangeFields} />
    }
}