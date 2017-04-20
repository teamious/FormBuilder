import { connect } from './connect';
import { IStore } from './store';
import { IFormBuilderOptionalProps, IFormBuilderRequiredProps, IFormBuilderProps } from '../components/FormBuilder';

export function connectFormBuilder(store: IStore) {
    return (FormBuilder: React.ComponentClass<IFormBuilderProps>): React.ComponentClass<IFormBuilderOptionalProps> => {
        return connect(store, connectStoreToFormBuilder)(FormBuilder) as React.ComponentClass<IFormBuilderOptionalProps>;
    }
}

export function connectStoreToFormBuilder(store: IStore): IFormBuilderRequiredProps {
    return {
        fields: store.getFields(),
        registry: store.getRegistry(),
        onChange: store.onChangeFields,
        onFieldEditing: store.onFieldEditing,
    }
}