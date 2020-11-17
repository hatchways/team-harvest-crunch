import React, { useState, useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";

const AuthState = (props) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const initialState = {
  //   user: null,
  //   isAuthenticated: false,
  // };
  // const [state, dispatch] = useReducer(authReducer, initialState);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    jwt_key: "token",
  };

  const register = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/user/register",
        formData,
        config.headers
      );
      localStorage.setItem(config.jwt_key, res.data.token);
      // dispatch({
      //   type: "REGISTER_USER",
      //   payload: res.data,
      // });
      setIsAuthenticated((pValue) => !pValue);
      // isAuthenticated = true;
      console.log(isAuthenticated);
      loadUser(res.data.token);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        // console.log(err.response.data);
        return { backendErr: err.response.data.msg };
      }
    }
  };

  const loadUser = async (token) => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
    } else delete axios.defaults.headers.common["x-auth-token"];
    try {
      const res = await axios.get("http://localhost:3001/user/login");
      // dispatch({
      //   type: "LOAD_USER",
      //   payload: res.data,
      // });
      const userData = JSON.parse(res.data);
      setUser(userData);
      // user = JSON.stringify(res.data);

      console.log(user);
      // console.log(userData);
      // window.location = "/";
    } catch (err) {}
  };

  const login = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/user/login",
        formData,
        config.headers
      );
      localStorage.setItem(config.jwt_key, res.data.token);
      // dispatch({
      //   type: "LOGIN_USER",
      //   payload: res.data,
      // });
      setIsAuthenticated((pValue) => !pValue);
      // isAuthenticated = true;
      console.log(isAuthenticated);
      loadUser(res.data.token);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        return { backendErr: err.response.data.msg };
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isAuthenticated: isAuthenticated,
        register,
        loadUser,
        login,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
