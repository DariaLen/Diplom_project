import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./features/store";
import { PersistGate } from "redux-persist/integration/react";

// export  const ROOT_URL = 'http://localhost:3333'
export const ROOT_URL = "https://backend-diplom-project-1.onrender.com";

export const selectRootUrl = (state) => state.config.ROOT_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Router>
    </Provider>
  </React.StrictMode>
);
