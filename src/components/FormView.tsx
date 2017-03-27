import * as React from 'react';
import * as assign from 'object-assign';

import * as data from '../data';

interface IProps {
    fields: data.IField[];
    value: any;
}

interface IState { }

export default class FormView extends React.PureComponent<IProps, IState> {
    render() {
        return (
            <div>FormView</div>
        )
    }
}