import * as React from 'react';
import { FormControl, Checkbox } from 'react-bootstrap';
import * as assign from 'object-assign';

import { IFieldOptionEditorProps } from '../../data';

interface IState { }

export default class SingleLineTextFieldOptionEditor extends React.PureComponent<IFieldOptionEditorProps, IState> {
    constructor() {
        super();

        this.onFieldLabelChange = this.onFieldLabelChange.bind(this);
        this.onLabelChange = this.onLabelChange.bind(this);
        this.onHintChange = this.onHintChange.bind(this);
        this.onRequiredChange = this.onRequiredChange.bind(this);
        this.onUniqueChange = this.onUniqueChange.bind(this);
    }

    render() {
        const { label, options } = this.props.field
        return (
            <div>
                <div>
                    <span>Field Label</span>
                    <FormControl type='text' value={label} onChange={this.onFieldLabelChange} />
                </div>
                <div>
                    <span>Label</span>
                    <FormControl type='text' value={options.label} onChange={this.onLabelChange} />
                </div>
                <div>
                    <span>Hint</span>
                    <FormControl type='text' value={options.hint} onChange={this.onHintChange} />
                </div>
                <div>
                    <span>Setting</span>
                    <Checkbox checked={options.required} onChange={this.onRequiredChange}>Required</Checkbox>
                    <Checkbox checked={options.unique} onChange={this.onUniqueChange}>Unique</Checkbox>
                </div>
            </div>
        )
    }

    private onFieldLabelChange(event: any) {
        let field = assign({}, this.props.field);
        field.label = event.target.value;
        this.props.onChange(field);
    }

    private onLabelChange(event: any) {
        let field = assign({}, this.props.field);
        field.options.label = event.target.value;
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