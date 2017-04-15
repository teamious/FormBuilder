import * as React from 'react';
import * as data from '../data';
import { FieldSelectorOption } from './FieldSelectorOption';
import { FormBuilderContext } from './FormBuilderContext';

export interface IFieldSelectorProps {
    registry: data.FieldRegistry;
}

export interface IFieldSelectorState { }

export class FieldSelector extends React.PureComponent<IFieldSelectorProps, IFieldSelectorState> {
    constructor() {
        super()
    }

    render() {
        let options = [];
        this.props.registry.getFields().forEach(def => {
            const {field, displayName} = def;
            options.push(<FieldSelectorOption field={field} key={def.type} label={displayName} />)
        });
        return (
            <FormBuilderContext>
                <div className='field-selector'>
                    {options}
                </div>
            </FormBuilderContext>
        );
    }
}