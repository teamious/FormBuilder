import * as React from 'react';
import FieldSelector from '../../../../src/components/FieldSelector';
import FormBuilder from '../../../../src/components/FormBuilder';
import FormBuilderContext from '../../../../src/components/FormBuilderContext';
import FieldOptionEditor from '../../../../src/components/FieldOptionEditor';
import StandardEditor from '../StandardEditor';
import LongText from '../LongText';
import ShortText from '../ShortText';
import { Modal, Button } from 'react-bootstrap';
import * as data from '../../../../src/data';
import * as constants from '../constants';
import  Example from '../Example';
import Snippet from '../Snippet';
const code = require('!!raw!../snippets/Usage.tsx');

interface IProps { }

interface IState {
    field: data.IField;
    fields: data.IField[];
}

export default class extends React.Component<IProps, IState> {
    constructor() {
        super();
        this.onChangeField = this.onChangeField.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onChangeFields = this.onChangeFields.bind(this);
        this.onDeleteField = this.onDeleteField.bind(this);
        this.onEditField = this.onEditField.bind(this);
        this.state = {
            fields: [],
            field: null,

        };
    }

    private onDeleteField(fields: data.IField[]) {
        this.onChangeFields(fields);
    }

    private onChangeFields(fields: data.IField[]) {
        this.setState({ fields } as IState);
    }

    private onEditField(field: data.IField) {
        this.setState({ field } as IState);
    }

    private onChangeField(field: data.IField) {
        const index = this.state.fields.indexOf(this.state.field)
        if (index === -1) {
            console.warn('Field not found');
            return;
        }
        const fields = this.state.fields.concat([]);
        fields.splice(index, 1, field);
        this.setState({ fields, field } as IState);
    }

    private closeModal() {
        this.setState({field: null} as IState);
    }

    render() {


        const body = (
            <div>
                <FormBuilderContext>
                    <Modal onHide={this.closeModal} show={!!this.state.field}>
                        <Modal.Body>
                            <FieldOptionEditor
                                onChange={this.onChangeField}
                                registry={constants.registry}
                                field={this.state.field}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closeModal}>
                                Done
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <FieldSelector
                        fields={constants.fields}
                    />

                    <FormBuilder
                        registry={constants.registry}
                        onEditField={this.onEditField}
                        onDeleteField={this.onDeleteField}
                        onChange={this.onChangeFields}
                        fields={this.state.fields}
                    />
                </FormBuilderContext>
            </div>
        )

        const snippet = <Snippet code={code} lang='typescript' />;

        return (
            <div>
                <h3>
                    <a href='#demo' name='demo'>
                        Demo
                    </a>
                </h3>

                <p>
                    To start building a form, drag a field from the panel on the left to the panel on right.
                    You can edit a field by clicking "Edit". If you want to remove a field
                    click "Remove".
                </p>

                <p>
                    Both <strong>ShortText</strong> and <strong>LongText</strong> represent custom field
                    types that you build and supply to the form editor.
                </p>

                <Example body={body} footer={snippet}/>
            </div>
        );
    }
}