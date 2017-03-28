import * as React from 'react';
import * as data from '../data';

import FormDisplayView from './FormDisplayView';

interface IState { };

export default class NestedFormDisplayView extends React.PureComponent<data.IFieldDisplayProps, IState> {
    public static defaultProps: data.IFieldDisplayProps = {
        value: [{}]
    } as data.IFieldDisplayProps;

    constructor(props: data.IFieldDisplayProps) {
        super(props);
        this.renderEntry = this.renderEntry.bind(this);
    }

    render() {
        return (
            <div className='form-display-nested'>
                {this.props.value.map(this.renderEntry)}
            </div>
        )
    }

    private renderEntry(entry: any, index: number) {
        return (
            <div className='form-display-nested-entry'>
                <FormDisplayView
                    fields={this.props.field.fields}
                    registry={this.props.registry}
                    value={entry}
                />
            </div>
        )
    }
}