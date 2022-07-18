import { USER_LOGIN_INFO, USER_REGISTER_INFO } from "../actions";
const reducer = (state, action) => {
  if (action.type === USER_LOGIN_INFO) {
    return {
      ...state,
      [action.field]: action.payload,
    };
  }
  if (action.type === USER_REGISTER_INFO) {
    return {
      ...state,
      [action.field]: action.payload,
    };
  }
  return state;
};

export default reducer;
