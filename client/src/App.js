import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import CreateProduct from "./pages/CreateProduct";
import NavBar from "./pages/NavBar";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <NavBar />
      <BrowserRouter>
        {/* <Route path="/" component={LandingPage} /> */}
        <Route path="/create-product/" component={CreateProduct} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
