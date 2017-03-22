import * as React from 'react';
import Snippet from '../Snippet';
import Example from '../Example';
import FormBuilder from '../../../../src/components/FormBuilder';
import FormBuilderContext from '../../../../src/components/FormBuilderContext';
import * as data from '../../../../src/data';
import * as constants from '../constants';
import PropsTable, { IPropRow } from '../PropsTable';
import ShortText from '../ShortText';
import LongText from '../LongText';
const code = require('!!raw!../snippets/FormBuilder.tsx');

interface IProps {
}

interface IState {
    fields: data.IField[];
}

const noop = () => {};

export default class extends React.Component<IProps, IState> {
    constructor() {
        super();
        this.onChangeFields = this.onChangeFields.bind(this)
        this.state = {
            fields: JSON.parse(JSON.stringify(constants.fields)),
        }
    }

    private onChangeFields(fields: data.IField[]) {
        this.setState({fields} as IState);
    }

    render() {
        const body = (
            <FormBuilderContext>
                <FormBuilder
                    onFieldEditing={constants.noop}
                    registry={constants.registry}
                    onChange={this.onChangeFields}
                    fields={this.state.fields}/>
            </FormBuilderContext>
        );

        const footer = (
            <Snippet code={code} lang='typescript'/>
        );

        return (
            <div>
                <h3>
                    <a href='#form-builder' name='form-builder'>
                        FormBuilder
                    </a>
                </h3>

                <p>
                    The <strong>FormBuilder</strong> component displays the form definition and lets you reorder, edit, and delete any field. To reorder,
                    click and drag field up or down until you see the indicator.
                </p>

                <Example body={body} footer={footer}/>

                <PropsTable data={propsData}/>
            </div>
        );
    }
}

const propsData: Array<IPropRow> = [
    {
        name: 'fields',
        type: <a href='#ifield'>{'Array<IField>'}></a>,
        default: '[]',
        required: true,
        description: 'A list of fields to display in the form.'
    },
    {
        name: 'onChange',
        type: '(fields: Array<IField>) => void',
        default: 'undefined',
        required: true,
        description: 'onChange() is called whenever the form definition changes eg. a field is added, fields are re-ordered, or a field is deleted.',
    },
    {
        name: 'registry',
        type: <a href='#iregistry'>{'IRegistry'}></a>,
        default: '{}',
        required: true,
        description: 'FormBuilder uses this registry to inject the classes responsible for rendering the field.',
    },

    {
        name: 'onFieldEditing',
        type: '(field: IField, callback: (field: IField) => void)',
        default: 'undefined',
        required: true,
        description: 'onFieldEditing() is called when the user clicks the "Edit" button. It passes two arguments: the field to edit and a callback function. The callback function should be called from context when a change has been made to the field.',
    },

    {

        name: 'onBeforeEditField',
        type: '(field: IField) => boolean',
        default: 'undefined',
        required: false,
        description: 'onBeforeEditField() is called before the onEditField() callback. You can use this method to determine if the onEditField() should be called. Return false to stop onEditField() from being called.'
    },

    {

        name: 'onBeforeDeleteField',
        type: '(field: IField) => boolean',
        default: 'undefined',
        required: false,
        description: 'onBeforeDeleteField() is called before the onDeleteField() callback. You can use this method to determine if the onDeleteField() should be called. Return false to stop onDeleteField() from being called.'
    },

    {

        name: 'editButtonText',
        type: 'React.ReactNode',
        default: '"Edit"',
        required: false,
        description: 'Use this prop to show your own ReactNode inside the edit button.'
    },

    {

        name: 'deleteButtonText',
        type: 'React.ReactNode',
        default: '"Delete"',
        required: false,
        description: 'Use this prop to show your own ReactNode inside the delete button.'
    },


]