import * as React from 'react';
import * as data from '../../../src/data';
import * as assign from 'object-assign';
import { FormGroup, FormControl, ControlLabel, Checkbox, Form, Col } from 'react-bootstrap';

interface IProps {
    field: data.IField;
    onChange: (field: data.IField) => void;
}

interface IState {

}

export default class extends React.Component<IProps, IState> {
    constructor() {
        super();
        this.onChangeLabel = this.onChangeLabel.bind(this);
        this.onChangePlaceholder = this.onChangePlaceholder.bind(this);
        this.onChangeRequired = this.onChangeRequired.bind(this);
    }

    private updateAndChange(field: data.IField) {
        const newField = assign({}, this.props.field, field);
        this.props.onChange(newField);
    }

    private onChangeLabel(event: any) {
        const options = assign({}, this.props.field.options, {
            label: event.target.value
        });
        this.updateAndChange({options} as data.IField);
    }

    private onChangeRequired(event: any) {
        const options = assign({}, this.props.field.options, {
            required: event.target.checked
        });
        this.updateAndChange({options} as data.IField);
    }

    private onChangePlaceholder(event: any) {
        const options = assign({}, this.props.field.options, {
            placeholder: event.target.value
        });
        this.updateAndChange({options} as data.IField);
    }

    render() {
        const { field }= this.props;
        return (
            <div>
                <Form horizontal>
                    <FormGroup>
                        <Col sm={4}>
                            <ControlLabel>
                                Label:
                            </ControlLabel>
                        </Col>

                        <Col sm={8}>
                            <FormControl
                                value={field.options.label}
                                type='text'
                                onChange={this.onChangeLabel}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={4}>
                            <ControlLabel>
                                Required:
                            </ControlLabel>
                        </Col>
                        <Col sm={8}>
                            <Checkbox checked={field.options.required} onChange={this.onChangeRequired}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={4}>
                            <ControlLabel>
                                Placeholder:
                            </ControlLabel>
                        </Col>
                        <Col sm={8}>
                            <FormControl
                                value={field.options.placeholder}
                                type='text'
                                onChange={this.onChangePlaceholder}/>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}