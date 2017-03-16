import * as React from 'react';
import { IField } from '../../data'

interface IState {
    textFieldValue: string,
}

interface IProps {
    field: IField;
}

export default class SingleLineTextField extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            textFieldValue: '',
        };
    }

    public render() {
        const { label, hint, required } = this.props.field.options ? this.props.field.options : null;
        return (
            <div>
                <label>{label}</label><br />
                <input type='text' placeholder={hint} value={this.state.textFieldValue} onChange={this.textFieldOnChange} required={required}/>
            </div>
        );
    }

    private textFieldOnChange(event: any) {
        this.setState({ textFieldValue: event.target.value } as IState);
    }
}