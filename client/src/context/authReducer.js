export default (state, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case "REGISTER_USER":
    case "LOGIN_USER":
      return {
        ...state,
        isAuthenticated: true
      };

    default:
      return state;
  }
};
