import * as React from 'react';
import * as data from '../data';
import { DragSource, DragSourceCollector, ConnectDragSource, DragSourceConnector, DragSourceSpec } from 'react-dnd';
import ShortText from './ShortText';
import LongText from './LongText';

interface IProps {
    field: data.IField;
}

interface IState {}

interface IDNDProps {
    connectDragSource: ConnectDragSource;
}

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