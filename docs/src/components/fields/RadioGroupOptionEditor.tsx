import * as React from 'react';
import { FormControl, Checkbox } from 'react-bootstrap';
import * as assign from 'object-assign';

import { IFieldOptionEditorProps } from 'react-dynamic-formbuilder';
import OrderedListInput from '../controls/OrderedListInput';

export default class RadioGroupOptionEditor extends React.PureComponent<IFieldOptionEditorProps, void> {

    addOptionId: number;

    constructor() {
        super();

        this.onLabelChange = this.onLabelChange.bind(this);
        this.onRequiredChange = this.onRequiredChange.bind(this);
        this.onAddOthersChange = this.onAddOthersChange.bind(this);
        this.onOthersValueChange = this.onOthersValueChange.bind(this);
        this.onOthersLabelChange = this.onOthersLabelChange.bind(this);
        this.onOptionsChanged = this.onOptionsChanged.bind(this);
        this.addOptionId = 0;
    }

    render() {
        const { label } = this.props.field;
        const { labels, required, unique, others } = this.props.field.options;
        
        return (
            <div>
                <div>
                    <span>Label</span>
                    <FormControl type='text' value={label} onChange={this.onLabelChange} />
                    <span>选项设置</span>
                    <OrderedListInput options={labels} optionsChanged={this.onOptionsChanged} />
                </div>
                <div >
                <Checkbox checked={others.checked} onChange={this.onAddOthersChange}>添加'其他'选项</Checkbox>
                {others.checked &&
                    <div>
                        <span>标题：</span>
                        <FormControl
                            type='text'
                            value={others.label}
                            onChange={this.onOthersLabelChange}
                        />
                        <span>提示文字：</span>
                        <FormControl
                            type='text'
                            value={others.value}
                            onChange={this.onOthersValueChange}
                        />
                    </div>
                }
                </div>
                <div>
                    <span>Setting</span>
                    <Checkbox checked={required} onChange={this.onRequiredChange}>Required</Checkbox>
                </div>
            </div>
        )
    }

    private onLabelChange(event: any) {
        let field = assign({}, this.props.field);
        field.label = event.target.value;
        this.props.onChange(field);
    }

    private onRequiredChange(event: any) {
        let field = assign({}, this.props.field);
        field.options.required = !this.props.field.options.required;
        this.props.onChange(field);
    }

    private onAddOthersChange() {
        let field = assign({}, this.props.field);
        field.options.others.checked = !this.props.field.options.others.checked;
        this.props.onChange(field);
    }

    private onOthersLabelChange(event: any) {
        let field = assign({}, this.props.field);
        field.options.others.label = event.target.value;
        this.props.onChange(field);
    }

    private onOthersValueChange(event: any) {
        let field = assign({}, this.props.field);
        field.options.others.value = event.target.value;
        this.props.onChange(field);
    }

    private onOptionsChanged(selectOpts: Array<string>) {
        let field = assign({}, this.props.field);
        field.options.labels = selectOpts;
        this.props.onChange(field);
    }

}