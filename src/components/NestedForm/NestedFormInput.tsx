import * as React from 'react';
import * as assign from 'object-assign';
import * as data from '../../data';

import { FormInput } from '../FormInput';

export interface INestedFormInputState {
}

export interface INestedFormInputProps {
    showIndex?: boolean;
    showDeleteBtn?: boolean;
    createButton?: data.IEditableControlSource;
}

export class NestedFormInput extends React.PureComponent<data.IFieldInputProps & INestedFormInputProps, INestedFormInputState> {
    private fieldStatus: data.INestedFieldState;

    public static defaultProps: data.IFieldInputProps & INestedFormInputProps = {
        value: [{}],
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
                key={index}
                index={index}
                value={entry}
                context={this.props.context}
                fields={this.props.field.fields}
                registry={this.props.registry}
                onChange={this.onEntryValueChanged}
                onDelete={this.onDeleteEntry}
                showIndex={this.props.showIndex}
                showDeleteBtn={this.props.showDeleteBtn}
            />
        );
    }

    private onCreateEntry(event: React.MouseEvent<HTMLElement>) {
        event.stopPropagation();
        event.preventDefault();
        let entries = this.props.value.slice();
        entries.push({});
        this.props.onValueChange(this.props.field, entries, this.fieldStatus);
    }

    private onDeleteEntry(index: number) {
        const entries = this.props.value.slice();
        entries.splice(index, 1);
        delete this.fieldStatus.nestedStatus[index];
        this.updateFieldStatus();
        this.props.onValueChange(this.props.field, entries, this.fieldStatus);
    }

    private onEntryValueChanged(value: any, formStatus: data.IFormState, index: number) {
        let newValue = this.props.value.slice();
        newValue[index] = value;
        this.fieldStatus.nestedStatus[index] = formStatus;
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
    fields: data.IField[];
    registry: data.FieldRegistry;
    onChange: (value: any, formStatus: data.IFormState, index: number) => void;
    onDelete: (index: number) => void;
    showIndex?: boolean;
    showDeleteBtn?: boolean;
}

class NestedFormEntry extends React.PureComponent<IEntryProps, any> {
    constructor() {
        super();
        this.onValueChanged = this.onValueChanged.bind(this);
        this.onDeleted = this.onDeleted.bind(this);
    }

    render() {
        const deleteBtn = <button type='button' onClick={this.onDeleted}>Delete</button>
        const index = <div className='form-input-nested-entry-index'>{this.props.index + 1}</div>
        return (
            <div className='form-input-nested-entry'>
                {this.props.showDeleteBtn && deleteBtn}
                {this.props.showIndex && index}
                <FormInput
                    fields={this.props.fields}
                    registry={this.props.registry}
                    value={this.props.value}
                    context={this.props.context}
                    onChange={this.onValueChanged} />
            </div>
        );
    }

    private onDeleted() {
        this.props.onDelete(this.props.index);
    }

    private onValueChanged(value: any, formStatus: data.IFormState) {
        this.props.onChange(value, formStatus, this.props.index);
    }
}