import * as React from 'react';
import Snippet from '../Snippet';
const code = require('!!raw!../../../../src/data/IFieldOptionEditor.tsx');

export default function() {
    return (
        <div>
            <h3>
                <a href='#ifield-option-editor-component' name='ifield-option-editor-component'>
                    IFieldOptionEditorComponent
                </a>
            </h3>

            <p>
                Any field you provide as an editor via the <strong>FieldRegistry</strong> must satsify this interface. Your editor will
                receive the field as a prop. When you have modified the field or it's options in your editor, you
                must propagate the change using the onChange prop.
            </p>

            <Snippet code={code} lang='typescript'/>
        </div>
    )
}