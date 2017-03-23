import * as React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

interface IProps {
    children?: React.ReactNode;
}

function FormBuilderContext(props: IProps) {
    return (
        <div className='form-builder-context'>
            {props.children}
        </div>
    )
}

export default DragDropContext(HTML5Backend)(FormBuilderContext) as React.ComponentClass<IProps>
