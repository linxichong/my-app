import * as React from 'react'
import { Route } from "react-router-dom";
import { history, store } from "../store/configureStore";
import Header from '../components/Header';
import { PATHS } from '../constants';
import { lazy, Suspense } from "react";
import Top from './Top';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'

const About = lazy(() => import('./About'));
const TodoComp = lazy(() => import('./TodoComp'));


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Header />
                    <Route exact path={PATHS.TOP} component={Top}></Route>
                    <Suspense fallback={() => <div>Loading...</div>}>
                        <Route exact path={PATHS.ABOUT} component={About} ></Route>
                        <Route exact path={PATHS.TODOS} component={TodoComp} ></Route>
                    </Suspense>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;