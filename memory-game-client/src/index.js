import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { createStore } from "redux";
import Reducer from "./js/store/Reducer";
import "./index.css";

const store = createStore(Reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);