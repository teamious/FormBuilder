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
    IDragSourceItem,
    IDropTargetItem,
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
    private formBuilder: FormBuilder;

    constructor() {
        super()
        this.onChangeFields = this.onChangeFields.bind(this);
        this.onFieldEditing = this.onFieldEditing.bind(this);
        this.onDeleteField = this.onDeleteField.bind(this);
        this.onFieldOptionChanged = this.onFieldOptionChanged.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
        this.refFormBuilder = this.refFormBuilder.bind(this);
        this.onSelectField = this.onSelectField.bind(this);
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

    private refFormBuilder(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
    }

    private onSelectField(field: IField) {
        this.formBuilder.addField(field);
    }

    // NOTE(andrews) canDrop holds the business logic for determining if the source item can
    // be dropped on the target item.
    private canDrop(source: IDragSourceItem, target: IDropTargetItem): boolean {

        // NOTE(andrews): Prohibit more than one layer of nested fields
        if (source.field.type === 'NestedForm' &&  target.parentId) {
            return false;
        }

        // NOTE(andrews): Prohibit moving non-new fields between parents
        // (eg. moving non-nested field into nested form)
        if (source.field.id && source.parentId !== target.parentId) {
            return false;
        }

        // NOTE(andrews): Prohibit the field from being dropped on itself.
        // This prevents the indicator from showing up.
        if (target.field && source.field.id === target.field.id) {
            return false;
        }

        // NOTE(andrews): Prohibit the field from dropped back into the same index.
        if (source.index !== undefined && source.index === target.index - 1) {
            return false;
        }

        return true;
    }

    render() {
        const form = JSON.stringify(this.state.fields);
        const value = JSON.stringify(this.state.value);
        const formState = JSON.stringify(this.state.formState);
        const {editingField} = this.state;

        let editingFieldId = null;
        if (editingField) {
            editingFieldId = editingField.id;
        }

        return (
            <div>
                <Grid bsClass='demo-page-grid-fluid'>
                    <Row>
                        <Col md={3}>
                            <span>Field Selector</span>
                            <Panel>
                                <FieldSelector
                                    registry={FieldRegistry}
                                    onSelect={this.onSelectField}
                                />
                            </Panel>
                        </Col>
                        <Col md={5}>
                            <span>Form Builder</span>
                            <Panel>
                                <div className='form-horizontal'>
                                    <FormBuilder
                                        ref={this.refFormBuilder}
                                        editingFieldId={editingFieldId}
                                        onFieldEditing={this.onFieldEditing}
                                        onChange={this.onChangeFields}
                                        registry={FieldRegistry}
                                        fields={this.state.fields}
                                        canDrop={this.canDrop}
                                        emptyLayout={<div>Please drop fields inside</div>}
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
