import * as React from 'react';
import * as assign from 'object-assign';

import * as data from '../data';

export interface IFormInputProps {
    // registry contains a map of field types to classes. FormBuilder
    // uses this map to render the control.
    registry: data.FieldRegistry;

    fields: data.IField[];

    value: any;

    // form submission attempt.
    attempt?: boolean;

    onChange: (value: any, status: data.FormStatus) => void;
}

export interface IFormInputState {
}

export class FormInput extends React.PureComponent<IFormInputProps, IFormInputState> {
    // The status of the current form input component.
    // The status is internal state of form input which is not controled by Props.
    private status: data.FormStatus;

    public static defaultProps: Partial<IFormInputProps> = {
        value: {}
    }

    constructor(props: IFormInputProps) {
        super(props);
        this.status = new data.FormStatus();
        this.renderField = this.renderField.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
    }

    private renderField(field: data.IField, index: number) {
        const fieldDef = this.props.registry[field.type];
        if (!fieldDef || !fieldDef.input) {
            console.warn('Field definition is not registered: ' + field.type);
            return;
        }

        const value = this.props.value[field.id];
        const component = React.createElement(fieldDef.input, {
            registry: this.props.registry,
            index,
            field,
            value,
            values: this.props.value,
            attempt: this.props.attempt,
            onValueChange: this.onValueChanged,
        });

        return (
            <div className='form-submission-field' key={index}>
                {component}
            </div>
        )
    }

    private onValueChanged(field: data.IField, value: any, fieldStatus: data.IFieldStatus) {
        const newValue = assign({}, this.props.value);
        newValue[field.id] = value;
        this.status[field.id] = fieldStatus;
        this.props.onChange(newValue, this.status);
    }

    // render displays a list of fields based on the field registry.
    render() {
        return (
            <div className='form-submission'>
                {this.props.fields.map(this.renderField)}
            </div>
        );
    }
}
