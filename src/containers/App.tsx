import * as React from "react";
import { Route } from "react-router-dom";
import { history, store } from "../store/configure-store";
import Header from "../components/Header";
import { PATHS } from "../constants";
import Top from "./Top";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";

const About = React.lazy(() => import("./About"));
const NovelContainer = React.lazy(() => import("./NovelContainer"));
const MaterialUI = React.lazy(() => import("./MaterialUI"));

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ErrorBoundary>
            <Header />
            <Route exact path={PATHS.TOP} component={Top} />
            <React.Suspense fallback={<div>Loading...</div>}>
              <Route exact path={PATHS.ABOUT} component={About} />
              <Route exact path={PATHS.NOVELS} component={NovelContainer} />
              <Route exact path={PATHS.UI} component={MaterialUI} />
            </React.Suspense>
          </ErrorBoundary>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
