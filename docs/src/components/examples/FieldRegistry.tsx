import * as React from 'react';
import Snippet from '../Snippet';
import Example from '../Example';

const fieldRegistry = require('!!raw!../snippets/FieldRegistry');
const fieldRegistryUsage = require('!!raw!../snippets/FieldRegistryUsage');

export default function() {
    return (
        <div>
            <h3>
                <a href='#field-registry' name='field-registry'>
                    FieldRegistry
                </a>
            </h3>

            <p>
                The <strong>FieldRegistry</strong> type is used by <strong>FormBuilder</strong> and <strong>OptionEditor</strong> to
                determine how your custom field type should be rendered.
            </p>

            <Snippet code={fieldRegistry} lang='typescript'/>

            <p>
                <strong>Example</strong>
            </p>
            <Snippet code={fieldRegistryUsage} lang='typescript'/>
        </div>
    );
}