import * as React from 'react';
import * as data from '../data';
import { FieldSelectorOption } from './FieldSelectorOption';

export interface IFieldSelectorProps {
    registry: data.FieldRegistry;
}

export interface IFieldSelectorState { }

export class FieldSelector extends React.PureComponent<IFieldSelectorProps, IFieldSelectorState> {
    constructor() {
        super()
    }

    render() {
        let options = [];
        for (let key in this.props.registry) {
            const field = this.props.registry[key].field;
            const displayName = this.props.registry[key].displayName;
            options.push(<FieldSelectorOption field={field} key={key} label={displayName} />)
        }

        return (
            <div className='field-selector'>
                {options}
            </div>
        );
    }
}