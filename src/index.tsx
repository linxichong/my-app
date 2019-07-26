import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./containers/App";
import "./styles/App.css";
import "./i18n";
import "./common/addValidateMethods";

ReactDOM.render(<App />, document.getElementById("app"));
