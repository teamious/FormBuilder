import * as React from 'react';
import { IField } from '../../data'

interface IState {
}

interface IProps {
    field: IField;
    textFieldValue: string,
    textFieldOnChange: (newValue: string) => void;
}

export default class SingleLineTextField extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.textFieldOnChange = this.textFieldOnChange.bind(this);
    }

    public render() {
        const { label, hint, required, unique } = this.props.field.options ? this.props.field.options : null;
        return (
            <div>
                <span>{label}</span><br />
                <input type='text' placeholder={hint} required={required} value={this.props.textFieldValue} onChange={this.textFieldOnChange} />
            </div>
        );
    }

    private textFieldOnChange(event: any) {
        this.props.textFieldOnChange(event.target.value);
    }
}