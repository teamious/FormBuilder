import * as React from 'react';
import * as assign from 'object-assign';
import * as classNames from 'classnames'
import * as data from '../../data';
import { generateID } from '../../utils'

import { FormInput } from '../FormInput';

export interface INestedFormEntryWrapperProps {
    field: data.IField;
    index: number;
    showDeleteButton: boolean;
    onDelete: () => void;
}

export interface INestedFormInputProps {
    createButton?: data.IEditableControlSource;
    // onBeforeDeleteEntry will be fired when user wants to delete one nested form entry.
    // return a Promise with boolean to indicate whether delete operation can be continued.
    onBeforeDeleteEntry?: (value: any) => Promise<boolean>;
    // The wrapper allow to customize form entry render which wrappers the nested form input.
    nestedFormEntryWrapper?: React.ComponentClass<INestedFormEntryWrapperProps>;
}

export interface INestedFormInputState {
    values: any;
}

export class NestedFormInput extends React.PureComponent<data.IGenericFieldInputProps<data.IField, any[]> & INestedFormInputProps, INestedFormInputState> {
    private fieldStatus: data.INestedFieldState;

    public static defaultProps: data.IFieldInputProps & INestedFormInputProps = {
        value: [{ id: generateID() }],
        createButton: 'Create',
    } as data.IFieldInputProps & INestedFormInputProps;

    constructor(props: data.IFieldInputProps & INestedFormInputProps) {
        super(props);
        this.renderEntry = this.renderEntry.bind(this);
        this.onCreateEntry = this.onCreateEntry.bind(this);
        this.onDeleteEntry = this.onDeleteEntry.bind(this);
        this.onEntryValueChanged = this.onEntryValueChanged.bind(this);
        this.fieldStatus = {
            error: '',
            nestedStatus: [],
        };

        this.state = {
            values: this.props.value
        }
    }

    render() {
        return (
            <div className='form-input-nested'>
                <div className='form-input-nested-label'>{this.props.field.label}</div>
                <div className='form-input-nested-content'>
                    {this.props.value.map(this.renderEntry)}
                    {this.renderCreateButton()}
                </div>
            </div>
        );
    }

    private renderEntry(entry: any, index: number) {
        const showDeleteButton = this.props.value.length !== 1;
        return (
            <NestedFormEntry
                key={entry.id}
                index={index}
                value={entry}
                context={this.props.context}
                field={this.props.field}
                registry={this.props.registry}
                showDeleteButton={showDeleteButton}
                onChange={this.onEntryValueChanged}
                onDelete={this.onDeleteEntry}
                attempt={this.props.attempt}
                nestedFormEntryWrapper={this.props.nestedFormEntryWrapper}
            />
        );
    }

    private onCreateEntry(event: React.MouseEvent<HTMLElement>) {
        event.stopPropagation();
        event.preventDefault();
        let entries = this.props.value.slice();
        entries.push({ id: generateID() });
        this.props.onValueChange(this.props.field, entries, this.fieldStatus);
    }

    private onDeleteEntry(index: number) {
        if (this.props.onBeforeDeleteEntry) {
            const before = this.props.onBeforeDeleteEntry(this.props.value[index]);
            if (before && before.then) {
                before.then(result => {
                    if (result) {
                        this.deleteEntry(index);
                    }
                })
            }
            else {
                console.warn('Must return a promise');
            }
        }
        else {
            this.deleteEntry(index);
        }
    }

    private deleteEntry(index: number) {
        const entries = this.props.value.slice();
        const deletedEntry = this.props.value[index];
        entries.splice(index, 1);
        delete this.fieldStatus.nestedStatus[deletedEntry.id];
        this.updateFieldStatus();
        this.props.onValueChange(this.props.field, entries, this.fieldStatus);
    }

    private onEntryValueChanged(value: any, formStatus: data.IFormState, index: number) {
        this.fieldStatus.nestedStatus[value.id] = formStatus;
        this.updateFieldStatus();

        this.setState((state, props) => {
            let values = [
                ...state.values,
            ]
            values[index] = value
            props.onValueChange(this.props.field, values, this.fieldStatus)
            return { values }
        })
    }

    private updateFieldStatus() {
        let error = false;
        for (let id in this.fieldStatus.nestedStatus) {
            if (data.isFormError(this.fieldStatus.nestedStatus[id])) {
                error = true;
            }
        }

        this.fieldStatus.error = error ? 'nestedError' : '';
    }

    private renderCreateButton() {
        const source = this.props.createButton;

        if (!source || typeof source === 'string') {
            return (
                <button className='form-input-nested-button form-input-nested-create-button' type='button' onClick={this.onCreateEntry}>
                    {source || 'Create'}
                </button>
            )
        }

        if (React.isValidElement(source)) {
            return React.cloneElement(source, {
                onClick: this.onCreateEntry,
                className: classNames(source.props.className, 'form-input-nested-button form-input-nested-create-button'),
            })
        }

        throw new Error('Cannot render create button');
    }
}

interface IEntryProps {
    index: number;
    value: any;
    context: any;
    field: data.IField;
    registry: data.FieldRegistry;
    showDeleteButton: boolean;
    onChange: (value: any, formStatus: data.IFormState, index: number) => void;
    onDelete: (index: number) => void;
    attempt?: boolean;
    nestedFormEntryWrapper?: React.ComponentClass<INestedFormEntryWrapperProps>;
}

class NestedFormEntry extends React.PureComponent<IEntryProps, any> {
    constructor() {
        super();
        this.onValueChanged = this.onValueChanged.bind(this);
        this.onDeleted = this.onDeleted.bind(this);
    }

    render() {
        const formInput = <FormInput
            fields={this.props.field.fields}
            registry={this.props.registry}
            value={this.props.value}
            context={this.props.context}
            onChange={this.onValueChanged}
            attempt={this.props.attempt}
        />;

        if (this.props.nestedFormEntryWrapper) {
            return React.createElement(
                this.props.nestedFormEntryWrapper,
                {
                    index: this.props.index,
                    field: this.props.field,
                    showDeleteButton: this.props.showDeleteButton,
                    onDelete: this.onDeleted,
                },
                formInput)
        }
        else {
            const deleteBtn = <button type='button' className='form-input-nested-entry-delete' onClick={this.onDeleted}>Delete</button>
            return (
                <div className='form-input-nested-entry'>
                    {this.props.showDeleteButton && deleteBtn}
                    {formInput}
                </div>
            );
        }
    }

    private onDeleted() {
        this.props.onDelete(this.props.index);
    }

    private onValueChanged(value: any, formStatus: data.IFormState) {
        this.props.onChange(value, formStatus, this.props.index);
    }
}