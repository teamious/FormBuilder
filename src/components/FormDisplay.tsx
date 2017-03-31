import * as React from 'react';
import * as assign from 'object-assign';

import * as data from '../data';

export interface IFormDisplayProps {
    fields: data.IField[];
    registry: data.FieldRegistry;
    value: any;
}

export interface IFormDisplayState { }

export class FormDisplay extends React.PureComponent<IFormDisplayProps, IFormDisplayState> {
    constructor(props: IFormDisplayProps) {
        super(props);

        this.renderField = this.renderField.bind(this);
    }
    render() {
        return (
            <div className='form-display'>
                {this.props.fields.map(this.renderField)}
            </div>
        )
    }

    private renderField(field: data.IField, index: number) {
        const fieldDef = this.props.registry[field.type];
        if (!fieldDef || !fieldDef.display) {
            console.warn('Field defintion is not registered: ' + field.type);
            return;
        }
        const value = this.props.value[field.key];
        const component = React.createElement(fieldDef.display, {
            field,
            index,
            value,
            registry: this.props.registry,
        });

        return (
            <div className='form-display-field' key={index}>
                {component}
            </div>
        )
    }
}