import * as React from 'react';
import { FormControl, Checkbox } from 'react-bootstrap';
import * as assign from 'object-assign';

import { IFieldOptionEditorProps } from 'react-dynamic-formbuilder';

interface IState { }


export default class RadioGroupOptionEditor extends React.PureComponent<IFieldOptionEditorProps, IState> {

    addOptionId: number;

    constructor() {
        super();

        this.onLabelChange = this.onLabelChange.bind(this);
        this.onRequiredChange = this.onRequiredChange.bind(this);
        this.onLabelValueChange = this.onLabelValueChange.bind(this);
        this.addOption = this.addOption.bind(this);
        this.addOptionId = 0;
    }

    render() {
        const { label, fields } = this.props.field;
        const { required, unique } = this.props.field.options;
        return (
            <div>
                <div>
                    <span>Label</span>
                    <FormControl type='text' value={label} onChange={this.onLabelChange} />
                    <span>选项设置</span>
                    {fields.map((item) => {
                        return <div className="dotted-box" key={item.id}>
                            <a
                                href="javascript:void(0)"
                                className="box-close"
                                onClick={this.removeOption.bind(this, item)}
                            >X</a>
                            <FormControl
                                id={item.id}
                                type='text'
                                value={item.label}
                                onChange={this.onLabelValueChange}
                            />
                        </div>
                    })}
                    <a href="javascript:void(0)" onClick={this.addOption}>添加单个选项</a>
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

    private onLabelValueChange(event: any) {
        let field = assign({}, this.props.field);
        field.fields.map((item, index) => {
            if (event.target.id === item.id) {
                field.fields[index].label = event.target.value
            }
        });
        this.props.onChange(field);
    }

    private removeOption(option: any) {
        let field = assign({}, this.props.field);
        field.fields.map((item, index) => {
            if (option.id === item.id) {
                field.fields.splice(index, 1);
            }
        });
        this.props.onChange(field);
    }

    private addOption() {
        //动态添加option
        let field = assign({}, this.props.field);
        let new_option = {
            id: (this.addOptionId++).toString(),
            label: "选项"+this.addOptionId,
            type: "ABCDEFG"
        };
        field.fields.push(new_option);
        this.props.onChange(field);
    }

}
