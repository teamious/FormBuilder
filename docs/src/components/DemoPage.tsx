import * as React from 'react';
import { Panel, FormControl, Grid, Row, Col } from 'react-bootstrap';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import * as data from '../../../src/data';
import FieldOptionEditor from '../../../src/components/FieldOptionEditor'
import FieldSelector from '../../../src/components/FieldSelector';
import FormBuilder from '../../../src/components/FormBuilder';
import FormBuilderContext from '../../../src/components/FormBuilderContext';

import SingleSelector from './fields/SingleSelector';
import SingleSelectorOptionEditor from './fields/SingleSelectorOptionEditor';
import SingleLineTextField from './fields/SingleLineTextField';
import SingleLineTextFieldOptionEditor from './fields/SingleLineTextFieldOptionEditor'
import NestedField from './fields/NestedField';

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
}

const registry: data.FieldRegistry = {
    'SingleSelector': { render: SingleSelector, editor: SingleSelectorOptionEditor },
    'SingleLineTextField': { render: SingleLineTextField, editor: SingleLineTextFieldOptionEditor },
};

registry[NestedField.type] = { render: NestedField };

class DemoPage extends React.Component<IProps, IState> {
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
                <FormBuilderContext>
                <Grid>
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
                            <Panel>
                            <FormBuilder
                                onFieldEditing={this.onFieldEditing}
                                onChange={this.onChangeFields}
                                registry={registry}
                                fields={this.state.fields}
                            />
                            </Panel>
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
                                <div>Debug: Form definitions</div>
                                <FormControl componentClass='textarea' style={{ width: '100%', height: 120 }} readOnly value={form} />
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
                </FormBuilderContext>
            </div>
        );
    }
}

export default DemoPage
