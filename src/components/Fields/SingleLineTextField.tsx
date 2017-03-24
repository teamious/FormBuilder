import * as React from 'react';
import { FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { IField } from '../../data'

interface IState {
}

interface IProps {
    field: IField;
    value: string;
    onValueChange: (field: IField, newValue: string) => void;
}

export default class SingleLineTextField extends React.PureComponent<IProps, IState> {
    public static defaultProps: Partial<IProps> = {
        value: ''
    }
    
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
                        <FormControl type='text' placeholder={hint} required={required} value={this.props.value} onChange={this.onTextFieldChange} />
                    </Col>
                </FormGroup>
            </div>
        );
    }

    private onTextFieldChange(event: any) {
        this.props.onValueChange(this.props.field, event.target.value);
    }
}