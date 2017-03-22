import * as React from 'react';
import { FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { IField } from '../../data'

interface IState { }

interface IProps {
    field: IField;
}

export default class SingleSelector extends React.PureComponent<IProps, IState> {
    render() {
        const { label, selectOpts } = this.props.field.options ? this.props.field.options : null;
        return (
            <div>
                <FormGroup>
                    <Col componentClass={ControlLabel} md={5}>{label}</Col>
                    <Col md={7}>
                        <FormControl componentClass="select">
                            {selectOpts && this.renderOpts(selectOpts)}
                        </FormControl>
                    </Col>
                </FormGroup>
            </div>
        );
    }

    renderOpts(opts: Array<any>) {
        return opts.map(
            (opt, index) => <option key={index}>{opt}</option>
        );
    }
}