import * as React from 'react';
import { Link } from 'react-router-dom';
import { Panel, FormControl, Grid, Row, Col } from 'react-bootstrap';
import store from '../state/store';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import {
    IField,
    IFieldContext,
    IFormError,
    FormInput,
    FormDisplay,
} from 'react-dynamic-formbuilder';

import FormBuilder from './FormBuilder';
import FieldSelector from './FieldSelector';
import FieldOptionEditor from './FieldOptionEditor';

import './DemoPage.css';

import { FieldRegistry } from './constants';

interface IState {
    fields: IField[],
    value: any,
    error: IFormError,
}

class DemoPage extends React.Component<void, IState> {
    private fieldEdited: (field: IField) => void;

    constructor() {
        super()
        this.onBeforeAddField = this.onBeforeAddField.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
        this.getStoreState = this.getStoreState.bind(this);
        this.state = {
            fields: store.getFields(),
            value: {},
            error: null,
        };
    }

    componentDidMount() {
        store.subscribe(this.getStoreState);
    }

    private getStoreState() {
        this.setState({fields: store.getFields()} as IState);
    }

    private onValueChanged(value: any, error: IFormError) {
        this.setState({ value, error } as IState);
    }

    private onBeforeAddField(field: IField) {
        field.id = Math.floor((Math.random() * 10000000) + 1).toString();
        return true;
    }

    render() {
        const form = JSON.stringify(this.state.fields);
        const value = JSON.stringify(this.state.value);
        const error = JSON.stringify(this.state.error);

        return (
            <div>
                <Grid bsClass='demo-page-grid-fluid'>
                    <Row>
                        <Col md={3}>
                            <span>Field Selector</span>
                            <Panel>
                                <FieldSelector/>
                            </Panel>
                        </Col>
                        <Col md={5}>
                            <span>Form Builder</span>
                            <Panel>
                                <div className='form-horizontal'>
                                    <FormBuilder onBeforeAddField={this.onBeforeAddField}/>
                                </div>
                            </Panel>
                        </Col>
                        <Col md={4}>
                            <span>Option Editor</span>
                            <Panel>
                                <FieldOptionEditor/>
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
                                <div>Debug: Form validation error</div>
                                <FormControl componentClass='textarea' style={{ width: '100%', height: 120 }} readOnly value={error} />
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
