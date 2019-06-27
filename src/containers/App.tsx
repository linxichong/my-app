import * as React from 'react'
import { Route } from "react-router-dom";
import { history, store } from "../store/configureStore";
import Header from '../components/Header';
import { PATHS } from '../constants';
import { lazy, Suspense } from "react";
import Top from './Top';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import ErrorBoundary from './ErrorBoundary';

const About = lazy(() => import('./About'));
const NovelContainer = lazy(() => import('./NovelContainer'));


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <ErrorBoundary>
                        <Header />
                        <Route exact path={PATHS.TOP} component={Top}></Route>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Route exact path={PATHS.ABOUT} component={About} ></Route>
                            <Route exact path={PATHS.NOVELS} component={NovelContainer} ></Route>
                        </Suspense>
                    </ErrorBoundary>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;