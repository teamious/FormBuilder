import * as React from 'react';

import { IField } from '../../data'

export interface IOptionEditorProps {
    field: IField;
    onChange: (field: IField) => void;
}

export class AbstractOptionEditor<P extends IOptionEditorProps, S> extends React.PureComponent<P, S>  {

}