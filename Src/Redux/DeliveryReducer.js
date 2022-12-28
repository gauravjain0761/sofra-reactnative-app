import { setToken, setUser } from "../Services/asyncStorage";

const initialState = {
  preLoader: false,
  toast: {},
  user: {},
  dashboardData: {},
  companyProfile: {},
  drivers: [],
  pickupOrders: [],
  deliveredOrders: [],
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
    case "SET_COMPANY_PROFILE": {
      return { ...state, companyProfile: action.payload };
    }
    case "SET_DRIVERS": {
      return { ...state, drivers: action.payload };
    }
    case "SET_PICKUP_ORDERS": {
      return { ...state, pickupOrders: action.payload };
    }
    case "SET_DELIVERED_ORDERS": {
      return { ...state, deliveredOrders: action.payload };
    }
    default:
      return state;
  }
}
