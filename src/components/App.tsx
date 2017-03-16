import * as React from 'react';
import FieldSelector from './FieldSelector';
import FormBuilder from './FormBuilder';
import * as data from '../data';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import ShortText from './ShortText';
import LongText from './LongText';
import SingleSelector from './Fields/SingleSelector';
import SingleSelectorOptionEditor from './Fields/SingleSelectorOptionEditor';
import SingleLineTextField from './Fields/SingleLineTextField';
import OrderedListInput from './Controls/OrderedListInput';
import FieldOptionEditor from './FieldOptionEditor'

const options: data.IField[] = [
    {
        label: 'Short text area',
        type: 'ShortText',
    },
    {
        label: 'Long text area',
        type: 'LongText',
    },
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
            allowMutiple: true,
        }
    }
];

interface IProps {
}

interface IState {
    fields: data.IField[],
    selectedField: data.IField,
}

const registry: data.FieldRegistry = {
    'ShortText': { render: ShortText },
    'LongText': { render: LongText },
    'SingleSelector': { render: SingleSelector, editor: SingleSelectorOptionEditor },
    SingleLineTextField,
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
        this.setState({ selectedField: field, fields } as IState);
    }

    render() {
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
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App) as React.ComponentClass<IProps>
