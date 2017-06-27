import * as React from 'react';
import * as data from '../data/';
import * as util from '../utils';

export interface IFieldOptionEditorComponentProps {
    field: data.IField;
    fields: Array<data.IField>;
    registry: data.FieldRegistry;
    onChange: (editedField: data.IField, fields: data.IField[], error: any) => void;
    onError?: (field: data.IField, error: any) => void;
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
            onChange: this.onOptionChanged,
            onError: this.props.onError,
        };

        const component = React.createElement(fieldDef.editor, optionEditorProps);
        return (
            <div className='field-option-editor'>
                {component}
            </div>
        )
    }

    private onOptionChanged(field: data.IField, error: any) {
        const fields = util.updateFieldInFieldTree(field, this.props.fields);
        if (!fields) {
            console.warn('cannot update field inside fields.', this.props.field, this.props.fields);
        }
        else {
            this.props.onChange(field, fields, error);
        }
    }
}
