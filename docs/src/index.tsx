import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './components/App';
import DemoPage from './components/DemoPage';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App} />
            <Route path='/demo' component={DemoPage} />
        </div>
    </Router>,
    document.getElementById('react-app')
)