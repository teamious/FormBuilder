import * as React from 'react';
import { FormControl, Button } from 'react-bootstrap';
import * as assign from 'object-assign';

import { IFieldOptionEditorProps } from '../../../../src/data';
import OrderedListInput from '../controls/OrderedListInput';

interface IState { }

export default class SingleSelectorOptionEditor extends React.PureComponent<IFieldOptionEditorProps, IState> {
    constructor() {
        super();
        this.onLabelChange = this.onLabelChange.bind(this);
        this.onOptionsChanged = this.onOptionsChanged.bind(this);
    }

    render() {
        const { label, selectOpts } = this.props.field.options;
        return (
            <div>
                <span>Label</span>
                <FormControl type='text' value={label} onChange={this.onLabelChange} />
                <OrderedListInput options={selectOpts} optionsChanged={this.onOptionsChanged} />
            </div>
        );
    }

    private onLabelChange(event: any) {
        let field = assign({}, this.props.field);
        field.options.label = event.target.value;
        this.props.onChange(field);
    }

    private onOptionsChanged(selectOpts: Array<string>) {
        let field = assign({}, this.props.field);
        field.options.selectOpts = selectOpts;
        this.props.onChange(field);
    }
}