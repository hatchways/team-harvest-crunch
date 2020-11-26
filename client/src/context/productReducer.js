export default (state, action) => {
    switch (action.type) {
        case "LOAD_PRODUCT":
            return {
                ...state,
                products: action.payload,
                loading: false
            };
        case "LOAD_ALL_PRODUCT":
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};
