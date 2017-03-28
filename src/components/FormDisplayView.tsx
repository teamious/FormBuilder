import * as React from 'react';
import * as assign from 'object-assign';

import * as data from '../data';

interface IProps {
    fields: data.IField[];
    registry: data.FieldRegistry;
    value: any;
}

interface IState { }

export default class FormDisplayView extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.renderField = this.renderField.bind(this);
    }
    render() {
        return (
            <div className='form-view'>
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
            <div className='form-view-field' key={index}>
                {component}
            </div>
        )
    }
}