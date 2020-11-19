import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import S3Test from "./pages/S3Test";
import CreateProduct from "./pages/CreateProduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./pages/NavBar";
import Product from "./pages/Product";
import PrivateRoute from "./pages/PrivateRoute";
import Home from "./pages/Home";
import AuthState from "./context/authState";
import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthState>
        <NavBar />
        <BrowserRouter>
          {/* <Route path="/" component={LandingPage} /> */}
          <Route path="/S3Test" component={S3Test} />
          <Route path="/product/:id" component={Product} />
          <Route path="/create-product/" component={CreateProduct} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
        </BrowserRouter>
      </AuthState>
    </MuiThemeProvider>
  );
}

export default App;
