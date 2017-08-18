import * as React from 'react';
import { FormControl, FormGroup, ControlLabel, Col, ButtonToolbar, Radio } from 'react-bootstrap';
import { IField, IFieldBuilderProps, IFieldInputProps, IFieldInputInjector, createFieldBuilderWrapper } from 'react-dynamic-formbuilder';

interface IState {
}

export class RadioGroupTextField extends React.PureComponent<IFieldInputProps & IFieldBuilderProps, IState> implements IFieldInputInjector {
    public static defaultProps = {
        value: '',
    } as IFieldInputProps & IFieldBuilderProps

    constructor(props: IFieldInputProps & IFieldBuilderProps) {
        super(props);
    }

    public render() {
        const { label, fields } = this.props.field;
        return (
            <div>
                <FormGroup className='clearfix'>
                    <Col componentClass={ControlLabel} md={5}>{label}</Col>
                    <Col md={7}>
                        {fields.map((item)=>{
                            //TODO: (xiongchao) radio name is wrong
                            return <Radio name={item.type} key={item.id}>{item.label}</Radio>
                        })}
                    </Col>
                </FormGroup>
            </div>
        );
    }

    public onValuesChanged(value: { [id: string]: any }): any {
        console.log("Radio onValuesChange", value);
        return null;
    }

}

export const RadioGroupTextBuilder = createFieldBuilderWrapper()(RadioGroupTextField);
