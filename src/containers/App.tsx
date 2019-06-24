import * as React from 'react'
import { Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Header from '../components/Header';
import { PATHS } from '../constants';
import { lazy, Suspense } from "react";
import Top from '../components/Top';

const About = lazy(() => import('../components/About'));
let history = createBrowserHistory()

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Header />
                <Route exact path={PATHS.TOP} component={Top}></Route>
                <Suspense fallback={() => <div>Loading...</div>}>
                    <Route exact path={PATHS.ABOUT} component={About} ></Route>
                </Suspense>
            </Router>
        );
    }
}

export default App;