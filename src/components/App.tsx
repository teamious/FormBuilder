import * as React from 'react';
import FieldSelector from './FieldSelector';
import FormBuilder from './FormBuilder';
import * as data from '../data';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import FieldOptionEditor from './FieldOptionEditor'

import SingleSelector from './Fields/SingleSelector';
import SingleSelectorOptionEditor from './Fields/SingleSelectorOptionEditor';
import SingleLineTextField from './Fields/SingleLineTextField';
import SingleLineTextFieldOptionEditor from './Fields/SingleLineTextFieldOptionEditor'
import NestedField from './Fields/NestedField';

const options: data.IField[] = [
    {
        label: 'Single selector',
        type: 'SingleSelector',
        options: {
            selectOpts: ['a', 'b', 'c']
        }
    },
    {
        label: 'Single line text field',
        type: 'SingleLineTextField',
        options: {
            label: 'Name',
            hint: 'Please enter your name',
            required: true,
            unique: false,
        }
    },
    {
        label: 'Detail',
        type: 'Detail',
        fields: [],
    }
];

interface IProps {
}

interface IState {
    fields: data.IField[],
    selectedField: data.IField,
}

const registry: data.FieldRegistry = {
    'SingleSelector': { render: SingleSelector, editor: SingleSelectorOptionEditor },
    'SingleLineTextField': { render: SingleLineTextField, editor: SingleLineTextFieldOptionEditor },
    'Detail': { render: NestedField }
};

class App extends React.Component<IProps, IState> {
    constructor() {
        super()
        this.onChangeFields = this.onChangeFields.bind(this);
        this.onEditField = this.onEditField.bind(this);
        this.onDeleteField = this.onDeleteField.bind(this);
        this.onFieldOptionChanged = this.onFieldOptionChanged.bind(this);
        this.state = {
            fields: [],
            selectedField: null,
        };
    }

    private onEditField(field: data.IField) {
        this.setState({ selectedField: field } as IState);
    }

    private onDeleteField(fields: data.IField[]) {
        this.setState({ fields } as IState);
    }

    private onChangeFields(fields: data.IField[]) {
        this.setState({ fields } as IState);
    }

    private onFieldOptionChanged(field: data.IField) {
        const index = this.state.fields.indexOf(this.state.selectedField);
        const fields = this.state.fields.slice();
        fields[index] = field;

        console.log(index, field, fields);
        this.setState({ selectedField: field, fields } as IState);
    }

    render() {
        const form = JSON.stringify(this.state.fields);

        return (
            <div>
                <FieldSelector
                    fields={options}
                />

                <FormBuilder
                    onEditField={this.onEditField}
                    onDeleteField={this.onDeleteField}
                    onChange={this.onChangeFields}
                    registry={registry}
                    fields={this.state.fields}
                />

                <FieldOptionEditor
                    registry={registry}
                    field={this.state.selectedField}
                    onChange={this.onFieldOptionChanged}
                />

                <div>
                    <div>Debug: Form definitions</div>
                    <textarea style={{ width: 500 }} readOnly value={form} />
                </div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App) as React.ComponentClass<IProps>
