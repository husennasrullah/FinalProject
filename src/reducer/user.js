const defaultState = {
  dataUsers: {},
};
const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {};

    case "LOGOUT":
      return defaultState;

    default:
      return state;
  }
};

export default authReducer;
