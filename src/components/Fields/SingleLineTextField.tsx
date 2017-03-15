import * as React from 'react';

interface IState {
    label: string;
    hit: string;
    required: boolean;
    allowDuplicates: boolean;
 }

interface IProps { }

export default class SingleLineTextField extends React.Component<IProps, IState> {
    constructor() {
        super();
        this.state = {
            label: '',
            hit: '',
            required: false,
            allowDuplicates: true,
        }
        this.labelOnChange = this.labelOnChange.bind(this);
        this.hitOnChange = this.hitOnChange.bind(this);
        this.requiredOnChange = this.requiredOnChange.bind(this);
        this.allowDuplicatesOnChange = this.allowDuplicatesOnChange.bind(this);
    }
    
    render() {
        return (
            <div>
                <form>
                    <label>Label:</label><br/>
                    <input type='text' value={this.state.label} onChange={this.labelOnChange}/><br/>
                    <label>Hit:</label><br/>
                    <input type='text' value={this.state.hit} onChange={this.hitOnChange} /><br/>
                    <label>Setting:</label><br/>
                    <label><input type='checkbox' checked={this.state.required} onChange={this.requiredOnChange}/>Required</label><br/>
                    <label><input type='checkbox' checked={this.state.allowDuplicates} onChange={this.allowDuplicatesOnChange}/>Allow Duplicates</label><br/>
                </form>
            </div>
        )
    }

    private labelOnChange(event: any) {
        this.setState({label: event.target.value} as IState);
    }
    private hitOnChange(event: any) {
        this.setState({hit: event.target.value} as IState);
    }
    private requiredOnChange(event: any) {
        this.setState({required: !this.state.required} as IState);
    }
    private allowDuplicatesOnChange(event: any) {
        this.setState({allowDuplicates: !this.state.allowDuplicates} as IState);
    }
}