import * as React from 'react';
import { IField } from '../../data'

const styles = {
    multiLineTextField: {
        resize: 'none',
    }
}

interface IState {
    textFieldValue: string,
}

interface IProps {
    field: IField;
}

export default class MultiLineTextField extends React.PureComponent<IProps, IState> {
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
                <textarea
                    style={styles.multiLineTextField}
                    type='text'
                    placeholder={hint}
                    required={required}
                    value={this.state.textFieldValue}
                    onChange={this.textFieldOnChange}
                />
            </div>
        );
    }

    private textFieldOnChange(event: any) {
        this.setState({ textFieldValue: event.target.value } as IState);
    }
}