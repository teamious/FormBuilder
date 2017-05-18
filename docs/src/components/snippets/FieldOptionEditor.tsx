import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { SingleSelector, SingleSelectorBuilder } from '../fields/SingleSelector';
import SingleSelectorOptionEditor from '../fields/SingleSelectorOptionEditor';
import { SingleLineTextField, SingleLineTextBuilder } from '../fields/SingleLineTextField';
import SingleLineTextFieldOptionEditor from '../fields/SingleLineTextFieldOptionEditor';
import {
    FieldOptionEditor,
    FormBuilder,
    IField,
    IFieldContext,
    FieldRegistry,
} from 'react-dynamic-formbuilder';


interface IState {
    fields: Array<IField>;
    field: IField;
    editingContext: IFieldContext;
}

const registry: FieldRegistry = new FieldRegistry();
registry.register({
    field: {
        id: '',
        label: 'Please select:',
        type: 'SingleSelector',
        options: {
            selectOpts: ['a', 'b', 'c'],
        }
    },
    type: 'SingleSelector',
    displayName: '单选(selector)',
    input: SingleSelector,
    builder: SingleSelectorBuilder,
    editor: SingleSelectorOptionEditor,
    display: null,
});

registry.register({
    field: {
        id: '',
        label: 'Name',
        type: 'SingleLineTextField',
        options: {
            hint: 'Please enter your name',
            required: true,
            unique: false,
        }
    },
    type: 'SingleLineTextField',
    displayName: '单行输入(input)',
    input: SingleLineTextField,
    builder: SingleLineTextBuilder,
    editor: SingleLineTextFieldOptionEditor,
    display: null,
});


export default class MyApp extends React.Component<{}, IState> {
    private callback: (field: IField) => void;

    constructor() {
        super();
        this.onChangeField = this.onChangeField.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onChangeFields = this.onChangeFields.bind(this);
        this.onFieldEditing = this.onFieldEditing.bind(this);
        this.state = {
            fields: [{
                id: 'field1',
                label: 'Please select:',
                type: 'SingleSelector',
                options: {
                    selectOpts: ['a', 'b', 'c'],
                }
            }, {
                id: 'field2',
                label: 'Name',
                type: 'SingleLineTextField',
                options: {
                    hint: 'Please enter your name',
                    required: true,
                    unique: false,
                }
            }],
            field: null,
            editingContext: null,
        };
    }

    private onChangeFields(fields: IField[]) {
        this.setState({ fields } as IState);
    }

    private onChangeField(field: IField, fields: IField[]) {
        this.setState({ field, fields } as IState);
    }

    private closeModal() {
        this.setState({ field: null } as IState);
    }

    private onFieldEditing(field: IField) {
        this.setState({ field } as IState);
    }

    render() {
        let editingFieldId = null;
        if (this.state.field) {
            editingFieldId = this.state.field.id;
        }
        return (
            <div>
                <Modal onHide={this.closeModal} show={!!this.state.field}>
                    <Modal.Body>
                        <FieldOptionEditor
                            onChange={this.onChangeField}
                            registry={registry}
                            field={this.state.field}
                            fields={this.state.fields}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModal}>
                            Done
                        </Button>
                    </Modal.Footer>
                </Modal>

                <FormBuilder
                    editingFieldId={editingFieldId}
                    registry={registry}
                    onFieldEditing={this.onFieldEditing}
                    onChange={this.onChangeFields}
                    fields={this.state.fields}
                />
            </div>
        );
    }
}