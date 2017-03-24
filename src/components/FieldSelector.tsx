import * as React from 'react';
import * as data from '../data';
import FieldSelectorOption from './FieldSelectorOption';

interface IProps {
    registry: data.FieldRegistry;
}

interface IState { }

export default class FieldSelector extends React.PureComponent<IProps, IState> {
    constructor() {
        super()
    }

    render() {
        let options = [];
        for (let label in this.props.registry) {
            const field = this.props.registry[label].field;
            options.push(<FieldSelectorOption field={field} key={label} label={label} />)
        }

        return (
            <div className='field-selector'>
                {options}
            </div>
        );
    }
}