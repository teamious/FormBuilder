import * as React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

import * as data from '../../../../src/data';
import * as constants from '../constants';
import  Example from '../Example';

interface IProps { }

interface IState {
    field: data.IField;
    fields: data.IField[];
}

export default class extends React.Component<IProps, IState> {
    private callback: (field: data.IField) => void;

    constructor() {
        super();
        this.onChangeField = this.onChangeField.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onChangeFields = this.onChangeFields.bind(this);
        this.onFieldEditing = this.onFieldEditing.bind(this);
        this.state = {
            fields: [],
            field: null,

        };
    }

    private onChangeFields(fields: data.IField[]) {
        this.setState({ fields } as IState);
    }

    private onChangeField(field: data.IField) {
        this.setState({field} as IState);
        this.callback(field);
    }

    private closeModal() {
        this.setState({field: null} as IState);
    }

    private onFieldEditing(field: data.IField, callback: (field: data.IField) => void) {
        this.setState({field} as IState);
        this.callback = callback;
    }

    render() {
        return (
            <div>
                <h3>
                    <a href='#demo' name='demo'>
                        Demo
                    </a>
                </h3>

                <p>
                    To see an example form builder built with <strong>react-dynamic-formbuilder</strong> go to the <Link to='/demo'>demo page</Link>.
                </p>
            </div>
        );
    }
}