import * as React from 'react';
import { FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { IField, IFieldDisplayProps } from 'react-dynamic-formbuilder';

interface IState { }

export default class KeyValueDisplay extends React.PureComponent<IFieldDisplayProps, IState> {
    public static defaultProps = {
        value: ''
    } as IFieldDisplayProps;

    public render() {
        const { label } = this.props.field;
        return (
            <div>
                <FormGroup>
                    <Col componentClass={ControlLabel} md={6}>{label}</Col>
                    <Col md={6}>
                        <FormControl.Static>
                            {this.props.value}
                        </FormControl.Static>
                    </Col>
                </FormGroup>
            </div>
        )
    }
}