import * as React from 'react';
import { Panel, FormControl, Grid, Row, Col } from 'react-bootstrap';
import * as data from '../data';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import FieldOptionEditor from './FieldOptionEditor'
import FieldSelector from './FieldSelector';
import FormBuilder from './FormBuilder';
import FormSubmissionView from './FormSubmissionView';

import SingleSelector from './Fields/SingleSelector';
import SingleSelectorOptionEditor from './Fields/SingleSelectorOptionEditor';
import SingleLineTextField from './Fields/SingleLineTextField';
import SingleLineTextFieldOptionEditor from './Fields/SingleLineTextFieldOptionEditor'
import NestedField from './Fields/NestedField';
import NestedFormSubmissionView from './NestedFormSubmissionView';

const options: data.IField[] = [
    {
        label: 'Single selector',
        type: 'SingleSelector',
        options: {
            label: 'Select something',
            selectOpts: ['a', 'b', 'c'],
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
        type: NestedField.type,
        fields: [],
    }
];

interface IProps {
}

interface IState {
    fields: data.IField[],
    selectedField: data.IField,
    value: any,
}

const registry: data.FieldRegistry = {
    'SingleSelector': { render: SingleSelector, builder: SingleSelector, editor: SingleSelectorOptionEditor },
    'SingleLineTextField': { render: SingleLineTextField, builder: SingleLineTextField, editor: SingleLineTextFieldOptionEditor },
};

registry[NestedField.type] = { render: NestedFormSubmissionView, builder: NestedField };

class App extends React.Component<IProps, IState> {
    private fieldEdited: (field: data.IField) => void;

    constructor() {
        super()
        this.onChangeFields = this.onChangeFields.bind(this);
        this.onFieldEditing = this.onFieldEditing.bind(this);
        this.onDeleteField = this.onDeleteField.bind(this);
        this.onFieldOptionChanged = this.onFieldOptionChanged.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
        this.state = {
            fields: [],
            selectedField: null,
            value: {},
        };
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

    private onValueChanged(value: any) {
        this.setState({ value } as IState);
    }

    render() {
        const form = JSON.stringify(this.state.fields);
        const value = JSON.stringify(this.state.value);

        return (
            <div style={{ minWidth: '640px' }}>
                <Grid fluid={true}>
                    <Row>
                        <Col md={3}>
                            <span>Field Selector</span>
                            <Panel>
                                <FieldSelector
                                    fields={options}
                                />
                            </Panel>
                        </Col>
                        <Col md={5}>
                            <span>Form Builder</span>
                            <FormBuilder
                                onFieldEditing={this.onFieldEditing}
                                onChange={this.onChangeFields}
                                registry={registry}
                                fields={this.state.fields}
                            />
                        </Col>
                        <Col md={4}>
                            <span>Option Editor</span>
                            <Panel>
                                <FieldOptionEditor
                                    registry={registry}
                                    field={this.state.selectedField}
                                    onChange={this.onFieldOptionChanged}
                                />
                            </Panel>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <Panel>
                                <div>Form Preview</div>
                                <FormSubmissionView
                                    fields={this.state.fields}
                                    registry={registry}
                                    value={this.state.value}
                                    onChange={this.onValueChanged} />
                            </Panel>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <Panel>
                                <div>Debug: Form definitions</div>
                                <FormControl componentClass='textarea' style={{ width: '100%', height: 120 }} readOnly value={form} />

                                <div>Debug: Form values</div>
                                <FormControl componentClass='textarea' style={{ width: '100%', height: 120 }} readOnly value={value} />
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App) as React.ComponentClass<IProps>
