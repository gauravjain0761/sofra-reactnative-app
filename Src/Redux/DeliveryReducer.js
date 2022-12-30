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
  unsetteled_report: {},
  setteled_report: {},
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
    case "UPDATE_DRIVER_STATUS": {
      let drivers = Object.assign([], state.drivers);
      let index = drivers.findIndex((obj) => obj.id == action.payload.driverId);
      drivers[index].status = action.payload.status;
      return { ...state, drivers: drivers, preLoader: false };
    }
    case "DELETE_DRIVER": {
      let drivers = Object.assign([], state.drivers);
      drivers = drivers.filter((obj) => obj.id !== action.payload.driverId);
      return { ...state, drivers: drivers, preLoader: false };
    }
    case "SET_PICKUP_ORDERS": {
      let pickupOrders = Object.assign([], state.pickupOrders);
      if (action.payload.result.length !== 0)
        pickupOrders.push(...action.payload.result);
      if (action.payload.pagination.currentPage == "1") {
        return {
          ...state,
          pickupOrders: action.payload.result,
          orderPaging: action.payload.pagination,
          preLoader: false,
        };
      } else {
        return {
          ...state,
          pickupOrders: pickupOrders,
          orderPaging: action.payload.pagination,
          preLoader: false,
        };
      }
    }
    case "SET_DELIVERED_ORDERS": {
      let deliveredOrders = Object.assign([], state.deliveredOrders);
      if (action.payload.result.length !== 0)
        deliveredOrders.push(...action.payload.result);
      if (action.payload.pagination.currentPage == "1") {
        return {
          ...state,
          deliveredOrders: action.payload.result,
          orderPaging: action.payload.pagination,
          preLoader: false,
        };
      } else {
        return {
          ...state,
          deliveredOrders: deliveredOrders,
          orderPaging: action.payload.pagination,
          preLoader: false,
        };
      }
    }
    case "SET_ACTIVE_ORDERS": {
      let activeOrders = Object.assign([], state.activeOrders);
      if (action.payload.result.length !== 0)
        activeOrders.push(...action.payload.result);
      if (action.payload.pagination.currentPage == "1") {
        return {
          ...state,
          activeOrders: action.payload.result,
          orderPaging: action.payload.pagination,
          preLoader: false,
        };
      } else {
        return {
          ...state,
          activeOrders: activeOrders,
          orderPaging: action.payload.pagination,
          preLoader: false,
        };
      }
    }
    case "SET_CANCELLED_ORDERS": {
      let cancelledOrders = Object.assign([], state.cancelledOrders);
      if (action.payload.result.length !== 0)
        cancelledOrders.push(...action.payload.result);
      if (action.payload.pagination.currentPage == "1") {
        return {
          ...state,
          cancelledOrders: action.payload.result,
          orderPaging: action.payload.pagination,
          preLoader: false,
        };
      } else {
        return {
          ...state,
          cancelledOrders: cancelledOrders,
          orderPaging: action.payload.pagination,
          preLoader: false,
        };
      }
    }
    case "UPDATE_ORDER_STATUS_PICKUP": {
      let pickupOrders = Object.assign([], state.pickupOrders);
      pickupOrders = pickupOrders.filter(
        (obj) => obj.id !== action.payload.orderId
      );
      return { ...state, pickupOrders: pickupOrders, preLoader: false };
    }
    case "SET_SETTELED_REPORT_COMPANY": {
      return {
        ...state,
        unsetteled_report: {},
        setteled_report: action.payload,
        preLoader: false,
      };
    }
    case "SET_UNSETTELED_REPORT_COMPANY": {
      return {
        ...state,
        setteled_report: {},
        unsetteled_report: action.payload,
        preLoader: false,
      };
    }
    default:
      return state;
  }
}
