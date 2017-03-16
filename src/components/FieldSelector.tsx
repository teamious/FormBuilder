import * as React from 'react';
import * as data from '../data';
import FieldSelectorOption from './FieldSelectorOption';

interface IProps {
    fields: data.IField[];
}

interface IState { }

export default class FieldSelector extends React.PureComponent<IProps, IState> {
    constructor() {
        super()
    }

    render() {
        const options = this.props.fields.map(
            (field: data.IField, index: number) => <FieldSelectorOption field={field} key={index} />
        );

        return (
            <div>
                {options}
            </div>
        );
    }
}