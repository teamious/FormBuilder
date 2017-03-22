import * as React from 'react';
import './Snippet.css';

interface IProps {
    code: string;
    lang: 'typescript' | 'javascript';
}

export default function(props: IProps) {
    const lang = Prism.languages[props.lang]
    const code = Prism.highlight(props.code, lang);
    return (
        <div className='snippet'>
            <pre className={`language-${props.lang}`}>
                <code className={`language-${props.lang}`} dangerouslySetInnerHTML={{__html: code}}/>
            </pre>
        </div>
    );
}