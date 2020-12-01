export default (state, action) => {
    switch (action.type) {
        case "LOAD_USER":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false
            };
        case "LOAD_USER_FAIL":
            return {
                ...state,
                isAuthenticated: false,
                loading: false
            };
        case "REGISTER_USER":
        case "LOGIN_USER":
            return {
                ...state,
                isAuthenticated: true,
                loading: false
            };
        case "LOGOUT_USER":
            return {
                ...state,
                user: { _id: "", name: "", email: "", date: "", __v: 0 },
                isAuthenticated: false,
                loading: true
            };

        default:
            return state;
    }
};
