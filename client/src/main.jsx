import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import Routeur from "./routes";
import { Provider } from 'react-redux';
import store from './redux/store/store';

import './assets/sass/main.scss'

import Header from "./components/header";
import Footer from "./components/footer";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <Header />
      <Routeur />
      <Footer />
    </Router>
    </Provider>
  </React.StrictMode>
);

