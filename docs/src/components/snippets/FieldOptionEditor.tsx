import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import SingleSelector from '../fields/SingleSelector';
import SingleSelectorOptionEditor from '../fields/SingleSelectorOptionEditor';
import SingleLineTextField from '../fields/SingleLineTextField';
import SingleLineTextFieldOptionEditor from '../fields/SingleLineTextFieldOptionEditor'
import {
    FieldOptionEditor,
    FormBuilder,
    IField,
    FieldRegistry
} from 'react-dynamic-formbuilder';


interface IState {
    fields: Array<IField>;
    field: IField;
}

const registry: FieldRegistry = {
    SingleSelector: {
        field: {
            key: '',
            label: 'Please select:',
            type: 'SingleSelector',
            options: {
                selectOpts: ['a', 'b', 'c'],
            }
        },
        displayName: '单选(selector)',
        input: SingleSelector,
        builder: SingleSelector,
        editor: SingleSelectorOptionEditor,
        display: null,
    },
    SingleLineTextField: {
        field: {
            key: '',
            label: 'Name',
            type: 'SingleLineTextField',
            options: {
                hint: 'Please enter your name',
                required: true,
                unique: false,
            }
        },
        displayName: '单行输入(input)',
        input: SingleLineTextField,
        builder: SingleLineTextField,
        editor: SingleLineTextFieldOptionEditor,
        display: null,
    },
};

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
                key: '',
                label: 'Please select:',
                type: 'SingleSelector',
                options: {
                    selectOpts: ['a', 'b', 'c'],
                }
            }, {
                 key: '',
                label: 'Name',
                type: 'SingleLineTextField',
                options: {
                    hint: 'Please enter your name',
                    required: true,
                    unique: false,
                }
            }],
            field: null,
        };
    }

    private onChangeFields(fields: IField[]) {
        this.setState({ fields } as IState);
    }

    private onChangeField(field: IField) {
        this.setState({field} as IState);
        this.callback(field);
    }

    private closeModal() {
        this.setState({field: null} as IState);
    }

    private onFieldEditing(field: IField, callback: (field: IField) => void) {
        this.setState({field} as IState);
        this.callback = callback;
    }

    render() {
        return (
            <div>
                <Modal onHide={this.closeModal} show={!!this.state.field}>
                    <Modal.Body>
                        <FieldOptionEditor
                            onChange={this.onChangeField}
                            registry={registry}
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
                    registry={registry}
                    onFieldEditing={this.onFieldEditing}
                    onChange={this.onChangeFields}
                    fields={this.state.fields}
                />
            </div>
        );
    }
}