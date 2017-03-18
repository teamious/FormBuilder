import * as React from 'react';
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
                <span>{label}</span><br />
                <input type='text' placeholder={hint} required={required} value={this.props.textFieldValue} onChange={this.onTextFieldChange} />
            </div>
        );
    }

    private onTextFieldChange(event: any) {
        this.props.onTextFieldChange(event.target.value);
    }
}