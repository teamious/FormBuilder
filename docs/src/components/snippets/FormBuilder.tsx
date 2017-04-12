import * as React from 'react';
import SingleSelector from '../fields/SingleSelector';
import SingleSelectorOptionEditor from '../fields/SingleSelectorOptionEditor';
import SingleLineTextField from '../fields/SingleLineTextField';
import SingleLineTextFieldOptionEditor from '../fields/SingleLineTextFieldOptionEditor'
import {
    FormBuilder,
    FieldRegistry,
    IField
} from 'react-dynamic-formbuilder';


interface IProps {}

interface IState {
    fields: IField[],
}


export const registry: FieldRegistry = new FieldRegistry();
registry.register({
    field: {
        id: '',
        label: 'Please select:',
        type: 'SingleSelector',
        options: {
            selectOpts: ['a', 'b', 'c'],
        }
    },
    type: 'SingleSelector',
    displayName: '单选(selector)',
    input: SingleSelector,
    builder: SingleSelector,
    editor: SingleSelectorOptionEditor,
    display: null,
});

registry.register({
    field: {
        id: '',
        label: 'Name',
        type: 'SingleLineTextField',
        options: {
            hint: 'Please enter your name',
            required: true,
            unique: false,
        }
    },
    type: 'SingleLineTextField',
    displayName: '单行输入(input)',
    input: SingleLineTextField,
    builder: SingleLineTextField,
    editor: SingleLineTextFieldOptionEditor,
    display: null,
});


export default class extends React.Component<IProps, IState> {
    constructor() {
        super();
        this.onChangeFields = this.onChangeFields.bind(this);
        this.state = {
            fields: [
                {
                    id: '',
                    label: 'Please select:',
                    type: 'SingleSelector',
                    options: {
                        selectOpts: ['a', 'b', 'c'],
                    }
                },
                {
                    id: '',
                    label: 'Name',
                    type: 'SingleLineTextField',
                    options: {
                        hint: 'Please enter your name',
                        required: true,
                        unique: false,
                    }
                }
            ]
        }
    }

    private onFieldEditing(field: IField, callback: (field: IField) => void) {
        // Do nothing for this example
    }

    private onChangeFields(fields: IField[]) {
        this.setState({fields} as IState)
    }

    render() {
        return (
            <FormBuilder
                registry={registry}
                onFieldEditing={this.onFieldEditing}
                onChange={this.onChangeFields}
                fields={this.state.fields}/>
        );
    }
}