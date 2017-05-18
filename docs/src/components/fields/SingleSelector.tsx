import * as React from 'react';
import { FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { IField, IFieldBuilderProps, IFieldInputProps, createFieldBuilderWrapper } from 'react-dynamic-formbuilder';

interface IState { }

export class SingleSelector extends React.PureComponent<IFieldBuilderProps & IFieldInputProps, IState> {
    public static defaultProps = {
        value: ''
    } as IFieldInputProps & IFieldBuilderProps

    constructor() {
        super();
        this.onSelectorChanged = this.onSelectorChanged.bind(this);
    }

    render() {
        const { selectOpts } = this.props.field.options ? this.props.field.options : null;
        return (
            <div>
                <FormGroup className='clearfix'>
                    <Col componentClass={ControlLabel} md={5}>{this.props.field.label}</Col>
                    <Col md={7}>
                        <FormControl componentClass="select" value={this.props.value} onChange={this.onSelectorChanged}>
                            {selectOpts && this.renderOpts(selectOpts)}
                        </FormControl>
                    </Col>
                </FormGroup>
            </div>
        );
    }

    private onSelectorChanged(event: any) {
        if (this.props.onValueChange) {
            this.props.onValueChange(this.props.field, event.target.value, null);
        }
    }

    private renderOpts(opts: Array<any>) {
        return opts.map(
            (opt, index) => <option key={index}>{opt}</option>
        );
    }
}

export const SingleSelectorBuilder = createFieldBuilderWrapper()(SingleSelector);
