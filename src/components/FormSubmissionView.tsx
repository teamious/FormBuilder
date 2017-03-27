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
    attempt: boolean;

    onChange: (value: any) => void;
}

interface IState {
}

export default class FormSubmissionView extends React.PureComponent<IProps, IState> {
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

    private onValueChanged(field: data.IField, value: any) {
        const newValue = assign({}, this.props.value);
        newValue[field.key] = value;
        this.props.onChange(newValue);
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
