import { setToken, setUser } from "../Services/asyncStorage";

const initialState = {
  preLoader: false,
  toast: {},
  user: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "D_LOGIN": {
      console.log(action.payload);
      setToken(action.payload.auth_token);
      setUser("delivery");
      return { ...state, user: action.payload, preLoader: false };
    }
    case "LOGOUT": {
      return initialState;
    }
    default:
      return state;
  }
}
