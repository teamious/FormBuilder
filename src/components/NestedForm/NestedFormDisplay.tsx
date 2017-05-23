import * as React from 'react';
import * as data from '../../data';

import { FormDisplay } from '../FormDisplay';

export interface INestedFormDisplayState { };

export class NestedFormDisplay extends React.PureComponent<data.IFieldDisplayProps, INestedFormDisplayState> {
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
                <div className='form-display-nested-label'>{this.props.field.label}</div>
                {this.props.value.map(this.renderEntry)}
            </div>
        )
    }

    private renderEntry(entry: any, index: number) {
        return (
            <div className='form-display-nested-entry'>
                {this.props.showIndex && <div className='form-display-nested-entry-index'>{index + 1}</div>}
                <FormDisplay
                    fields={this.props.field.fields}
                    registry={this.props.registry}
                    value={entry}
                />
            </div>
        )
    }
}