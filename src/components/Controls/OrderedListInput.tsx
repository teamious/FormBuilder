import * as React from 'react';

interface IState {
    options: Array<string>;
}

interface IProps {
    options: Array<string>;
}

export default class OrderedListInput extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            options: this.props.options
        };

        this.createOpt = this.createOpt.bind(this);
        this.deleteOpt = this.deleteOpt.bind(this);
        this.moveUpOpt = this.moveUpOpt.bind(this);
        this.moveDownOpt = this.moveDownOpt.bind(this);
        this.optValueChange = this.optValueChange.bind(this);
    }

    public render() {
        console.log('OrderedListInput render')
        const opts = this.state.options;
        return (<div>
            {opts.map((opt, index) =>
                <OrderedItemInput key={index} index={index} optValue={opt} moveUp={this.moveUpOpt} moveDown={this.moveDownOpt} delete={this.deleteOpt} valueChange={this.optValueChange} />)}
            <div><button onClick={this.createOpt}>Create</button></div>
        </div>);
    }

    private createOpt() {
        let options = this.state.options.concat(['']);
        this.setState({ options: options });
    }

    private deleteOpt(index: number) {
        let options = this.state.options.splice(0)
        options.splice(index, 1);
        this.setState({ options: options });
    }

    private moveUpOpt(index: number) {
        if (index === 0) {
            return;
        }

        let options = this.state.options.splice(0);
        this.swap(options, index, index - 1);
        this.setState({ options: options });
    }

    private moveDownOpt(index: number) {
        if (index === this.state.options.length - 1) {
            return;
        }

        let options = this.state.options.splice(0);
        this.swap(options, index, index + 1);
        this.setState({ options: options });
    }

    private optValueChange(index: number, optValue: string) {
        let options = this.state.options.splice(0);
        options[index] = optValue;
        this.setState({ options: options });
    }

    private swap(arr: Array<string>, index1: number, index2: number) {
        if (index1 >= 0 && index1 < arr.length && index2 >= 0 && index2 < arr.length) {
            let tmp = arr[index1];
            arr[index1] = arr[index2];
            arr[index2] = tmp;
        }
    }
}

interface IItemInputProps {
    index: number;
    optValue: string;
    moveUp: (index: number) => void;
    moveDown: (index: number) => void;
    delete: (index: number) => void;
    valueChange: (index: number, value: string) => void;
}

class OrderedItemInput extends React.PureComponent<IItemInputProps, {}> {
    constructor(props: IItemInputProps) {
        super(props);
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.delete = this.delete.bind(this);
        this.valueChange = this.valueChange.bind(this);
    }

    public render() {
        const optValue = this.props.optValue;
        return <div>
            <input type="string" value={optValue} onChange={this.valueChange} />
            <button onClick={this.moveUp}>Up</button>
            <button onClick={this.moveDown}>Down</button>
            <button onClick={this.delete}>Delete</button>
        </div>;
    }

    private moveUp() {
        this.props.moveUp(this.props.index);
    }

    private moveDown() {
        this.props.moveDown(this.props.index);
    }

    private delete() {
        this.props.delete(this.props.index);
    }

    private valueChange(event: any) {
        this.props.valueChange(this.props.index, event.target.value);
    }
}