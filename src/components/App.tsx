import * as React from 'react';
import * as data from '../data';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import FieldOptionEditor from './FieldOptionEditor'
import FieldSelector from './FieldSelector';
import FormBuilder from './FormBuilder';
import FormBuilderEvent from './FormBuilderEvent';

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

const formBuilderEvent = new FormBuilderEvent();

class App extends React.Component<IProps, IState> {
    private fieldEdited: (field: data.IField) => void;

    constructor() {
        super()
        this.onChangeFields = this.onChangeFields.bind(this);
        this.onFieldEditing = this.onFieldEditing.bind(this);
        this.onDeleteField = this.onDeleteField.bind(this);
        this.onFieldOptionChanged = this.onFieldOptionChanged.bind(this);
        this.state = {
            fields: [],
            selectedField: null,
        };
    }

    componentDidMount() {
        formBuilderEvent.fieldEditing = this.onFieldEditing;
    }

    private onFieldEditing(field: data.IField, done: (field: data.IField) => void) {
        this.setState({ selectedField: field } as IState);
        this.fieldEdited = done;
    }

    private onDeleteField(fields: data.IField[]) {
        this.setState({ fields } as IState);
    }

    private onChangeFields(fields: data.IField[]) {
        this.setState({ fields } as IState);
    }

    private onFieldOptionChanged(field: data.IField) {
        this.setState({ selectedField: field } as IState);
        this.fieldEdited(field);
    }

    render() {
        const form = JSON.stringify(this.state.fields);

        return (
            <div>
                <FieldSelector
                    fields={options}
                />

                <FormBuilder
                    onDeleteField={this.onDeleteField}
                    onChange={this.onChangeFields}
                    registry={registry}
                    formBuilderEvent={formBuilderEvent}
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
