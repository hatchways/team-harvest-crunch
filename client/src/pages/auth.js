import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const register = async (formData) => {
  try {
    const res = await axios.post("/user/register", formData, config);
    localStorage.setItem("token", res.data.token);
  } catch (err) {
    if (err.response && err.response.status === 400) {
      return { backendErr: err.response.data.msg };
    }
  }
};

export const loadUser = async (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else delete axios.defaults.headers.common["x-auth-token"];
  try {
    const res = await axios.get("/user/login");
    window.location = "/";
  } catch (err) {}
};

export const login = async (formData) => {
  try {
    const res = await axios.post("/user/login", formData, config);
    localStorage.setItem("token", res.data.token);
  } catch (err) {
    if (err.response && err.response.status === 400) {
      return { backendErr: err.response.data.msg };
    }
  }
};
