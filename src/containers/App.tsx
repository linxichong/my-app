import * as React from 'react'
import { Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Top from '../components/Top';
import About from '../components/About';
import Header from '../components/Header';
import { PATHS } from '../constants';

let history = createBrowserHistory()

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Header />
                <Route exact path={PATHS.TOP} component={Top}></Route>
                <Route exact path={PATHS.ABOUT} component={About} ></Route>
            </Router>
        );
    }
}

export default App;