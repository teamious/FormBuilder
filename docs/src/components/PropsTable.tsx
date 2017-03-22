import * as React from 'react';
import { Table } from 'react-bootstrap';

export interface IPropRow {
    name: React.ReactNode,
    required: boolean,
    type: React.ReactNode,
    description: React.ReactNode,
    default: React.ReactNode,
}

interface IProps {
    data: Array<IPropRow>;
}

export default function (props: IProps) {
    const rows = props.data.map(row => {
        return (
            <tr>
                <td>{row.name}</td>
                <td>{row.type}</td>
                <td>{row.default}</td>
                <td>{row.required ? 'required' : 'optional'}</td>
                <td>{row.description}</td>
            </tr>
        )
    });
    return (
        <div>
            <h4>
                Props
            </h4>
            <Table striped bordered condensed>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Required</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </div>
    )
}