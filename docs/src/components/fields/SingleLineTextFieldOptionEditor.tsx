import * as React from 'react';
import { FormControl, Checkbox } from 'react-bootstrap';
import * as assign from 'object-assign';

import { IFieldOptionEditorProps } from 'react-dynamic-formbuilder';

interface IState { }

export default class SingleLineTextFieldOptionEditor extends React.PureComponent<IFieldOptionEditorProps, IState> {
    constructor() {
        super();

        this.onLabelChange = this.onLabelChange.bind(this);
        this.onHintChange = this.onHintChange.bind(this);
        this.onRequiredChange = this.onRequiredChange.bind(this);
        this.onUniqueChange = this.onUniqueChange.bind(this);
    }

    render() {
        const { label } = this.props.field;
        const { hint, required, unique } = this.props.field.options;
        return (
            <div>
                <div>
                    <span>Label</span>
                    <FormControl type='text' value={label} onChange={this.onLabelChange} />
                </div>
                <div>
                    <span>Hint</span>
                    <FormControl type='text' value={hint} onChange={this.onHintChange} />
                </div>
                <div>
                    <span>Setting</span>
                    <Checkbox checked={required} onChange={this.onRequiredChange}>Required</Checkbox>
                    <Checkbox checked={unique} onChange={this.onUniqueChange}>Unique</Checkbox>
                </div>
            </div>
        )
    }

    private onLabelChange(event: any) {
        let field = assign({}, this.props.field);
        field.label = event.target.value;
        this.props.onChange(field);
    }

    private onHintChange(event: any) {
        let field = assign({}, this.props.field);
        field.options.hint = event.target.value;
        this.props.onChange(field);
    }

    private onRequiredChange(event: any) {
        let field = assign({}, this.props.field);
        field.options.required = !this.props.field.options.required;
        this.props.onChange(field);
    }

    private onUniqueChange(event: any) {
        let field = assign({}, this.props.field);
        field.options.unique = !this.props.field.options.unique;
        this.props.onChange(field);
    }
}