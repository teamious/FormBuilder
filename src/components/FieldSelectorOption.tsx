import * as React from 'react';
import * as data from '../data';
import { DragSource, DragSourceCollector, ConnectDragSource, DragSourceConnector, DragSourceSpec } from 'react-dnd';

export interface IFieldSelectorOptionProps {
    field: data.IField;
    label: string;
}

interface IState { }

interface IDNDProps {
    connectDragSource: ConnectDragSource;
}

// FieldSelectorOption displays an option that can be drag and dropped into the FormBuilder.
// When an option is dragged, it will send the field and index (always null) of the option
// to the drag an drop context.
class FieldSelectorOptionComponent extends React.Component<IFieldSelectorOptionProps & IDNDProps, IState> {
    render() {
        const { connectDragSource, field, label } = this.props;
        return connectDragSource(
            <div className='field-selector-option'>
                <span className='field-selector-option-label'>
                    {label}
                </span>
            </div>
        );
    }
}

const spec: DragSourceSpec<IFieldSelectorOptionProps> = {
    beginDrag(props, monitor, component): data.IDragSourceItem {
        return {
            field: props.field,
            index: null,
        };
    }
}

const collect: DragSourceCollector = (connect, monitor): IDNDProps => {
    return {
        connectDragSource: connect.dragSource(),
    }
}

export const FieldSelectorOption = DragSource(data.FIELD_SELECTOR_FIELD, spec, collect)(FieldSelectorOptionComponent) as React.ComponentClass<IFieldSelectorOptionProps>;