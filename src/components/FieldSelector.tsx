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