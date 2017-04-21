import { connect } from './connect';
import { IStore } from './store';
import { IFieldOptionEditorComponentProps } from '../components/FieldOptionEditor';

export function connectFieldOptionEditor(store: IStore) {
    return (FieldOptionEditor: React.ComponentClass<IFieldOptionEditorComponentProps>): React.ComponentClass<void> => {
        return connect(store, connectStoreToFieldOptionEditor)(FieldOptionEditor) as React.ComponentClass<void>;
    }
}

export function connectStoreToFieldOptionEditor(store: IStore): IFieldOptionEditorComponentProps {
    return {
        field: store.getEditingField(),
        fieldContext: store.getEditingContext(),
        registry: store.getRegistry(),
        onChange: store.onFieldChanged,
    }
}