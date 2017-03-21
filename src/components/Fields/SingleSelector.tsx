import * as React from 'react';
import { FormControl } from 'react-bootstrap';
import { IField } from '../../data'

interface IState { }

interface IProps {
    field: IField;
}

export default class SingleSelector extends React.PureComponent<IProps, IState> {
    render() {
        const selectOpts = this.props.field.options ? this.props.field.options.selectOpts : null;
        return (
            <FormControl componentClass="select">
                {selectOpts && this.renderOpts(selectOpts)}
            </FormControl>
        );
    }

    renderOpts(opts: Array<any>) {
        return opts.map(
            (opt, index) => <option key={index}>{opt}</option>
        );
    }
}