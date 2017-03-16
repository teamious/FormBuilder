import * as React from 'react';
import { IField } from '../../data'

interface IState {
}

interface IProps {
    field: IField;
    value: string,
    onChange: (newValue: string) => void;
}

export default class SingleLineTextField extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        const { label, hint, required, unique } = this.props.field.options ? this.props.field.options : null;
        return (
            <div>
                <label>{label}</label><br />
                <input type='text' placeholder={hint} required={required} value={this.props.value} onChange={this.onChange}/>
            </div>
        );
    }

    private onChange(event: any) {
        this.props.onChange(event.target.value);
    }
}