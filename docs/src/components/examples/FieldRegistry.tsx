import * as React from 'react';
import Snippet from '../Snippet';
import Example from '../Example';

const fieldRegistry = require('!!raw!../../../../src/data/FieldRegistry.tsx');

export default function() {
    return (
        <div>
            <h3>
                <a href='#field-registry' name='field-registry'>
                    FieldRegistry
                </a>
            </h3>

            <p>
                The <strong>FieldRegistry</strong> type is used by <strong>FormBuilder</strong> and <strong>FieldOptionEditor</strong> to
                determine how your custom field type should be rendered.
            </p>

            <Snippet code={fieldRegistry} lang='typescript'/>
        </div>
    );
}