import * as React from 'react';
import Snippet from './Snippet';
import UsageExample from './examples/Usage';
import FieldSelectorExample from './examples/FieldSelector';
import FormBuilderExample from './examples/FormBuilder';
import FieldOptionEditorExample from './examples/FieldOptionEditor';
import FieldRegistryExample from './examples/FieldRegistry';
import IFieldOptionEditorComponentExample from './examples/IFieldOptionEditorComponent';
import IntroductionExample from './examples/Introduction';
import IFieldExample from './examples/IField';
import { Nav, NavItem } from 'react-bootstrap';
import './App.scss';

export default function() {
    return (
        <div className='container'>
            <div className='app-nav'>
                <Nav stacked>
                    <NavItem href='#introduction'>Introduction</NavItem>
                    <NavItem href='#installation'>Installation</NavItem>
                    <NavItem href='#demo'>Demo</NavItem>
                    <NavItem href='#components'>Components</NavItem>
                    <NavItem className='nested' href='#field-selector'>FieldSelector</NavItem>
                    <NavItem className='nested' href='#form-builder'>FormBuilder</NavItem>
                    <NavItem className='nested' href='#field-option-editor'>FieldOptionEditor</NavItem>
                    <NavItem href='#interfaces'>Interfaces</NavItem>
                    <NavItem className='nested' href='#ifield'>IField</NavItem>
                    <NavItem className='nested' href='#ifield-option-editor-component'>IFieldOptionEditorComponent</NavItem>
                    <NavItem href='#types'>Types</NavItem>
                    <NavItem className='nested' href='#field-registry'>FieldRegistry</NavItem>
                </Nav>
            </div>

            <div className='docs'>
                <IntroductionExample/>

                <h3>
                    <a href='#installation' name='installation'>
                        Installation
                    </a>
                </h3>
                <pre>
                    npm install react-dynamic-formbuilder --save
                </pre>

                <UsageExample/>

                <h3>
                    <a href='#components' name='components'>
                        Components
                    </a>
                </h3>
                <FieldSelectorExample/>
                <FormBuilderExample/>
                <FieldOptionEditorExample/>
                <IFieldOptionEditorComponentExample/>
                <h3>
                    <a href='#interfaces' name='interfaces'>
                        Interfaces
                    </a>
                </h3>
                <IFieldExample/>

                <h3>
                    <a href='#types' name='types'>
                        Types
                    </a>
                </h3>

                <FieldRegistryExample/>
            </div>
        </div>
    );
}