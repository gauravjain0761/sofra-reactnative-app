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
  activeOrders: [],
  cancelledOrders: [],
  orderPaging: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "PRE_LOADER_DELIVERY": {
      return { ...state, preLoader: action.payload };
    }
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
      return { ...state, companyProfile: action.payload, preLoader: false };
    }
    case "SET_DRIVERS": {
      return { ...state, drivers: action.payload, preLoader: false };
    }
    case "SET_PICKUP_ORDERS": {
      let pickupOrders = Object.assign([], state.pickupOrders);
      if (action.payload.result.length !== 0)
        pickupOrders.push(...action.payload.result);
      if (action.payload.paging.currentPage == 1) {
        return {
          ...state,
          pickupOrders: action.payload.result,
          orderPaging: action.payload.paging,
          preLoader: false,
        };
      } else {
        return {
          ...state,
          pickupOrders: pickupOrders,
          orderPaging: action.payload.paging,
          preLoader: false,
        };
      }
      return { ...state, pickupOrders: action.payload, preLoader: false };
    }
    case "SET_DELIVERED_ORDERS": {
      return { ...state, deliveredOrders: action.payload, preLoader: false };
    }
    case "SET_ACTIVE_ORDERS": {
      return { ...state, activeOrders: action.payload, preLoader: false };
    }
    case "SET_CANCELLED_ORDERS": {
      return { ...state, cancelledOrders: action.payload, preLoader: false };
    }
    default:
      return state;
  }
}
