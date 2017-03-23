import * as React from 'react';
import Snippet from '../Snippet';
import Example from '../Example';
import FormBuilder from '../../../../src/components/FormBuilder';
import FieldOptionEditor from '../../../../src/components/FieldOptionEditor';
import FormBuilderContext from '../../../../src/components/FormBuilderContext';
import * as data from '../../../../src/data';
import * as constants from '../constants';
import PropsTable, { IPropRow } from '../PropsTable';
import { Modal, Button } from 'react-bootstrap';
const code = require('!!raw!../snippets/FieldOptionEditor.tsx');

interface IProps {}

interface IState {
    fields: data.IField[];
    field: data.IField;
}

export default class extends React.Component<IProps, IState> {
    private callback: (field: data.IField) => void;

    constructor() {
        super();
        this.onChangeField = this.onChangeField.bind(this);
        this.onFieldEditing = this.onFieldEditing.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onChangeFields = this.onChangeFields.bind(this);
        this.state = {
            field: null,
            fields: JSON.parse(JSON.stringify(constants.fields)),
        }
    }

    onEditField(field: data.IField) {
        this.setState({field} as IState);
    }

    onChangeFields(fields: data.IField[]) {
        this.setState({fields} as IState);
    }

    private closeModal() {
        this.setState({field: null} as IState);
    }


    private onChangeField(field: data.IField) {
        this.setState({field} as IState);
        this.callback(field);
    }

    private onFieldEditing(field: data.IField, callback: (field: data.IField) => void) {
        this.setState({field} as IState);
        this.callback = callback;
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

                    <FormBuilder
                        onFieldEditing={this.onFieldEditing}
                        registry={constants.registry}
                        onChange={this.onChangeFields}
                        fields={this.state.fields}/>
                </FormBuilderContext>
            </div>
        );

        const footer = (
            <Snippet code={code} lang='typescript'/>
        );

        return (
            <div>
                <h3>
                    <a href='#field-option-editor' name='field-option-editor'>
                        FieldOptionEditor
                    </a>
                </h3>

                <p>
                    <strong>FieldOptionEditor</strong> can be used to edit the options of a field. The <strong>FieldOptionEditor</strong>
                    uses the registry to inject your custom editor component(s). You must use the <code>onEditField</code> prop
                    of the <strong>FormBuilder</strong> to get notified when the user clicks a field to edit.
                </p>
                <p>
                    Whenever a change is made to the options, the <strong>FieldOptionEditor</strong> will call the
                    <code>onChange</code> prop with the newly updated field. You should then update your fields
                    by replace the old field with the new field.
                </p>

                <Example body={body} footer={footer}/>

                <PropsTable data={propsData}/>
            </div>
        );
    }
}

const propsData: Array<IPropRow> = [
    {
        name: 'field',
        type: <a href='#ifield'>IField</a>,
        default: 'undefined',
        required: true,
        description: 'The field to be edited. You must pass a callback to the FormBuilder\'s onEditField() props to get the field to be edited.'
    },

    {
        name: 'registry',
        type: <a href='#field-registry'>FieldRegistry</a>,
        default: '{}',
        required: true,
        description: 'The FieldOptionEditor uses this to inject the appropriate class for rendering an editor.'
    },

    {
        name: 'onChange',
        type: '(field: IField) => void',
        default: 'undefined',
        required: true,
        description: 'The FieldOptionEditor calls this method whenever the field or it\'s options have changed.'
    },

];