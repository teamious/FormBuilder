import * as React from 'react';
import * as assign from 'object-assign';

import { IField } from '../../data'
import OrderedListInput from '../Controls/OrderedListInput'

interface IState { }

interface IProps {
    field: IField;
    onChange: (field: IField) => void;
}

export default class SingleSelectorOptionEditor extends React.PureComponent<IProps, IState> {
    constructor() {
        super();
        this.onLabelChange = this.onLabelChange.bind(this);
        this.onOptionsChanged = this.onOptionsChanged.bind(this);
    }

    render() {
        const { label, options } = this.props.field;
        console.log(this.props.field);
        return (
            <div>
                <div><span>Label</span><input type='string' value={label} onChange={this.onLabelChange} /></div>
                <div><OrderedListInput options={options.selectOpts} optionsChanged={this.onOptionsChanged} /></div>
            </div>
        );
    }

    private onLabelChange(event: any) {
        let field = assign({}, this.props.field);
        field.label = event.target.value;
        this.props.onChange(field);
    }

    private onOptionsChanged(selectOpts: Array<string>) {
        let field = assign({}, this.props.field);
        field.options.selectOpts = selectOpts;
        this.props.onChange(field);
    }
}