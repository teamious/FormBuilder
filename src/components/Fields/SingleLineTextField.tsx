import * as React from 'react';
import { FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { IField } from '../../data'

interface IState {
}

interface IProps {
    field: IField;
    textFieldValue: string;
    onTextFieldChange: (newValue: string) => void;
}

export default class SingleLineTextField extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.onTextFieldChange = this.onTextFieldChange.bind(this);
    }

    public render() {
        const { label, hint, required } = this.props.field.options ? this.props.field.options : null;
        return (
            <div>
                <FormGroup>
                    <Col componentClass={ControlLabel} md={5}>{label}</Col>
                    <Col md={7}>
                        <FormControl type='text' placeholder={hint} required={required} value={this.props.textFieldValue} onChange={this.onTextFieldChange} />
                    </Col>
                </FormGroup>
            </div>
        );
    }

    private onTextFieldChange(event: any) {
        this.props.onTextFieldChange(event.target.value);
    }
}