import * as React from 'react';
import FieldSelector from './FieldSelector';
import FormBuilder from './FormBuilder';
import * as data from '../data';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import ShortText from './ShortText';
import LongText from './LongText';

const options: data.IField[] = [
    {
        label: 'Short text area',
        type: 'ShortText',
    },
    {
        label: 'Long text area',
        type: 'LongText',
    },
];

interface IProps {
}

interface IState {
    fields: data.IField[],
}

const registry = {
    ShortText,
    LongText,
};

class App extends React.Component<IProps, IState> {
    constructor() {
        super()
        this.onChangeFields =  this.onChangeFields.bind(this);
        this.onEditField =  this.onEditField.bind(this);
        this.onDeleteField =  this.onDeleteField.bind(this);
        this.state = {
            fields: [],
        }
    }

    private onEditField(field: data.IField) {
        alert('editing field ' + field.type);
    }

    private onDeleteField(fields: data.IField[]) {
        this.setState({fields} as IState);
    }

    private onChangeFields(fields: data.IField[]) {
        this.setState({fields} as IState);
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
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App) as React.ComponentClass<IProps>
