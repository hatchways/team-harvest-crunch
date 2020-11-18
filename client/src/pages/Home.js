import React, { useContext } from "react";
import AuthContext from "../context/authContext";
const Home = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return <h2> {user.name} Welcome to your bakery Shop</h2>;
};

export default Home;
