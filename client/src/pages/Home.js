import React, { useContext } from "react";
import AuthContext from "../context/authContext";
import Navbar from "./NavBar";

const Home = () => {
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    return (
        <div>
            <Navbar />
            <h2> {user.name} Welcome to your bakery Shop</h2>
        </div>
    );
};

export default Home;
