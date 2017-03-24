import * as React from 'react';
import { FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { IField, IFieldBuilderProps, IFieldRenderProps } from '../../data';

interface IState {
}

export default class SingleLineTextField extends React.PureComponent<IFieldRenderProps & IFieldBuilderProps, IState> {
    public static defaultProps = {
        value: ''
    } as IFieldRenderProps & IFieldBuilderProps
    
    constructor(props: IFieldRenderProps & IFieldBuilderProps) {
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