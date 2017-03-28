import * as React from 'react';
import * as assign from 'object-assign';

import * as data from '../data';

interface IProps {
    // registry contains a map of field types to classes. FormBuilder
    // uses this map to render the control.
    registry: data.FieldRegistry;

    fields: data.IField[];

    value: any;

    // form submission attempt.
    attempt?: boolean;

    onChange: (value: any, errors: data.IFormError) => void;
}

interface IState {
}

export default class FormSubmissionView extends React.PureComponent<IProps, IState> {
    // This maintains all field errors during onValueChanged.
    private errors: data.IFormError;

    public static defaultProps: Partial<IProps> = {
        value: {}
    }

    constructor(props: IProps) {
        super(props);
        this.renderField = this.renderField.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
    }

    private renderField(field: data.IField, index: number) {
        const fieldDef = this.props.registry[field.type];
        if (!fieldDef || !fieldDef.render) {
            console.warn('Field definition is not registered: ' + field.type);
            return;
        }

        const value = this.props.value[field.key];
        const component = React.createElement(fieldDef.render, {
            registry: this.props.registry,
            index,
            field,
            value,
            attempt: this.props.attempt,
            onValueChange: this.onValueChanged,
        });

        return (
            <div className='form-submission-field' key={index}>
                {component}
            </div>
        )
    }

    private onValueChanged(field: data.IField, value: any, error: data.IFieldError) {
        const newValue = assign({}, this.props.value);
        newValue[field.key] = value;
        this.errors = this.errors || {} as data.IFormError;
        if (error) {
            this.errors[field.key] = error;
        }
        else {
            delete this.errors[field.key];
        }

        // NOTE: If there are no errors from the fields, set errors to be null.
        if (Object.getOwnPropertyNames(this.errors).length === 0) {
            this.errors = null;
        }

        this.setState({ errors: this.errors });
        this.props.onChange(newValue, this.errors);
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
