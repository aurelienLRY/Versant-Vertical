import React from "react";
import ReactDOM from "react-dom/client";
/* react-router-dom */
import { BrowserRouter as Router } from "react-router-dom";
import Routeur from "./routes";
/* redux */
import { Provider } from "react-redux";
import store from "./redux/store/store";


/* styles */
import "./assets/sass/main.scss";
import { ConfigProvider } from "antd"; // Ant design 
import moduleStyle from "./assets/sass/main.module.scss";


/* components */
import Header from "./components/header";
import Footer from "./components/footer";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider 
        theme={{
     
       
        }}
      >
        <Router>
          <Header />
          <Routeur />
          <Footer />
        </Router>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
