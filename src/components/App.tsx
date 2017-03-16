import * as React from 'react';
import FieldSelector from './FieldSelector';
import FormBuilder from './FormBuilder';
import * as data from '../data';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import ShortText from './ShortText';
import LongText from './LongText';
import SingleSelector from './Fields/SingleSelector';
import SingleLineTextField from './Fields/SingleLineTextField';
import OrderedListInput from './Controls/OrderedListInput';

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
    options: Array<string>,
}

const registry = {
    ShortText,
    LongText,
    SingleSelector,
    SingleLineTextField,
};

class App extends React.Component<IProps, IState> {
    constructor() {
        super()
        this.onChangeFields = this.onChangeFields.bind(this);
        this.onEditField = this.onEditField.bind(this);
        this.onDeleteField = this.onDeleteField.bind(this);
        this.onOptionsChanged = this.onOptionsChanged.bind(this);
        this.state = {
            fields: [],
            options: ['string', 'int', 'boolean'],
        };
    }

    private onEditField(field: data.IField) {
        alert('editing field ' + field.type);
    }

    private onDeleteField(fields: data.IField[]) {
        this.setState({ fields } as IState);
    }

    private onChangeFields(fields: data.IField[]) {
        this.setState({ fields } as IState);
    }

    private onOptionsChanged(options: Array<string>) {
        this.setState({ options: options } as IState)
    }

    render() {
        return (
            <div>
                <OrderedListInput options={this.state.options} optionsChanged={this.onOptionsChanged} />
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
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App) as React.ComponentClass<IProps>
