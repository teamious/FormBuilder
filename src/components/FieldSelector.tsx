import * as React from 'react';
import * as data from '../data';
import FieldSelectorOption from './FieldSelectorOption';

interface IProps {
    fields: data.IField[];
}

interface IState {}

export default class FieldSelector extends React.Component<IProps, IState> {
    constructor() {
        super()
        this.renderOption = this.renderOption.bind(this);
    }

    renderOption(field: data.IField) {
        return <FieldSelectorOption field={field}/>
    }

    render() {
        const options = this.props.fields.map(this.renderOption);
        return (
            <div>
                {options}
            </div>
        );
    }
}