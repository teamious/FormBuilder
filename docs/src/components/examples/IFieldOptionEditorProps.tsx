import * as React from 'react';
import Snippet from '../Snippet';
const code = require('!!raw!../snippets/IFieldOptionEditorProps');

export default function() {
    return (
        <div>
            <h3>
                <a href='#ifield-option-editor-props' name='ifield-option-editor-props'>
                    IFieldOptionEditorProps
                </a>
            </h3>

            <p>
                Any editor provided to the <strong>FieldRegistry</strong> must use this interface
                as their props definition. When the <strong>FieldOptionEditor</strong> renders
                a component it will pass these properties as props to editor component.
            </p>

            <p>
                This means that any editor will have access to the field via <code>this.props.field</code>
                (which contains the options). When the editor has changed the field definition
                and wants to see those changes reflected they can call <code>this.props.onChange()</code>
                and pass the updated field object.
            </p>

            <Snippet code={code} lang='typescript'/>
        </div>
    )
}