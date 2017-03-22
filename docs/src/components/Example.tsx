import * as React from 'react';
import './Example.css';

interface IProps {
    body: React.ReactNode;
    footer: React.ReactNode;
}


interface IState {
    show: boolean;
}

export default class Example extends React.Component<IProps, IState> {

    constructor() {
        super()
        this.toggleCode = this.toggleCode.bind(this);
        this.state = {
            show: false,
        }
    }

    private toggleCode() {
        this.setState({show: !this.state.show} as IState);
    }

    render() {
        return (
            <div className='example'>
                <div className='example-header'>
                    Example
                </div>
                <ExampleBody>
                    {this.props.body}
                    <button onClick={this.toggleCode} className='example-show-code-button'>
                        {this.state.show ? 'Hide code' : 'Show code'}
                    </button>
                </ExampleBody>
                {this.state.show ? (
                    <ExampleFooter>
                        {this.props.footer}
                    </ExampleFooter>
                ) : null}
            </div>
        )
    }
}

interface IChildrenProps {
    children?: React.ReactNode;
}

export function ExampleBody(props: IChildrenProps) {
    return (
        <div className='example-body clearfix'>
            {props.children}
        </div>
    )
}

export function ExampleFooter(props: IChildrenProps) {
    return (
        <div className='example-footer'>
            {props.children}
        </div>
    )
}