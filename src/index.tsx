import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/configureStore";

import App from "./containers/AppContainer";
import "./styles/App.css";
import "./i18n";
import "./common/addValidateMethods";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
