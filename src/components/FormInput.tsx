import * as React from 'react';
import * as assign from 'object-assign';

import * as data from '../data';

export interface IFormInputProps {
    // registry contains a map of field types to classes. FormBuilder
    // uses this map to render the control.
    registry: data.FieldRegistry;

    fields: data.IField[];

    value: any;

    // Context provides additional context which will be passed to each form field input.
    context?: any;

    // form submission attempt.
    attempt?: boolean;

    onChange: (value: any, state: data.IFormState) => void;
}

export class FormInput extends React.PureComponent<IFormInputProps, {}> {
    // The status of the current form input component.
    // The status is internal state of form input.
    private formState: data.IFormState;
    private fieldInputs: { [index: string]: any } = {};

    public static defaultProps: Partial<IFormInputProps> = {
        value: {}
    }

    // NOTE(andrews): transformValue can be used by the consumer to manually transform
    // the value object.
    public transformValue() {
        const value = JSON.parse(JSON.stringify(this.props.value));
        this.fireValuesChange(value);
        this.onChange(value);
    }

    constructor(props: IFormInputProps) {
        super(props);
        this.formState = {};
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
        const fieldInputProps = {
            registry: this.props.registry,
            index,
            field,
            value,
            context: this.props.context,
            attempt: this.props.attempt,
            onValueChange: this.onValueChanged,
            ref: (input: any) => {
                this.fieldInputs[index] = input
            }
        };

        const component = React.createElement(fieldDef.input, fieldInputProps);

        return (
            <div className='form-input-field' key={index}>
                {component}
            </div>
        )
    }

    private onValueChanged(field: data.IField, value: any, fieldStatus: data.IFieldState) {
        const newValue = assign({}, this.props.value);
        newValue[field.id] = value;
        this.fireValuesChange(newValue);

        if (fieldStatus.error) {
            this.formState[field.id] = fieldStatus;
        } else {
            delete this.formState[field.id];
        }
        this.onChange(newValue)
    }

    private fireValuesChange(value: any) {
        this.props.fields.forEach((field, index) => {
            const input = this.fieldInputs[index];
            if (input && input.onValuesChanged) {
                const fieldState = input.onValuesChanged(value);
                if (fieldState) {
                    this.formState[field.id] = fieldState;
                }
                else {
                    delete this.formState[field.id];
                }
            }
        })
    }

    public onChange(value: any) {
        const formState = Object.keys(this.formState).length > 0 ? this.formState : null;
        this.props.onChange(value, formState)
    }

    // render a list of fields based on the field registry.
    render() {
        return (
            <div className='form-input'>
                {this.props.fields.map(this.renderField)}
            </div>
        );
    }
}
