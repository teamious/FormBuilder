import * as React from 'react';
import Snippet from '../Snippet';
const code = require('!!raw!../snippets/IFieldOptionEditorComponent');

export default function() {
    return (
        <div>
            <h3>
                <a href='#ifield-option-editor-component' name='ifield-option-editor-component'>
                    IFieldOptionEditorComponent
                </a>
            </h3>

            <p>
                Any field you provide as an editor via the <strong>FieldRegistry</strong> must satsify this interface.
            </p>

            <Snippet code={code} lang='typescript'/>
        </div>
    )
}