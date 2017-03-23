import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import Docs from './Docs';
import DemoPage from './DemoPage';

export default function() {
    return (
        <Router>
            <div>
                <Navbar>
                    <Navbar.Brand>
                        <span>form-builder</span>
                    </Navbar.Brand>
                    <Nav>
                        <NavItem><Link to='/demopage'>Demo page</Link></NavItem>
                        <NavItem><Link to='/docs'>Docs</Link></NavItem>
                    </Nav>
                </Navbar>
                <Route path='/demopage' component={DemoPage} />
                <Route path='/docs' component={Docs} />
            </div>
        </Router>
    )
}