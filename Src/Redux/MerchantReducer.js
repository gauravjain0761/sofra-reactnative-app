import { setToken, setUser } from "../Services/asyncStorage";

const initialState = {
  preLoader: false,
  toast: {},
  user: {},
  orders: [],
  statistics: {},
  unsetteled_report: {},
  setteled_report: {},
  isTakingOrders: false,
  availability: [],
  offers: [],
  dashBoardData: {},
  menuCategories: [],
  menuItems: [],
  cities: [],
  cuisines: [],
  users: [],
  categories: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "PRE_LOADER": {
      return { ...state, preLoader: action.payload };
    }
    case "TOAST": {
      if (action.payload == "initial") {
        return { ...state, toast: action.payload, preLoader: true };
      } else {
        return { ...state, toast: action.payload, preLoader: false };
      }
    }
    case "LOGIN": {
      setToken(action.payload.auth_token);
      setUser(JSON.stringify(action.payload));
      return { ...state, user: action.payload, preLoader: false };
    }
    case "LOGOUT": {
      return initialState;
    }
    case "SET_ORDERS": {
      return { ...state, orders: action.payload, preLoader: false };
    }
    case "SET_STATISTICS": {
      return { ...state, statistics: action.payload, preLoader: false };
    }
    case "SET_SETTELED_REPORT": {
      return { ...state, setteled_report: action.payload, preLoader: false };
    }
    case "SET_UNSETTELED_REPORT": {
      return { ...state, unsetteled_report: action.payload, preLoader: false };
    }
    case "SET_APP_SETTING": {
      return {
        ...state,
        isTakingOrders: action.payload.isTakingOrders == "YES" ? true : false,
        preLoader: false,
      };
    }
    case "SET_AVAILABILITY": {
      return { ...state, availability: action.payload, preLoader: false };
    }
    case "SET_OFFERS": {
      return { ...state, offers: action.payload, preLoader: false };
    }
    case "DELETE_OFFER": {
      let offer = Object.assign([], state.offers);
      offer = offer.filter((el) => {
        return el.id !== action.payload.offerId;
      });
      return { ...state, offers: offer, preLoader: false };
    }
    case "SET_DASHBOARD_DATA": {
      return { ...state, dashBoardData: action.payload, preLoader: false };
    }
    case "SET_MENU_CATEGORIES": {
      return { ...state, menuCategories: action.payload, preLoader: false };
    }
    case "DELETE_CATEGORIES": {
      let menuCategories = Object.assign([], state.menuCategories);
      menuCategories = menuCategories.filter((el) => {
        return el.id !== action.payload.categoryId;
      });
      return { ...state, menuCategories: menuCategories, preLoader: false };
    }
    case "SET_MENU_ITEMS": {
      return { ...state, menuItems: action.payload, preLoader: false };
    }
    case "SET_CITIES": {
      return { ...state, cities: action.payload, preLoader: false };
    }
    case "SET_CUISINES": {
      return { ...state, cuisines: action.payload, preLoader: false };
    }
    case "SET_USERS": {
      return { ...state, user: action.payload, preLoader: false };
    }
    case "SET_CATEGORIES": {
      return { ...state, categories: action.payload, preLoader: false };
    }
    default:
      return state;
  }
}