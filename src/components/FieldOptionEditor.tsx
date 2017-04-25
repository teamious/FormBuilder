import * as React from 'react';
import * as data from '../data/';
import * as util from '../utils';

export interface IFieldOptionEditorComponentProps {
    field: data.IField;
    fields: Array<data.IField>;
    registry: data.FieldRegistry;
    onChange: (editedField: data.IField, fields: data.IField[], change: data.IFieldChange) => void;
}

export interface IFieldOptionEditorState { }

export class FieldOptionEditor extends React.PureComponent<IFieldOptionEditorComponentProps, IFieldOptionEditorState> {
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

        const context = {
            fields: util.getFieldSiblings(field, this.props.fields)
        };

        const optionEditorProps: data.IFieldOptionEditorProps = {
            field,
            fieldContext: context,
            onChange: this.onOptionChanged
        };

        const component = React.createElement(fieldDef.editor, optionEditorProps);
        return (
            <div className='field-option-editor'>
                {component}
            </div>
        )
    }

    private onOptionChanged(field: data.IField) {
        const fields = util.updateField(this.props.field, field, this.props.fields);
        this.props.onChange(field, fields, {
            action: data.FieldAction.Change,
            source: field
        });
    }
}
