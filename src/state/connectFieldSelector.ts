import { connect } from './connect';
import { IStore } from './store';
import { IFieldSelectorProps } from '../components/FieldSelector';

export function connectFieldSelector(store: IStore) {
    return (FieldSelector: React.ComponentClass<IFieldSelectorProps>): React.ComponentClass<void> => {
        return connect(store, connectStoreToFieldSelector)(FieldSelector) as React.ComponentClass<void>;
    }
}

export function connectStoreToFieldSelector(store: IStore): IFieldSelectorProps {
    return {
        registry: store.getRegistry(),
    }
}