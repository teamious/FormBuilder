import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import { Router, Route, browserHistory } from 'react-router';

let Routes = (
    <Router history={browserHistory}>
        <Route path='/' component={App}/>
    </Router>
);

ReactDOM.render(
    Routes,
    document.getElementById('root')
);
