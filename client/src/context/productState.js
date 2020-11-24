import React, { useReducer } from "react";
import axios from "axios";
import ProductContext from "./productContext";
import productReducer from "./productReducer";

const ProductState = props => {
    const initialState = {
        products: [],
        loading: true
    };
    const [state, dispatch] = useReducer(productReducer, initialState);

    const loadProducts = async userId => {
        if (localStorage.getItem("token")) {
            axios.defaults.headers.common[
                "x-auth-token"
            ] = localStorage.getItem("token");
        } else delete axios.defaults.headers.common["x-auth-token"];
        try {
            const query = `http://localhost:3001/product/${userId}/products`;
            const res = await axios.get(query);
            dispatch({
                type: "LOAD_PRODUCT",
                payload: res.data
            });
        } catch (err) {}
    };

    return (
        <ProductContext.Provider
            value={{
                products: state.products,
                loading: state.loading,
                loadProducts
            }}
        >
            {props.children}
        </ProductContext.Provider>
    );
};

export default ProductState;
