import * as React from 'react';
import * as assign from 'object-assign';
import * as data from '../../data';
import { generateID } from '../../utils'

import { FormInput } from '../FormInput';

export interface INestedFormEntryWrapper {
    field: data.IField;
    index: number;
    onDelete: () => void;
}

export interface INestedFormInputProps {
    showIndex?: boolean;
    showDeleteBtn?: boolean;
    createButton?: data.IEditableControlSource;
    // onBeforeDeleteEntry will be fired when user wants to delete one nested form entry.
    // return a Promise with boolean to indicate whether delete operation can be continued.
    onBeforeDeleteEntry?: (value: any) => Promise<boolean>;
    // The wrapper allow to customize form entry render which wrappers the nested form input.
    nestedFormEntryWrapper?: React.ReactElement<INestedFormEntryWrapper>;
}

export class NestedFormInput extends React.PureComponent<data.IGenericFieldInputProps<data.IField, any[]> & INestedFormInputProps, void> {
    private fieldStatus: data.INestedFieldState;

    public static defaultProps: data.IFieldInputProps & INestedFormInputProps = {
        value: [{ id: generateID() }],
        showIndex: false,
        showDeleteBtn: false,
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
    }

    render() {
        return (
            <div className='form-input-nested'>
                <div className='form-input-nested-label'>{this.props.field.label}</div>
                {this.props.value.map(this.renderEntry)}
                {this.renderCreateButton()}
            </div>
        );
    }

    private renderEntry(entry: any, index: number) {
        return (
            <NestedFormEntry
                key={entry.id}
                index={index}
                value={entry}
                context={this.props.context}
                field={this.props.field}
                registry={this.props.registry}
                onChange={this.onEntryValueChanged}
                onDelete={this.onDeleteEntry}
                showIndex={this.props.showIndex}
                showDeleteBtn={this.props.showDeleteBtn}
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
        let newValue = this.props.value.slice();
        newValue[index] = value;
        this.fieldStatus.nestedStatus[value.id] = formStatus;
        this.updateFieldStatus();
        this.props.onValueChange(this.props.field, newValue, this.fieldStatus);
    }

    private updateFieldStatus() {
        let error = false;
        this.fieldStatus.nestedStatus.forEach(status => {
            if (data.isFormError(status)) {
                error = true;
            }
        })

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
    onChange: (value: any, formStatus: data.IFormState, index: number) => void;
    onDelete: (index: number) => void;
    showIndex?: boolean;
    showDeleteBtn?: boolean;
    attempt?: boolean;
    nestedFormEntryWrapper?: React.ReactElement<INestedFormEntryWrapper>;
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
            if (!React.isValidElement(this.props.nestedFormEntryWrapper)) {
                throw new Error('invalid nestedFormEntryWrapper');
            }

            return React.cloneElement(
                this.props.nestedFormEntryWrapper,
                {
                    index: this.props.index,
                    field: this.props.field,
                    onDelete: this.onDeleted,
                },
                formInput)
        }
        else {
            const deleteBtn = <button type='button' onClick={this.onDeleted}>Delete</button>
            const index = <div className='form-input-nested-entry-index'>{this.props.index + 1}</div>
            return (
                <div className='form-input-nested-entry'>
                    {this.props.showDeleteBtn && deleteBtn}
                    {this.props.showIndex && index}
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