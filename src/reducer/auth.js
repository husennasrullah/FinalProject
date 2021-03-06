const defaultState = {
  statusLogin: false,
  users: "",
};
const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        statusLogin: true,
        users: action.payload,
      };

    case "LOGOUT":
      return defaultState;

    default:
      return state;
  }
};

export default authReducer;
