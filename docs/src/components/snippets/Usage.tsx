import * as React from 'react';
import { MyEditor } from './MyEditor';
import { MyLongText } from './MyLongText';
import { MyShortText } from './MyShortText';
import { Modal, Button } from 'react-bootstrap';
import {
    FieldSelector,
    FieldOptionEditor,
    FormBuilder,
    FormBuilderContext,
    IField,
    FieldRegistry
} from 'form-builder';


interface IState {
    fields: Array<IField>;
    field: IField;
}

const fields: Array<IField> = [
    {
        label: 'Short text',
        type: 'MyShortText',
        options: {
            label: 'My default label',
            required: false,
            placeholder: 'Example...'
        }
    },
    {
        label: 'Long text',
        type: 'MyLongText',
        options: {
            label: 'My default label',
            required: false,
            placeholder: 'Example...'
        }
    },
];

const registry: FieldRegistry = {
    MyShortText: {
        render: MyShortText,
        editor: MyEditor,
    },
    MyLongText: {
        render: MyLongText,
        editor: MyEditor,
    },
}


export default class MyApp extends React.Component<{}, IState> {
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

    private onDeleteField(fields: IField[]) {
        this.onChangeFields(fields);
    }

    private onChangeFields(fields: IField[]) {
        this.setState({ fields } as IState);
    }

    private onEditField(field: IField) {
        this.setState({ field } as IState);
    }

    private onChangeField(field: IField) {
        const index = this.state.fields.indexOf(this.state.field)
        const fields = this.state.fields.concat([]);
        fields.splice(index, 1, field);
        this.setState({ fields, field } as IState);
    }

    private closeModal() {
        this.setState({field: null} as IState);
    }

    render() {
        return (
            <div>
                <FormBuilderContext>
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

                    <FieldSelector
                        fields={fields}
                    />

                    <FormBuilder
                        registry={registry}
                        onEditField={this.onEditField}
                        onDeleteField={this.onDeleteField}
                        onChange={this.onChangeFields}
                        fields={this.state.fields}
                    />
                </FormBuilderContext>
            </div>
        );
    }
}