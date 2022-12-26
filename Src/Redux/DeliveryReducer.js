import { setToken, setUser } from "../Services/asyncStorage";

const initialState = {
  preLoader: false,
  toast: {},
  user: {},
  dashboardData: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "D_LOGIN": {
      setToken(action.payload.auth_token);
      setUser("delivery");
      return { ...state, user: action.payload, preLoader: false };
    }
    case "LOGOUT": {
      return initialState;
    }
    case "SET_D_DASHBOARD_DATA": {
      return { ...state, dashboardData: action.payload, preLoader: false };
    }
    default:
      return state;
  }
}
