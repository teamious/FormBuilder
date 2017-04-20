import * as React from 'react';
import { IStore } from './store';

export interface MapStateFunc<T> {
    (store: IStore): T;
}

export interface ConnectComponent<WrappedComponentProps> {
    (WrappedComponent: React.ComponentClass<WrappedComponentProps>): React.ComponentClass<any>;
}

// connect works similar to react-redux. It takes in a store and a function
// to map the state. This function should not be consumed directly because.
// Instead use a helper function: connectFormBuilder, connectFieldSelector, connectFieldOptionEditor.
export function connect<WrappedComponentProps>(store: IStore, mapState: MapStateFunc<WrappedComponentProps>): ConnectComponent<WrappedComponentProps> {
    return (WrappedComponent: React.ComponentClass<WrappedComponentProps>) => {
        return class Connected extends React.Component<void, WrappedComponentProps> {
            constructor() {
                super();
                this.getState = this.getState.bind(this);
                this.state = mapState(store) as WrappedComponentProps;
                store.subscribe(this.getState);
            }

            private getState() {
                this.setState(mapState(store));
            }

            componentDidMount() {
                store.subscribe(this.getState);
            }

            componentWillUnmount() {
                store.unsubscribe(this.getState);
            }

            render() {
                return <WrappedComponent {...this.props} {...this.state}/>;
            }
        }
    }
}
