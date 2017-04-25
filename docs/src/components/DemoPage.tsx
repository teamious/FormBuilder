import * as React from 'react';
import { Link } from 'react-router-dom';
import { Panel, FormControl, Grid, Row, Col } from 'react-bootstrap';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import {
    IField,
    IFieldContext,
    IFormState,
    FieldOptionEditor,
    FieldSelector,
    FormBuilder,
    FormInput,
    FormDisplay,
} from 'react-dynamic-formbuilder';

import './DemoPage.css';

import { FieldRegistry } from './constants';

interface IState {
    fields: IField[],
    editingField: IField,
    value: any,
    formState: IFormState,
}

class DemoPage extends React.Component<void, IState> {
    constructor() {
        super()
        this.onChangeFields = this.onChangeFields.bind(this);
        this.onFieldEditing = this.onFieldEditing.bind(this);
        this.onDeleteField = this.onDeleteField.bind(this);
        this.onFieldOptionChanged = this.onFieldOptionChanged.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
        this.onBeforeAddField = this.onBeforeAddField.bind(this);
        this.state = {
            fields: [],
            editingField: null,
            value: {},
            formState: {},
        };
    }

    private onFieldEditing(field: IField) {
        this.setState({ editingField: field} as IState);
    }

    private onDeleteField(fields: IField[]) {
        this.setState({ fields } as IState);
    }

    private onChangeFields(fields: IField[]) {
        this.setState({ fields } as IState);
    }

    private onFieldOptionChanged(field: IField, fields: IField[]) {
        this.setState({ editingField: field, fields } as IState);
    }

    private onValueChanged(value: any, formState: IFormState) {
        this.setState({ value, formState } as IState);
    }

    private onBeforeAddField(field: IField) {
        field.id = Math.floor((Math.random() * 10000000) + 1).toString();
        return true;
    }

    render() {
        const form = JSON.stringify(this.state.fields);
        const value = JSON.stringify(this.state.value);
        const formState = JSON.stringify(this.state.formState);

        return (
            <div>
                <Grid bsClass='demo-page-grid-fluid'>
                    <Row>
                        <Col md={3}>
                            <span>Field Selector</span>
                            <Panel>
                                <FieldSelector
                                    registry={FieldRegistry}
                                />
                            </Panel>
                        </Col>
                        <Col md={5}>
                            <span>Form Builder</span>
                            <Panel>
                                <div className='form-horizontal'>
                                    <FormBuilder
                                        editingField={this.state.editingField}
                                        onFieldEditing={this.onFieldEditing}
                                        onChange={this.onChangeFields}
                                        registry={FieldRegistry}
                                        fields={this.state.fields}
                                        onBeforeAddField={this.onBeforeAddField}
                                    />
                                </div>
                            </Panel>
                        </Col>
                        <Col md={4}>
                            <span>Option Editor</span>
                            <Panel>
                                <FieldOptionEditor
                                    registry={FieldRegistry}
                                    field={this.state.editingField}
                                    fields={this.state.fields}
                                    onChange={this.onFieldOptionChanged}
                                />
                            </Panel>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <Panel>
                                <div>Form Preview</div>
                                <FormInput
                                    fields={this.state.fields}
                                    registry={FieldRegistry}
                                    value={this.state.value}
                                    onChange={this.onValueChanged} />
                            </Panel>
                        </Col>
                        <Col md={4}>
                            <Panel>
                                <div>Form View</div>
                                <div className='form-horizontal'>
                                    <FormDisplay
                                        fields={this.state.fields}
                                        registry={FieldRegistry}
                                        value={this.state.value}
                                    />
                                </div>
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
                                <div>Debug: Form state</div>
                                <FormControl componentClass='textarea' style={{ width: '100%', height: 120 }} readOnly value={formState} />
                            </Panel>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <Link to='/'>Go back to doc page</Link>
                        </Col>
                    </Row>
                </Grid>
            </div >
        );
    }
}

export default DemoPage
