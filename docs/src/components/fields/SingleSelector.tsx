import * as React from 'react';
import { FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { IField, IFieldBuilderProps, IFieldRenderProps } from '../../../../src/data';

interface IState { }

export default class SingleSelector extends React.PureComponent<IFieldBuilderProps & IFieldRenderProps, IState> {
    public static defaultProps = {
        value: ''
    } as IFieldRenderProps & IFieldBuilderProps

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
        this.props.onValueChange(this.props.field, event.target.value);
    }

    private renderOpts(opts: Array<any>) {
        return opts.map(
            (opt, index) => <option key={index}>{opt}</option>
        );
    }
}