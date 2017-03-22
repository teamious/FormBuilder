import * as React from 'react';
import * as data from '../../../src/data';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

interface IProps {
    field: data.IField;
}

interface IState {}

interface IOptions {
    label: string;
    required: boolean;
    placeholder: string;
}


export default class LongText extends React.Component<IProps, IState> {
    render() {
        const options: IOptions = this.props.field.options;
        return (
            <div>
                <FormGroup>
                    <ControlLabel>
                        {options.label}
                    </ControlLabel>
                    <FormControl required={options.required} componentClass='textarea' placeholder={options.placeholder}/>
                </FormGroup>
            </div>
        )
    }
}