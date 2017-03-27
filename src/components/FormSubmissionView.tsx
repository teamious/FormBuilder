import * as React from 'react';
import * as assign from 'object-assign';

import * as data from '../data';

interface IProps {
    fields: data.IField[];

    // registry contains a map of field types to classes. FormBuilder
    // uses this map to render the control.
    registry: data.FieldRegistry;

    value: any;

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
            console.warn('Field defintion is not registered: ' + field.type);
            return;
        }

        const value = this.props.value[field.key];
        const component = React.createElement(fieldDef.render, {
            field,
            index,
            value,
            registry: this.props.registry,
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

    // render displays a list of fields that have been wrapped in components for
    // providing editing, dragging, and dropping functionality. At the end of the list
    // is a <Droppable> field.
    render() {
        return (
            <div className='form-submission'>
                {this.props.fields.map(this.renderField)}
            </div>
        );
    }
}
