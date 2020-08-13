import React from "react";
import ReactDOM from "react-dom";
import history from "./utils/history";
import { BrowserRouter, Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store, sagas } from "./store/createStoreSaga";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

sagas();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={history}>
        <App />
      </Router>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
