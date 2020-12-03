import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import CreateProduct from "./pages/CreateProduct";
import MyAccount from "./pages/MyAccount";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Product from "./pages/Product";
import PrivateRoute from "./pages/PrivateRoute";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import PersonalShop from "./pages/PersonalShop";
import AuthState from "./context/authState";
import ProductState from "./context/productState";
import SocketState from "./context/socketState";
import ConversationState from "./context/conversationState";

import "./App.css";

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <AuthState>
                <ProductState>
                    <SocketState>
                        <ConversationState>
                            <BrowserRouter>
                                {/* <Route path="/" component={LandingPage} /> */}
                                {/* <Route path="/stripe-test" component={StripeTest} /> */}
                                <Route
                                    path="/product/:id"
                                    component={Product}
                                />
                                <PrivateRoute
                                    path="/create-product/"
                                    component={CreateProduct}
                                />
                                <PrivateRoute
                                    path="/shop-profile"
                                    component={MyAccount}
                                />
                                <PrivateRoute
                                    path="/messages"
                                    component={Messages}
                                />
                                <PrivateRoute
                                    path="/personal-shop"
                                    component={PersonalShop}
                                />
                                <Route path="/register" component={Register} />
                                <Route path="/login" component={Login} />
                                <Route exact path="/" component={Home} />
                            </BrowserRouter>
                        </ConversationState>
                    </SocketState>
                </ProductState>
            </AuthState>
        </MuiThemeProvider>
    );
}

export default App;
