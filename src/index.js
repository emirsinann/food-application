import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux"; // Import the Provider from react-redux
import store from "./store"; // Import your Redux store
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />}></Route>
          </Routes>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
