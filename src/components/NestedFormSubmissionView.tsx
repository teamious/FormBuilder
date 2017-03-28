import * as React from 'react';
import * as assign from 'object-assign';
import * as data from '../data';

import FormSubmissionView from './FormSubmissionView';

interface IState {
}

export default class NestedFormSubmissionView extends React.PureComponent<data.IFieldRenderProps, IState> {
    // This maintains all errors from nested entries's error.
    private nestedEntryErrors: {
        [key: number]: data.IFormError
    }

    public static defaultProps: data.IFieldRenderProps = {
        value: [{}]
    } as data.IFieldRenderProps;

    constructor(props: data.IFieldRenderProps) {
        super(props);
        this.renderEntry = this.renderEntry.bind(this);
        this.onCreateEntry = this.onCreateEntry.bind(this);
        this.onDeleteEntry = this.onDeleteEntry.bind(this);
        this.onEntryValueChanged = this.onEntryValueChanged.bind(this);
        this.nestedEntryErrors = {};
    }

    render() {
        return (
            <div>
                <button type='button' onClick={this.onCreateEntry}>Create</button>
                {this.props.value.map(this.renderEntry)}
            </div>
        );
    }

    private renderEntry(entry: any, index: number) {
        return (
            <NestedFromEntry
                key={index}
                index={index}
                value={entry}
                fields={this.props.field.fields}
                registry={this.props.registry}
                onChange={this.onEntryValueChanged}
                onDelete={this.onDeleteEntry}
            />
        );
    }

    private onCreateEntry() {
        let entries = this.props.value.slice();
        entries.push({});
        this.props.onValueChange(this.props.field, entries, this.buildFieldError());
    }

    private onDeleteEntry(index: number) {
        const entries = this.props.value.slice();
        entries.splice(index, 1);
        delete this.nestedEntryErrors[index];
        this.props.onValueChange(this.props.field, entries, this.buildFieldError());
    }

    private onEntryValueChanged(value: any, error: data.IFormError, index: number) {
        let newValue = this.props.value.slice();
        newValue[index] = value;

        let newError = assign({}, this.nestedEntryErrors);
        if (error) {
            this.nestedEntryErrors[index] = error;
        }
        else {
            delete this.nestedEntryErrors[index];
        }

        this.props.onValueChange(this.props.field, newValue, this.buildFieldError());
    }

    private buildFieldError(): data.IFieldError {
        let errors = [];
        for (let prop in this.nestedEntryErrors) {
            errors.push(this.nestedEntryErrors[prop]);
        }

        if (errors.length === 0) {
            return null;
        }

        return {
            error: true,
            errorMsg: "nestedError",
            details: errors,
        };
    }
}

interface IEntryProps {
    index: number;
    value: any;
    fields: data.IField[];
    registry: data.FieldRegistry;
    onChange: (value: any, errors: data.IFormError, index: number) => void;
    onDelete: (index: number) => void;
}

class NestedFromEntry extends React.PureComponent<IEntryProps, any> {
    constructor() {
        super();
        this.onValueChanged = this.onValueChanged.bind(this);
        this.onDeleted = this.onDeleted.bind(this);
    }

    render() {
        return (
            <div className='form-submission-nested-entry'>
                <button type='button' onClick={this.onDeleted}>Delete</button>
                <FormSubmissionView
                    fields={this.props.fields}
                    registry={this.props.registry}
                    value={this.props.value}
                    onChange={this.onValueChanged} />
            </div>
        );
    }

    private onDeleted() {
        this.props.onDelete(this.props.index);
    }

    private onValueChanged(value: any, errors: data.IFormError) {
        this.props.onChange(value, errors, this.props.index);
    }
}