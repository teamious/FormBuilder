import * as React from 'react';
import * as data from '../data';
import { DragSource, DragSourceCollector, ConnectDragSource, DragSourceConnector, DragSourceSpec } from 'react-dnd';

interface IProps {
    field: data.IField;
}

interface IState {}

interface IDNDProps {
    connectDragSource: ConnectDragSource;
}

// FieldSelectorOption displays an option that can be drag and dropped into the FormBuilder.
// When an option is dragged, it will send the field and index (always null) of the option
// to the drag an drop context.
class FieldSelectorOption extends React.Component<IProps & IDNDProps, IState> {
    render() {
        const {connectDragSource, field} = this.props;
        return connectDragSource(
            <div>
                {field.label}
            </div>
        );
    }
}

const spec: DragSourceSpec<IProps> = {
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

export default DragSource(data.FIELD_SELECTOR_FIELD, spec, collect)(FieldSelectorOption) as React.ComponentClass<IProps>;