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

        default:
            return state;
    }
};
