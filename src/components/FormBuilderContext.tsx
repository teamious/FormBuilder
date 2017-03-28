import * as React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

export interface IFormBuilderContextProps {
    children?: React.ReactNode;
}

function FormBuilderContextComponent(props: IFormBuilderContextProps) {
    return (
        <div className='form-builder-context'>
            {props.children}
        </div>
    )
}
export const FormBuilderContext = DragDropContext(HTML5Backend)(FormBuilderContextComponent) as React.ComponentClass<IFormBuilderContextProps>
