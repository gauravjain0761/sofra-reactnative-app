import { setToken, setUser } from "../Services/asyncStorage";

const initialState = {
  preLoader: false,
  toast: {},
  user: {},
  orders: [],
  filterOrders: [],
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
  descriptor: [],
  promocodes: [],
  offSlots: [],
  restaurant: {},
  documents: [],
  isVisible: false,
  onDelete: undefined,
  successModal: false,
  notifications: [],
  orderPaging: {},
  dashboardSearch: {},
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
      setUser("merchant");
      return { ...state, user: action.payload, preLoader: false };
    }
    case "LOGOUT": {
      return initialState;
    }
    case "SET_ORDERS": {
      let orders = Object.assign([], state.orders);
      if (action.payload.result.length !== 0)
        orders.push(...action.payload.result);
      if (action.payload.paging.currentPage == 1) {
        return {
          ...state,
          orders: action.payload.result,
          filterOrders: action.payload.result,
          orderPaging: action.payload.paging,
          preLoader: false,
        };
      } else {
        return {
          ...state,
          orders: orders,
          filterOrders: orders,
          orderPaging: action.payload.paging,
          preLoader: false,
        };
      }
    }
    case "SET_STATISTICS": {
      return { ...state, statistics: action.payload, preLoader: false };
    }
    case "SET_SETTELED_REPORT": {
      return {
        ...state,
        unsetteled_report: {},
        setteled_report: action.payload,
        preLoader: false,
      };
    }
    case "SET_UNSETTELED_REPORT": {
      return {
        ...state,
        setteled_report: {},
        unsetteled_report: action.payload,
        preLoader: false,
      };
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
      return { ...state, users: action.payload, preLoader: false };
    }
    case "SET_CATEGORIES": {
      return { ...state, categories: action.payload, preLoader: false };
    }
    case "SET_MENU_DESCRIPTORS": {
      return { ...state, descriptor: action.payload, preLoader: false };
    }
    case "DELETE_MENUITEMS": {
      let menuItems = Object.assign([], state.menuItems);
      let dashboardSearch = Object.assign([], state.dashboardSearch);
      if (menuItems.length !== 0) {
        menuItems = menuItems.filter((el) => {
          return el.id !== action.payload.menuId;
        });
      }
      if (
        dashboardSearch !== {} &&
        dashboardSearch.menuItems &&
        dashboardSearch.menuItems.length !== 0
      ) {
        let menuItemsTemp = dashboardSearch.menuItems.filter((el) => {
          return el.id !== action.payload.menuId;
        });
        dashboardSearch.menuItems = menuItemsTemp;
      }
      return {
        ...state,
        menuItems: menuItems,
        dashboardSearch: dashboardSearch,
        preLoader: false,
      };
    }
    case "STATUS_UPDATE_MENU_ITEMS": {
      let menuItems = Object.assign([], state.menuItems);
      let dashboardSearch = Object.assign([], state.dashboardSearch);

      if (menuItems.length !== 0) {
        let index = menuItems.findIndex(
          (obj) => obj.id == action.payload.menuId
        );
        menuItems[index].status = action.payload.status;
      }
      if (dashboardSearch !== {} && dashboardSearch.menuItems.length !== 0) {
        let index = dashboardSearch.menuItems.findIndex(
          (obj) => obj.id == action.payload.menuId
        );
        dashboardSearch.menuItems[index].status = action.payload.status;
      }
      return {
        ...state,
        menuItems: menuItems,
        dashboardSearch: dashboardSearch,
        preLoader: false,
      };
    }
    case "SET_PROMO_CODES": {
      return { ...state, promocodes: action.payload, preLoader: false };
    }
    case "SET_OFF_SLOT": {
      return { ...state, offSlots: action.payload, preLoader: false };
    }
    case "DELETE_SLOT": {
      let offSlots = Object.assign([], state.offSlots);
      offSlots = offSlots.filter((el) => {
        return el.id !== action.payload.slotId;
      });
      return { ...state, offSlots: offSlots };
    }
    case "ADD_OFF_SLOT": {
      let offSlots = Object.assign([], state.offSlots);
      offSlots.push(action.payload);
      return { ...state, offSlots: offSlots };
    }
    case "SET_RESTAURANT": {
      return { ...state, restaurant: action.payload, preLoader: false };
    }
    case "UPDATE_ORDER_STATUS": {
      let orders = Object.assign([], state.orders);
      let filterOrders = Object.assign([], state.filterOrders);
      let index = orders.findIndex(
        (obj) => obj.id == action.payload.postObj.orderId
      );
      orders[index].status = action.payload.postObj.status;

      let index2 = filterOrders.findIndex(
        (obj) => obj.id == action.payload.postObj.orderId
      );
      filterOrders[index2].status = action.payload.postObj.status;
      let filter = [];
      if (action.payload.selectedStatus == "ALL") {
        filter = filterOrders;
      } else {
        filter = filterOrders.filter(
          (obj) => obj.status == action.payload.selectedStatus
        );
      }

      return {
        ...state,
        orders: orders,
        filterOrders: filter,
      };
    }
    case "PROMOCODE_STATUS_UPDATE": {
      let promocodes = Object.assign([], state.promocodes);
      let index = promocodes.findIndex(
        (obj) => obj.id == action.payload.codeId
      );
      promocodes[index].status =
        action.payload.status == 1 ? "ACTIVE" : "IN-ACTIVE";
      return { ...state, promocodes: promocodes, preLoader: false };
    }
    case "SET_DOCUMENTS": {
      return { ...state, documents: action.payload, preLoader: false };
    }
    case "DELETE_DOCUMENT": {
      let documents = Object.assign([], state.documents);
      documents = documents.filter((el) => {
        return el.id !== action.payload.docId;
      });
      return { ...state, documents: documents };
    }
    case "DELETE_MODAL": {
      return {
        ...state,
        isVisible: action.payload.isVisible,
        onDelete: action.payload.onDelete,
      };
    }
    case "SUCCESS_MODAL": {
      return {
        ...state,
        preLoader: false,
        successModal: action.payload.modal,
        successModalMessage: action.payload.message,
      };
    }
    case "SET_NOTIFICATIONS": {
      return { ...state, notifications: action.payload, preLoader: false };
    }
    case "SET_DASHBOARD_SEARCH_DATA": {
      return { ...state, dashboardSearch: action.payload };
    }
    default:
      return state;
  }
}
