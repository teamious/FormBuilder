import * as React from 'react';
import {
    FormBuilder,
    FormBuilderContext,
    FieldRegistry,
    IField
} from 'form-builder';
import { MyLongText } from './MyLongText';
import { MyShortText } from './MyShortText';


interface IProps {}

interface IState {
    fields: IField[],
}

const registry: FieldRegistry = {
    MyShortText: {
        render: MyShortText,
    },
    MyLongText: {
        render: MyLongText,
    },
}

export default class extends React.Component<IProps, IState> {
    constructor() {
        super();
        this.state = {
            fields: [{
                label: 'Short text',
                type: 'MyrShortText',
                options: {
                    label: 'Label',
                    required: false,
                    placeholder: 'Placeholder',
                }
            },
            {
                label: 'Long text',
                type: 'MyLongText',
                options: {
                    label: 'Label',
                    required: false,
                    placeholder: 'Placeholder',
                }
            }]
        }
    }

    private onChangeFields(fields: IField[]) {
        this.setState({fields} as IState)
    }

    render() {
        return (
            <FormBuilderContext>
                <FormBuilder
                    registry={registry}
                    onFieldEditing={null}
                    onChange={this.onChangeFields}
                    fields={this.state.fields}/>
            </FormBuilderContext>
        );
    }
}