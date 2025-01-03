import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
//import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  // const good = () => {
  //   store.dispatch({
  //     type: "GOOD"
  //   });
  // };

  const dispatch = action => {
    store.dispatch({
      type: action
    });
  };

  return (
    <div>
      <button onClick={() => dispatch("GOOD")}>good</button>
      <button onClick={() => dispatch("OK")}>ok</button>
      <button onClick={() => dispatch("BAD")}>bad</button>
      <button onClick={() => dispatch("ZERO")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
