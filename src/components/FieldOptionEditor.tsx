import * as React from 'react';
import * as data from '../data';

interface IProps {
    field: data.IField;
    registry: data.FieldRegistry;
    onChange: (field: data.IField) => void;
}

interface IState { }

export default class FieldOptionEditor extends React.PureComponent<IProps, IState> {
    constructor() {
        super();
        this.onOptionChanged = this.onOptionChanged.bind(this);
    }

    public render() {
        const field = this.props.field;
        if (!field) {
            return <div />;
        }

        const fieldDef = this.props.registry[field.type];
        if (!fieldDef || !fieldDef.editor) {
            console.warn('Field defintion is not registered: ' + field.type);
            return <div />;
        }

        const component = React.createElement(fieldDef.editor, {field, onChange: this.onOptionChanged});

        return (
            <div>
                <div>Options Editor</div>
                {component}
            </div>
        );
    }

    private onOptionChanged(field: data.IField) {
        this.props.onChange(field);
    }
}
