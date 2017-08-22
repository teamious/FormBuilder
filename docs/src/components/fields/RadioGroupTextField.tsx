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
        const { labels, others } = this.props.field.options;

        return (
            <div>
                <FormGroup className='clearfix'>
                    <Col componentClass={ControlLabel} md={5}>{label}</Col>
                    <Col md={7}>
                        {labels.map((item: any)=>{
                            return <Radio name={item.name} key={item.id}>{item.value}</Radio>
                        })}
                        {others.checked &&
                            <div>
                                <Radio name={others.name}>{others.label}</Radio>
                                <FormControl
                                    type='text'
                                    value={others.value}
                                />
                            </div>
                        }
                    </Col>
                </FormGroup>
            </div>
        );
    }

    public onValuesChanged(value: { [id: string]: any }): any {
        return null;
    }

}

export const RadioGroupTextBuilder = createFieldBuilderWrapper()(RadioGroupTextField);