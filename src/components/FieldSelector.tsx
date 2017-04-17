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
        const options = this.props.registry.getFields().map(def => {
            const {field, displayName, type} = def;
            return <FieldSelectorOption field={field} key={type} label={displayName} />;
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